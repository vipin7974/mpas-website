import { useState, type FormEvent, type ReactNode } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfig';
import { cn } from '@/lib/utils';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';

type Status = 'idle' | 'invalid' | 'sent';

const fieldBase =
  'peer block w-full border-0 border-b border-line-strong bg-transparent px-0 pb-3 pt-2 text-body text-ink outline-none transition-colors duration-300 placeholder:text-text-muted/70 focus:border-ink focus-visible:outline-none';

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="group relative">
      <label htmlFor={id} className="eyebrow mb-2 flex justify-between text-text-secondary">
        {label}
        {optional && <span className="normal-case tracking-normal text-text-muted">Optional</span>}
      </label>
      {children}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[image:var(--gradient-bridge)] transition-transform duration-700 ease-expo group-focus-within:scale-x-100"
      />
    </div>
  );
}

export function Contact() {
  const { config } = useSiteConfig();
  const site = { email: config.brand.email, location: config.brand.location };
  const services = config.services;
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus('invalid');
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '').trim();
    const subject = `Enquiry from ${get('name')}${get('organisation') ? ` (${get('organisation')})` : ''}`;
    const body = [
      `Name: ${get('name')}`,
      `Organisation: ${get('organisation') || '—'}`,
      `Email: ${get('email')}`,
      `Area of interest: ${get('interest') || '—'}`,
      '',
      get('message'),
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  return (
    <Section id="contact" labelledBy="contact-title">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading
              layout="stacked"
              index="07"
              label={config.sectionHeadings['contact'].label}
              titleId="contact-title"
              title={config.sectionHeadings['contact'].title}
              description={config.sectionHeadings['contact'].description}
            />

            <Reveal as="dl" stagger className="mt-12 space-y-6 md:mt-16">
              <div className="flex items-start gap-4">
                <dt className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line">
                  <Mail className="size-4 text-ink" strokeWidth={1.5} aria-hidden />
                  <span className="sr-only">Email</span>
                </dt>
                <dd className="pt-2">
                  <a href={`mailto:${site.email}`} className="link-underline font-outfit text-body-lg text-ink">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-4">
                <dt className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line">
                  <MapPin className="size-4 text-ink" strokeWidth={1.5} aria-hidden />
                  <span className="sr-only">Location</span>
                </dt>
                <dd className="pt-2 font-outfit text-body-lg text-ink">{site.location}</dd>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <form
              noValidate
              onSubmit={onSubmit}
              aria-describedby="contact-note"
              className="rounded-lg border border-line bg-surface p-6 sm:p-10 lg:p-12"
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Field id="name" label="Full name">
                  <input id="name" name="name" type="text" autoComplete="name" required className={fieldBase} />
                </Field>
                <Field id="organisation" label="Organisation" optional>
                  <input id="organisation" name="organisation" type="text" autoComplete="organization" className={fieldBase} />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="email" label="Email">
                    <input id="email" name="email" type="email" autoComplete="email" required className={fieldBase} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="interest" label="Area of interest" optional>
                    <select id="interest" name="interest" defaultValue="" className={cn(fieldBase, 'cursor-pointer appearance-none')}>
                      <option value="">Select a practice</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Other">Something else</option>
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label="How can we help?">
                    <textarea id="message" name="message" rows={4} required className={cn(fieldBase, 'resize-none')} />
                  </Field>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p id="contact-note" className="max-w-xs text-small text-text-muted">
                  Submitting opens your email app with your enquiry ready to send.
                </p>
                <Button type="submit" className="self-start sm:self-auto">
                  Send enquiry
                </Button>
              </div>

              <p
                role="status"
                aria-live="polite"
                className={cn(
                  'flex items-center gap-3 text-small text-ink transition-opacity duration-500 before:h-2 before:w-2 before:shrink-0 before:rounded-full',
                  status === 'idle' ? 'h-0 opacity-0' : 'mt-6 opacity-100',
                  status === 'invalid' ? 'before:bg-mpas-orange-red' : 'before:bg-mpas-green-dark',
                )}
              >
                {status === 'invalid' && 'Please complete the required fields: name, email and message.'}
                {status === 'sent' && 'Thank you. Your email app should now be open with your message.'}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
