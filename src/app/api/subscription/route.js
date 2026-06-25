import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';



export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const usersession = await auth.api.getSession({
            headers: await headers(),
        });

        const user = usersession?.user

        // Create Checkout Sessions from body params.
        const PRICE_ID = 'price_1Tjby2KsxpYfNWixo666TQHY'
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                priceid: PRICE_ID,
                useremail: user?.email,
                userid: user?.id,
                bookId:bookId

            },
            mode: 'subscription',
            success_url: `${origin}/allbooks/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}