'use client';

import { ConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/components/Avatar/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
    conversation: ConversationType;
}
  
const Header:React.FC<HeaderProps> = ({
    conversation
}) =>{
    const otherUser = useOtherUser(conversation);
    const [ drawerOpen, setDrawerOpen ] = useState<boolean>(false);
    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;
    const statusText = useMemo(() => {
        if(conversation.isGroup){
            return `${conversation.users.length} members`;
        }

        return isActive ? 'Online' : 'Offline';
    }, [conversation, isActive])
    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div
                className="
                    bg-bg
                    w-full
                    flex
                    border-b-[1px]
                    sm:px-4
                    py-3
                    px-4
                    lg:px-6
                    justify-between
                    items-center
                    shodow-sm
                "
            >
                <div className="flex gap-3 items-cetner">
                    <Link 
                        className="
                            lg:hidden
                            block
                            text-info/80
                            hover:text-info
                            transition
                            cursor-pointer
                            
                        "
                        href={'/conversations'}
                    >
                        <FontAwesomeIcon 
                            icon={faAngleLeft} 
                            size="xl"
                        />
                    </Link>
                    {
                        conversation.isGroup
                        ?
                            <AvatarGroup users={conversation.users} />
                        :
                            <Avatar user={otherUser} />
                    }
                    <div className="flex flex-col">
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-ligh text-tx/80">
                            { statusText }
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => setDrawerOpen(true)}
                    className="
                        text-info/80
                        cursor-pointer
                        hover:text-info
                        transition
                    "
                >
                    <FontAwesomeIcon icon={faEllipsis} size="xl"/>
                </div>
            </div>
        </>
    )
}

export default Header;