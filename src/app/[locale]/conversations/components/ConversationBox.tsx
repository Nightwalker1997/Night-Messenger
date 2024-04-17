'use client';

import { useCallback, useMemo  } from "react";
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from "@prisma/client";
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from "clsx";
import useOtherUser from '@/hooks/useOtherUser';
import { FullConversationType } from '@/types';
import Avatar from "@/components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import AvatarGroup from "@/components/Avatar/AvatarGroup";

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}


const ConversationBox:React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const message = data.messages || [];

        return message[message.length - 1];
    }, [data]);

    const userEmail = useMemo(() => {
        const email = session?.data?.user?.email;

        return email;
    }, [session?.data?.user?.email])

    const hasSeen = useMemo(() => {
        if(!lastMessage){
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if(!userEmail){
            return false;
        }

        return seenArray.filter(user => user.email === userEmail).length !== 0;

    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if(lastMessage?.image){
            return "Sent an image"
        }

        if(lastMessage?.body){
            return lastMessage.body;
        }

        return "Started a conversation";

    }, [lastMessage])
return(
        <div
            onClick={handleClick}
            className={clsx(`
                w-full
                relative
                flex
                items-center
                space-x-3
                hover:bg-bg/50
                rounded-lg
                transition
                cursor-pointer
                p-3
            `,
            selected ? 'bg-bg/80' : 'bg-bg/90'
        )}
        >
            {
                data.isGroup 
                ?
                    <AvatarGroup users={data.users} />
                :
                    <Avatar user={otherUser} />
            }
            <div
                className="min-w-0 flex-1"
            >
                <div className="focus:outline-none">
                    <div 
                        className="
                            flex 
                            justify-between 
                            items-center 
                            mb-1
                        "
                    >
                        <p
                            className="
                                text-md
                                font-medium
                                text-tx/90
                            "
                        >
                            {
                                data.name || otherUser.name
                            }
                        </p>
                        {lastMessage?.createdAt && (
                            <p
                                className="
                                    text-xs
                                    font-light
                                    text-tx/40
                                "
                            >
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <div
                        className="
                            flex
                        "
                    >

                        <p
                            className="
                                text-xs
                                mr-2
                            "
                        >
                            <FontAwesomeIcon icon={hasSeen ? faCheckDouble : faCheck} />
                        </p>
                        <p
                            className="
                                truncate
                                text-xs
                                font-light
                            "
                        >
                            {lastMessageText}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox;