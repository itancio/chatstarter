import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { internal } from './_generated/api';

const http = httpRouter();

http.route({
    method: "POST",
    path: '/clerk-webhook',
    handler: httpAction(async (ctx, req) => {
        const body = await validateRequest(req);
        if (!body) {
            return new Response('Unauthorized', { status: 401 });
        }

        switch (body.type) {
            case 'user.created':
                await ctx.runMutation(internal.functions.user.upsert, { 
                    username: body.data.username!,
                    image: body.data.image_url,
                    clerkId: body.data.id,
                });
                break;
            case 'user.updated':

                break;
            case 'user.deleted':

                break;
            default:
                return new Response('Unrecognized event', { status: 400 });
        }

        return new Response('OK', { status: 200 });
    }),
});

const validateRequest = async (req: Request) => {
    const headers = req.headers;
    const text = await req.text();

    const svix_id = headers.get('svix-id');
    const svix_timestamp = headers.get('svix-timestamp');
    const svix_signature = headers.get('svix-signature');

    try {
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
        return webhook.verify(text, {
            id: svix_id!,
            timestamp: svix_timestamp!,
            signature: svix_signature!,
        }) as unknown as WebhookEvent;
    } catch (error) {
        console.error('Webhook verification failed:', error);
        return null;
    }
};

export default http;
