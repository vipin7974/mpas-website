/**
 * Creates the values for the shared CMS login.
 *
 *   npm run admin:password -- "the new password"
 *
 * Paste the printed lines into .env.local (and the hosting dashboard). Changing the password
 * signs everyone out, because sessions are tied to the password hash.
 */
import { createInterface } from 'node:readline/promises';
import { randomBytes } from 'node:crypto';
import { hash } from 'bcryptjs';

async function main() {
  let password = process.argv[2];
  if (!password) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    password = await rl.question('New shared password: ');
    rl.close();
  }
  if (!password || password.length < 12) {
    console.error('Please use a password of at least 12 characters.');
    process.exit(1);
  }
  const bcrypt = await hash(password, 12);
  console.log('\nAdd these to .env.local and to your hosting environment variables:\n');
  console.log(`ADMIN_PASSWORD_HASH_B64=${Buffer.from(bcrypt).toString('base64')}`);
  console.log('\nOnly if SESSION_SECRET is not set yet (also changing it signs everyone out):\n');
  console.log(`SESSION_SECRET=${randomBytes(48).toString('hex')}\n`);
}

main();
