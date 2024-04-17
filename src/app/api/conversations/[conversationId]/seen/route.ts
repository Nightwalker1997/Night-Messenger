import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/libs/pusher';

interface IParams{
    conversationId?: string;
}

export async function POST( 
    request: Request, 
    { params } : {params: IParams}
) {
    try{
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized', {status: 401});
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include:{
                messages:{
                    include:{
                        seen: true
                    }
                },
                users: true
            }
        });

        if(!conversation){
            return new NextResponse('Invalid Conversation Id', { status: 400 });
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1 ];

        if(!lastMessage){
            return NextResponse.json(conversation);
        }

        const updsatedMessage = await prisma.message.update({
            where:{
                id: lastMessage.id
            },
            include:{
                sender: true,
                seen: true,
            },
            data:{
                seen:{
                    connect:{
                        id: currentUser.id
                    }
                }
            }
        });

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updsatedMessage]
        });

        if(lastMessage.seenIds.indexOf(currentUser.id) !== -1){
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId!, 'message:update', updsatedMessage);

        return NextResponse.json(updsatedMessage);
        
    }catch(err){

        console.error("Internal Server Error at conversation Id Seen: ", err);
        return new NextResponse("Internal Server Error", { status: 500})
    }
}