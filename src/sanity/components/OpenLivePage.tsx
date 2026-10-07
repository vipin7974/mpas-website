import { LaunchIcon } from '@sanity/icons/Launch';
import type { DocumentActionComponent } from 'sanity';
import { siteUrl } from '../env';

/** “See it on the website” — opens the published page in a new tab. */
export const openLivePage: DocumentActionComponent = (props) => {
  const doc = (props.published ?? props.draft) as { slug?: { current?: string } } | null;
  const path =
    props.type === 'teamMember' ? (doc?.slug?.current ? `/leadership/${doc.slug.current}` : null) : '/';
  return {
    label: 'See on website',
    icon: LaunchIcon,
    disabled: !path,
    title: path ? 'Opens the live page in a new tab (shows the last published version)' : 'Publish this first',
    onHandle: () => {
      if (path) window.open(`${siteUrl.replace(/\/$/, '')}${path}`, '_blank', 'noopener');
      props.onComplete();
    },
  };
};
