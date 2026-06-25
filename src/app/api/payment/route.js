import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';



export async function POST(req) {
    // const { searchParams } = new URL(req.url);
    // const bookId = searchParams.get("bookId");
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const usersession = await auth.api.getSession({
            headers: await headers(),
        });

        const user = usersession?.user
        const formData=await req.formData()
        const price=formData.get('price')
        const title=formData.get('title')
        const productID=formData.get('productID')

        // Create Checkout Sessions from body params.
        // const PRICE_ID = 'price_1Tjby2KsxpYfNWixo666TQHY'
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price_data:{
                        currency:"usd",
                        unit_amount:Number(price)*100,
                        product_data:{
                            name:title,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                price,
                userEmail: user?.email,
                userId: user?.id,
                // bookId:bookId,
                title,
                productID

            },
            mode: 'payment',
            success_url: `${origin}/allbooks/success-payment?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}