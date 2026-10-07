import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/** Sanity webhook: runs when an editor publishes, so the website updates without a rebuild. */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new NextResponse('Revalidation secret is not configured.', { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return new NextResponse('Invalid signature.', { status: 401 });

  revalidateTag('sanity', { expire: 0 });
  return NextResponse.json({ revalidated: true, type: body?._type ?? null });
}
