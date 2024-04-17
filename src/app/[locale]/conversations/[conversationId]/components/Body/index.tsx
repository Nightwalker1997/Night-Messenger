'use client';

import { useEffect, useRef, useState } from 'react';
import { FullMessageType } from "@/types";
import useConversation from '@/hooks/useConversation';
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/libs/pusher';
import { find } from 'lodash';

interface BodyProps{
    initialMessages: FullMessageType[];
}

const Body:React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();


    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const MessageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)
            setMessages((current) => {
                //prevent from duplacate messages 
                if(find(current, {id: message.id})){
                    return current;
                }

                return [...current, message]
            });
            bottomRef?.current?.scrollIntoView();

        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
             setMessages(current => current.map(currentMessage => {
                if(currentMessage.id === newMessage.id){
                    return newMessage;
                }
                return currentMessage;
             })); 
        }

        pusherClient.bind('message:new', MessageHandler);
        pusherClient.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('message:new', MessageHandler);
            pusherClient.unbind('message:update', updateMessageHandler)
        }
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length -1 }
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
            
        </div>
    )
}

export default Body;