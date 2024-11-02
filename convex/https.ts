import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { internal } from './_gnerated/api'
const http = httpRouter();

http.route({
    method: "POST",
    path: '/clerk-webhook',
    handler: httpAction(async (ctx, req) => {
        const body = await validateRequest(req);
        if (!body) {
            return new Response('Unauthorized', { status: 401 })
        }
        switch (body.type {
            await ctx.runMutation( internal.functions.user.upsert, )
            case 'user.created':
                break;
            case 'user.updated':
                break;
            case 'user.deleted':
                break;
        }
        return new Response('OK', { status: 200 })
    }),
});

const validateRequest = async (req: Request) => {
    const headers = req.headers;
    const text = await req.text();

    const svix_id = headers.get('svix-id')
    const svix_timestamp = headers.get('svix-timestamp')
    const svix_signature = headers.get('svix-signature')

    try {
        const webhook = new Webhook( process.env.CLERK_WEBHOOK_SECRET! );
        return webhook.verify( text, {
            id: svix_id,
            timestamp: svix_timestamp,
            signature: svix_signature,
        }) as unknown as WebhookEvent;
    } catch (error) {
        return error
    };
    

};

export default http;