import type { PortableTextBlock } from '@portabletext/types';

let counter = 0;
const key = () => `k${(counter++).toString(36)}`;

type Run = string | { text: string; strong?: boolean };

const spans = (runs: Run[]) =>
  runs.map((r) => {
    const t = typeof r === 'string' ? { text: r } : r;
    return { _type: 'span' as const, _key: key(), text: t.text, marks: 'strong' in t && t.strong ? ['strong'] : [] };
  });

/** Plain paragraph. Pass `{ text, strong: true }` for bold runs. */
export const paragraph = (...runs: Run[]): PortableTextBlock => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: spans(runs),
});

export const heading = (text: string): PortableTextBlock => ({
  _type: 'block',
  _key: key(),
  style: 'h3',
  markDefs: [],
  children: spans([text]),
});

/** Bullet with a bold lead-in label, e.g. "Energy Transition: Renewable energy…". */
export const bullet = (label: string, text: string): PortableTextBlock => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: spans([{ text: `${label}:`, strong: true }, ` ${text}`]),
});
