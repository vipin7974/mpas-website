import { useRef, useState } from 'react';
import { ArrowLeft, Check, Download, ImagePlus, Palette, RotateCcw, Save, Settings2, Trash2, Upload } from 'lucide-react';
import { useSiteConfig, type SiteConfig } from '@/context/SiteConfig';

const tabs = ['Overview', 'Brand & Contact', 'Hero', 'Media Library', 'Sections', 'Industries', 'Services', 'Theme', 'SEO & Data'] as const;
type Tab = typeof tabs[number];

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const common = 'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#28312c] outline-none transition focus:border-[#d47a3f] focus:ring-2 focus:ring-[#d47a3f]/10';
  return <label className="block space-y-2"><span className="text-xs font-medium uppercase tracking-[0.12em] text-black/50">{label}</span>{multiline ? <textarea rows={4} className={common + ' resize-y'} value={value} onChange={e => onChange(e.target.value)} /> : <input className={common} value={value} onChange={e => onChange(e.target.value)} />}</label>;
}


async function prepareImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
  const bitmap = await createImageBitmap(file);
  const max = 1800;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Image processing is unavailable in this browser.');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/webp', 0.82);
}

function ImagePicker({
  label,
  value,
  onChange,
  hint = 'JPG, PNG or WebP. Image is resized before saving.',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const choose = async (file?: File) => {
    if (!file) return;
    setBusy(true); setError('');
    try { onChange(await prepareImage(file)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load this image.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-3">
      <span className="block text-xs font-medium uppercase tracking-[0.12em] text-black/50">{label}</span>
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#f7f3ea]">
        <div className="relative aspect-[16/7] min-h-28">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-black/40">Using the built-in image</div>
          )}
          {busy && <div className="absolute inset-0 grid place-items-center bg-white/75 text-sm font-medium">Processing image…</div>}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-black/10 bg-white p-3">
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={e => choose(e.target.files?.[0])} />
          <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg bg-[#245b3a] px-3 py-2 text-sm font-medium text-white">
            <ImagePlus size={15}/> {value ? 'Change image' : 'Add image'}
          </button>
          {value && <button type="button" onClick={() => onChange('')} className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm text-black/65">
            <Trash2 size={15}/> Use default
          </button>}
          <span className="text-xs text-black/40">{hint}</span>
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Admin() {
  const { config, setConfig, reset } = useSiteConfig();
  const [tab, setTab] = useState<Tab>('Overview');
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(0);
  const [selectedService, setSelectedService] = useState(0);

  const update = (patch: Partial<SiteConfig>) => setConfig({ ...config, ...patch });
  const brand = config.brand;
  const setBrand = (patch: Partial<SiteConfig['brand']>) => update({ brand: { ...brand, ...patch } });
  const setHero = (patch: Partial<SiteConfig['hero']>) => update({ hero: { ...config.hero, ...patch } });
  const setTheme = (patch: Partial<SiteConfig['theme']>) => update({ theme: { ...config.theme, ...patch } });

  const savePulse = () => { setSaved(true); setTimeout(() => setSaved(false), 1600); };
  const exportConfig = () => { const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mpas-site-config.json'; a.click(); URL.revokeObjectURL(a.href); };
  const importConfig = () => { try { const parsed = JSON.parse(json) as SiteConfig; setConfig(parsed); setJson(''); savePulse(); } catch { alert('Invalid JSON configuration.'); } };

  return <div className="min-h-screen bg-[#fbf8f2] text-[#1d2823]">
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[#fffdf9]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <div className="flex items-center gap-4"><a href="/" className="flex items-center gap-2 text-sm font-medium"><ArrowLeft size={16}/> View site</a><span className="h-6 w-px bg-black/10"/><div><div className="text-lg font-semibold tracking-[-0.02em]">mpas <span className="font-normal text-black/45">control center</span></div><div className="text-[11px] uppercase tracking-[0.14em] text-black/40">Website administration</div></div></div>
        <div className="flex items-center gap-2"><button onClick={exportConfig} className="hidden items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm md:flex"><Download size={15}/> Export</button><button onClick={savePulse} className="flex items-center gap-2 rounded-lg bg-[#d47a3f] px-4 py-2 text-sm font-medium text-white shadow-sm">{saved ? <Check size={15}/> : <Save size={15}/>} {saved ? 'Saved' : 'Save changes'}</button></div>
      </div>
    </header>

    <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-black/10 p-3 sm:p-4 lg:min-h-[calc(100vh-73px)] lg:border-b-0 lg:border-r lg:p-6"><div className="flex gap-1.5 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">{tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition lg:w-full ${tab === t ? 'bg-[#d47a3f] text-white shadow-sm' : 'text-black/65 hover:bg-black/[.04] hover:text-black'}`}>{t === 'Theme' ? <Palette size={16}/> : t === 'Overview' ? <Settings2 size={16}/> : <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50"/>}{t}</button>)}</div><div className="mt-4 hidden rounded-xl lg:mt-8 lg:block border border-black/10 bg-white/60 p-4 text-xs leading-5 text-black/50">Changes are stored in this browser automatically. Export the configuration to back it up or move it to another deployment.</div></aside>

      <main className="p-5 lg:p-10">
        <div className="mx-auto max-w-5xl">
          {tab === 'Overview' && <><Title title="Website control center" sub="Manage the visual system and editable content without touching the source code."/><div className="grid gap-4 md:grid-cols-3"><Stat label="Editable industries" value={config.industries.length}/><Stat label="Editable services" value={config.services.length}/><Stat label="Visible sections" value={Object.values(config.visibility).filter(Boolean).length}/></div><div className="mt-6 grid gap-5 lg:grid-cols-2"><Card title="Quick controls"><div className="grid gap-4 sm:grid-cols-2"><Field label="Company name" value={brand.name} onChange={v=>setBrand({name:v})}/><Field label="Public email" value={brand.email} onChange={v=>setBrand({email:v})}/><Field label="Location" value={brand.location} onChange={v=>setBrand({location:v})}/><Field label="Tagline" value={brand.tagline} onChange={v=>setBrand({tagline:v})}/></div></Card><Card title="Admin tools"><div className="flex flex-wrap gap-3"><button onClick={exportConfig} className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm"><Download size={15}/> Export JSON</button><button onClick={()=>setJson(JSON.stringify(config,null,2))} className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm"><Upload size={15}/> Import JSON</button><button onClick={()=>{reset();savePulse()}} className="inline-flex items-center gap-2 rounded-lg border border-[#d47a3f]/20 bg-[#f8ece1] px-4 py-2 text-sm text-[#b45f31]"><RotateCcw size={15}/> Reset defaults</button></div><textarea value={json} onChange={e=>setJson(e.target.value)} placeholder="Paste exported mpas-site-config.json here" className="mt-4 min-h-40 w-full rounded-xl border border-black/10 bg-[#fbf8f2] p-4 font-mono text-xs"/><button onClick={importConfig} className="mt-3 rounded-lg bg-[#3f7654] px-4 py-2 text-sm font-medium text-white">Apply imported config</button></Card></div></>}

          {tab === 'Brand & Contact' && <><Title title="Brand & contact" sub="The logo asset stays as supplied; this controls the text and contact details around it."/><div className="grid gap-5 md:grid-cols-2"><Card title="Identity"><div className="space-y-4"><Field label="Company name" value={brand.name} onChange={v=>setBrand({name:v})}/><Field label="Lowercase short name" value={brand.shortName} onChange={v=>setBrand({shortName:v})}/><Field label="Tagline" value={brand.tagline} onChange={v=>setBrand({tagline:v})}/><ImagePicker label="Logo" value={brand.logo} onChange={v=>setBrand({logo:v})} hint="Upload a replacement logo. Reset uses the built-in mpas logo."/>
              <Field label="Logo URL (optional)" value={brand.logo.startsWith('data:') ? '' : brand.logo} onChange={v=>setBrand({logo:v})}/></div></Card><Card title="Contact"><div className="space-y-4"><Field label="Email" value={brand.email} onChange={v=>setBrand({email:v})}/><Field label="Location" value={brand.location} onChange={v=>setBrand({location:v})}/></div></Card></div></>}

          {tab === 'Hero' && <><Title title="Hero content" sub="Keep the visual hero image; change the messaging, CTA labels and supporting copy here."/><Card title="Hero"><div className="space-y-5"><Field label="Eyebrow" value={config.hero.eyebrow} onChange={v=>setHero({eyebrow:v})}/><Field label="Line 1" value={config.hero.lines[0]} onChange={v=>setHero({lines:[v,config.hero.lines[1],config.hero.lines[2]]})}/><Field label="Line 2" value={config.hero.lines[1]} onChange={v=>setHero({lines:[config.hero.lines[0],v,config.hero.lines[2]]})}/><Field label="Line 3" value={config.hero.lines[2]} onChange={v=>setHero({lines:[config.hero.lines[0],config.hero.lines[1],v]})}/><Field label="Description" multiline value={config.hero.description} onChange={v=>setHero({description:v})}/><div className="grid gap-4 md:grid-cols-2"><Field label="Primary CTA" value={config.hero.primaryCta} onChange={v=>setHero({primaryCta:v})}/><Field label="Secondary CTA" value={config.hero.secondaryCta} onChange={v=>setHero({secondaryCta:v})}/></div><div className="mt-5"><ImagePicker label="Hero image" value={config.media.hero} onChange={v=>update({media:{...config.media,hero:v}})} /></div><div></div></div></Card></>}

          {tab === 'Media Library' && <><Title title="Media library" sub="Replace the main site imagery without touching the source code. Every image can be restored to its built-in default."/>
            <div className="grid gap-5 md:grid-cols-2">
              <Card title="Hero"><ImagePicker label="Hero image" value={config.media.hero} onChange={v=>update({media:{...config.media,hero:v}})} /></Card>
              <Card title="About"><ImagePicker label="About image" value={config.media.about} onChange={v=>update({media:{...config.media,about:v}})} /></Card>
              <Card title="Expertise"><ImagePicker label="Expertise image" value={config.media.expertise} onChange={v=>update({media:{...config.media,expertise:v}})} /></Card>
              <Card title="Philosophy"><ImagePicker label="Quote background" value={config.media.quote} onChange={v=>update({media:{...config.media,quote:v}})} /></Card>
              <Card title="Markets"><ImagePicker label="Markets background" value={config.media.markets} onChange={v=>update({media:{...config.media,markets:v}})} /></Card>
            </div>
            <Card title="How image controls work"><div className="grid gap-3 text-sm leading-6 text-black/60 md:grid-cols-3"><p><b className="text-black">1. Add:</b> Upload a JPG, PNG or WebP.</p><p><b className="text-black">2. Optimize:</b> The browser resizes it before storing it.</p><p><b className="text-black">3. Restore:</b> Use “Use default” anytime to return to the original asset.</p></div></Card>
          </>}

          {tab === 'Sections' && <><Title title="Section visibility & headings" sub="Keep the Industries experience intact while controlling what appears on the public site."/><div className="space-y-4">{Object.entries(config.visibility).map(([id, visible]) => <Card key={id} title={id === 'quote' ? 'Philosophy quote' : id.replaceAll('-', ' ')}><div className="flex items-center justify-between gap-4"><div className="text-sm text-black/55">{visible ? 'Visible on the public site' : 'Hidden from the public site'}</div><button onClick={()=>update({visibility:{...config.visibility,[id]:!visible}})} className={`relative h-7 w-12 rounded-full transition ${visible ? 'bg-[#3f7654]' : 'bg-black/20'}`}><span className={`absolute top-1 size-5 rounded-full bg-white shadow transition ${visible ? 'left-6' : 'left-1'}`}/></button></div>{id !== 'quote' && config.sectionHeadings[id] && <div className="mt-5 grid gap-4"><Field label="Section title" value={config.sectionHeadings[id].title} onChange={v=>update({sectionHeadings:{...config.sectionHeadings,[id]:{...config.sectionHeadings[id],title:v}}})}/><Field label="Description" multiline value={config.sectionHeadings[id].description} onChange={v=>update({sectionHeadings:{...config.sectionHeadings,[id]:{...config.sectionHeadings[id],description:v}}})}/></div>}</Card>)}</div></>}

          {tab === 'Industries' && <><Title title="Industries manager" sub="The six-card Industries section remains the same experience, with editable content."/><EditorList items={config.industries.map(x=>x.name)} selected={selectedIndustry} setSelected={setSelectedIndustry}/>{config.industries[selectedIndustry] && <Card title={config.industries[selectedIndustry].name}><div className="space-y-4"><Field label="Industry name" value={config.industries[selectedIndustry].name} onChange={v=>{const a=[...config.industries];a[selectedIndustry]={...a[selectedIndustry],name:v};update({industries:a})}}/><Field label="Description" multiline value={config.industries[selectedIndustry].description} onChange={v=>{const a=[...config.industries];a[selectedIndustry]={...a[selectedIndustry],description:v};update({industries:a})}}/><Field label="Image alt text" value={config.industries[selectedIndustry].imageAlt} onChange={v=>{const a=[...config.industries];a[selectedIndustry]={...a[selectedIndustry],imageAlt:v};update({industries:a})}}/><ImagePicker label="Industry image" value={config.industries[selectedIndustry].image} onChange={v=>{const a=[...config.industries];a[selectedIndustry]={...a[selectedIndustry],image:v};update({industries:a})}}/></div></Card>}</>}

          {tab === 'Services' && <><Title title="Services manager" sub="Update service names, summaries and detailed bullets without changing the page structure."/><EditorList items={config.services.map(x=>x.title)} selected={selectedService} setSelected={setSelectedService}/>{config.services[selectedService] && <Card title={config.services[selectedService].title}><div className="space-y-4"><Field label="Service title" value={config.services[selectedService].title} onChange={v=>{const a=[...config.services];a[selectedService]={...a[selectedService],title:v};update({services:a})}}/><Field label="Summary" multiline value={config.services[selectedService].summary} onChange={v=>{const a=[...config.services];a[selectedService]={...a[selectedService],summary:v};update({services:a})}}/><Field label="Image alt text" value={config.services[selectedService].imageAlt} onChange={v=>{const a=[...config.services];a[selectedService]={...a[selectedService],imageAlt:v};update({services:a})}}/><ImagePicker label="Service image" value={config.services[selectedService].image} onChange={v=>{const a=[...config.services];a[selectedService]={...a[selectedService],image:v};update({services:a})}}/>{config.services[selectedService].points.map((point,i)=><Field key={i} label={`Point ${i+1}`} value={point} onChange={v=>{const a=[...config.services];const points=[...a[selectedService].points];points[i]=v;a[selectedService]={...a[selectedService],points};update({services:a})}}/>)}</div></Card>}</>}

          {tab === 'Theme' && <><Title title="Visual system" sub="Warm ivory is the base, deep green provides structure and trust, and orange is reserved for actions and highlights."/><div className="grid gap-5 md:grid-cols-2"><Card title="Palette"><div className="grid gap-4 sm:grid-cols-2">{Object.entries(config.theme).map(([key,value])=><label key={key} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3"><input type="color" value={value} onChange={e=>setTheme({[key]:e.target.value}) as any} className="size-10 cursor-pointer rounded-lg border-0 bg-transparent"/><span><span className="block text-sm font-medium">{key}</span><span className="font-mono text-xs text-black/40">{value}</span></span></label>)}</div></Card><Card title="Design direction"><ul className="space-y-3 text-sm leading-6 text-black/60"><li>• Warm ivory canvas keeps the site fresh without looking washed out.</li><li>• Deep green creates premium contrast and carries the sustainability signal.</li><li>• Orange is an intentional accent for CTAs, active states and hover—not a large background.</li><li>• Lowercase <b>mpas</b> for written brand references.</li><li>• Bold typography reduced; headings stay refined and editorial.</li></ul></Card></div></>}

          {tab === 'SEO & Data' && <><Title title="SEO & data" sub="Update browser title, search description and use JSON backup for complete site configuration."/><Card title="Search metadata"><div className="space-y-4"><Field label="Page title" value={config.seo.title} onChange={v=>update({seo:{...config.seo,title:v}})}/><Field label="Meta description" multiline value={config.seo.description} onChange={v=>update({seo:{...config.seo,description:v}})}/></div></Card></>}
        </div>
      </main>
    </div>
  </div>;
}

function Title({title,sub}:{title:string;sub:string}) { return <div className="mb-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d47a3f]">mpas / admin</p><h1 className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">{sub}</p></div>; }
function Card({title,children}:{title:string;children:React.ReactNode}) { return <section className="rounded-2xl border border-black/10 bg-[#fffdf9] p-5 shadow-[0_12px_40px_rgba(105,65,30,.05)] md:p-7"><h2 className="mb-5 text-base font-semibold">{title}</h2>{children}</section>; }
function Stat({label,value}:{label:string;value:number}) { return <div className="rounded-2xl border border-black/10 bg-[#fffdf9] p-5"><div className="text-3xl font-medium">{value}</div><div className="mt-1 text-xs uppercase tracking-[0.12em] text-black/45">{label}</div></div>; }
function EditorList({items,selected,setSelected}:{items:string[];selected:number;setSelected:(n:number)=>void}) { return <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{items.map((item,i)=><button key={i} onClick={()=>setSelected(i)} className={`shrink-0 rounded-full border px-4 py-2 text-sm ${selected===i?'border-[#d47a3f] bg-[#d47a3f] text-white':'border-black/10 bg-white text-black/60'}`}>{String(i+1).padStart(2,'0')} · {item}</button>)}</div>; }
