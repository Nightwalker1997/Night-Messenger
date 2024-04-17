import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';
import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/libs/pusher";

interface IParams{
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params: IParams}
) {
    try{
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('access denied', {status: 401});
        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                users: true
            }
        });

        if(!existingConversation){
            return new NextResponse('Invalid request ID ', { status: 400});
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where:{
                id: conversationId,
                userIds:{
                    hasSome: [currentUser.id]
                }
            }
        });

        existingConversation.users.forEach(user => {
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
            }
        })

        return NextResponse.json(deletedConversation);
        
    }catch(err){
        console.error("Conversation Delete: ", err);
        return new NextResponse('Server Error in conversation Delete', { status: 500});
    }
}