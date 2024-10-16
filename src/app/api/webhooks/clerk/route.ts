import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/server/db'; 
import { users } from '@/server/db/schema'; 
import type { ClerkWebhookEvent } from '@/types'

export async function POST(req: Request) {
  const WEBHOOKS_SECRET = process.env.WEBHOOKS_SECRET;

  if (!WEBHOOKS_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env.local');
  }

  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const body = (await req.json()) as ClerkWebhookEvent; // Cast the body to the expected structure
  const wh = new Webhook(WEBHOOKS_SECRET);

  let evt: ClerkWebhookEvent;

  try {
    evt = wh.verify(JSON.stringify(body), {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookEvent;
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }

  if (evt.type === 'user.created') {
    const userData = evt.data;

    const newUser = {
      name: userData.first_name ?? userData.last_name ?? 'Unknown', 
      clerkId: userData.id,
      email: userData.email_addresses[0]?.email_address ?? 'no-email@domain.com', 
      username: userData.username ?? userData.first_name ?? userData.last_name ?? 'unknown_user',
      firstName: userData.first_name ?? '',
      lastName: userData.last_name ?? '',
      pictureUrl: userData.image_url ?? '', 
    };

    try {
      await db.insert(users).values(newUser).onConflictDoNothing(); 
      console.log('New user added:', newUser);
      return NextResponse.json({ message: 'User created' });
    } catch (error) {
      console.error('Error adding user to database:', error);
      return NextResponse.json({ error: 'Error adding user to database' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Webhook received' });
}
