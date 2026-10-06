import { useLayoutEffect, useRef, useState } from 'react';
import symbol from '@/assets/branding/mpas-symbol.png';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

const SEEN_KEY = 'mpas:intro-seen';

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable — intro simply plays again */
  }
}

/** Waits for fonts (capped) so the hero never reflows mid-animation. */
function fontsReady(timeout: number) {
  return Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, timeout)),
  ]);
}

/**
 * Brief branded intro: the mpas symbol and a bridge-gradient progress rule,
 * then a curtain lift into the hero. Shortened on repeat visits, skipped for reduced motion.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      fontsReady(800).then(() => {
        setVisible(false);
        onDone();
      });
      return;
    }

    const repeat = hasSeenIntro();
    let cancelled = false;
    document.body.classList.add('is-locked');

    const ctx = gsap.context(() => {
      const intro = gsap.timeline();
      intro
        .from('[data-loader-symbol]', { autoAlpha: 0, y: 12, duration: 0.9 })
        .fromTo(
          '[data-loader-bar]',
          { scaleX: 0 },
          { scaleX: 0.7, duration: repeat ? 0.4 : 1, ease: 'power2.out', transformOrigin: 'left' },
          0.1,
        );

      Promise.all([fontsReady(2500), intro.then()]).then(() => {
        if (cancelled) return;
        markIntroSeen();
        gsap
          .timeline({
            onComplete: () => {
              document.body.classList.remove('is-locked');
              setVisible(false);
            },
          })
          .to('[data-loader-bar]', { scaleX: 1, duration: 0.35, ease: 'power2.inOut' })
          .to('[data-loader-inner]', { autoAlpha: 0, y: -16, duration: 0.5, ease: 'power2.in' })
          .to(el, { yPercent: -100, duration: 1.05, ease: 'expo.inOut' }, '-=0.1')
          .call(onDone, [], '-=0.55');
      });
    }, el);

    return () => {
      cancelled = true;
      document.body.classList.remove('is-locked');
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas" aria-hidden>
      <div data-loader-inner className="flex flex-col items-center gap-8">
        <img data-loader-symbol src={symbol} alt="" width={342} height={199} className="h-14 w-auto md:h-16" />
        <div className="h-px w-32 overflow-hidden bg-line">
          <div data-loader-bar className="bridge-rule h-full origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  );
}
