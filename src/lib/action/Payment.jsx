'use server'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const subscription = async (data,token) => {
    
    const res = await fetch(`${baseUrl}/seller/order`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    )
    const resdata=await res.json()
    return resdata
}