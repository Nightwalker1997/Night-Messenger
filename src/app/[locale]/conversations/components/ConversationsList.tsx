'use client';

import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import useConversation from "@/hooks/useConversation";
import clsx from 'clsx';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface ConversationsListProps{
    users: User[];
    conversations: FullConversationType[];
    messages: string;
}

const ConversationsList:React.FC<ConversationsListProps> = ({
    users,
    conversations,
    messages
}) => {
    const session = useSession();

    const [items, setItems] = useState(conversations);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if(!pusherKey) return;

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversationType) => {
            setItems(current => {
                if( find(current, {id: conversation.id})){
                    return current;
                }

                return [conversation, ...current];
            })
        };

        const updateHandler = (conversation: FullConversationType) => {
            setItems(current => current.map(currentConversation => {
                if(currentConversation.id === conversation.id){
                    return{
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }
                return currentConversation;
            }))
            
        }

        const DeleteHandler = (conversation: FullConversationType) => {
            setItems(current => {
                return [...current.filter(conversat => conversat.id !== conversation.id)];
            })

            if(conversationId === conversation.id){
                router.push('/conversations');
            }
        }

        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:remove', DeleteHandler);


        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newHandler);
            pusherClient.unbind('conversation:update', updateHandler);
            pusherClient.unbind('conversation:remove', DeleteHandler);
        }
    }, [pusherKey])
    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />    
            <aside 
                className={clsx(`
                    fixed
                    inset-y-0 
                    pb-20
                    md:pb-0
                    md:left-24 
                    md:w-[19rem] 
                    md:block
                    overflow-y-auto 
                    block 
                    w-full 
                    left-0
                    border-r-2
                    border-white
                `,
                    isOpen ? 'hidden' : 'block w-full left-0' 
                )}
            >
                <div className="px-5 ">
                    <div
                        className="
                            flex 
                            justify-between
                            mb-4
                            pt-4
                        "
                    >
                        <div 
                            className="
                                text-2xl 
                                font-bold 
                                text-tx 
                                py-4
                            "
                        >
                            {messages}
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="
                                rounded-full
                                py-4
                                mt-1
                                text-tx
                                hover:opacity-65
                                transition
                                cursor-pointer
                                font-2xl
                            "
                        >
                            <FontAwesomeIcon
                                icon={faUserPlus}
                                className={""}
                            />
                        </div>
                    </div>
                    {items.map(item => (
                        <ConversationBox
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>
    )
}

export default ConversationsList;