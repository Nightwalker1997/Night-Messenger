import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';

export async function POST(
    request:Request
) {
    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {image, name} = body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("access denied", {status: 401});
        }

        const upadtedUser = await prisma.user.update({
            where:{
                id: currentUser.id
            },
            data:{
                image: image,
                name: name
            }
        });

        return NextResponse.json(upadtedUser);
        
    }catch(error){
        console.error("Error in API Setting: ", error);
        return new NextResponse("Server error", {status: 500})
    }
}
