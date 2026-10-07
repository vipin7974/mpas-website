import type { StructureResolver } from 'sanity/structure';
import { BillIcon } from '@sanity/icons/Bill';
import { CaseIcon } from '@sanity/icons/Case';
import { CogIcon } from '@sanity/icons/Cog';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { HomeIcon } from '@sanity/icons/Home';
import { ImageIcon } from '@sanity/icons/Image';
import { MenuIcon } from '@sanity/icons/Menu';
import { ThListIcon } from '@sanity/icons/ThList';
import { UserIcon } from '@sanity/icons/User';

const single = (S: Parameters<StructureResolver>[0], id: string, title: string, icon: typeof HomeIcon) =>
  S.listItem().id(id).title(title).icon(icon).child(S.document().schemaType(id).documentId(id).title(title));

/** Plain-language admin navigation instead of a flat list of document types. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('mpas Website')
    .items([
      S.listItem()
        .title('Website')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Website')
            .items([single(S, 'homepage', 'Homepage', HomeIcon), single(S, 'navigation', 'Menu', MenuIcon), single(S, 'footer', 'Footer', ThListIcon)]),
        ),
      S.divider(),
      S.listItem()
        .title('Content')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem().id('leadership').title('Leadership').icon(UserIcon).child(S.documentTypeList('teamMember').title('Leadership team')),
              S.listItem().id('services').title('Strategic Capabilities').icon(CaseIcon).child(S.documentTypeList('service').title('Strategic Capabilities')),
              S.listItem().id('industries').title('Industry Sectors').icon(BillIcon).child(S.documentTypeList('industry').title('Industry Sectors')),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Images')
        .icon(ImageIcon)
        .child(S.documentTypeList('sanity.imageAsset').title('Images')),
      S.divider(),
      single(S, 'siteSettings', 'Website Settings', CogIcon),
    ]);
