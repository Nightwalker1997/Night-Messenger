'use client';

import useOtherUser from "@/hooks/useOtherUser";
import { ConversationType } from "@/types";
import { Fragment, useMemo, useState, useEffect } from "react";
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@/components/Avatar";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/components/Avatar/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface ProfileDrawerProps{
    isOpen?: boolean;
    onClose: () => void;
    data: ConversationType;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data
}) => {
    const otherUser = useOtherUser(data);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const createdAt = useMemo(() => {
        return format(new Date(data.createdAt), 'PP');
    }, [data.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const statusText = useMemo(() => {
        if(data.isGroup){
            return `${data.users.length} members`;
        }

        return isActive ? 'Online' : 'Offline';

    }, [data, isActive])
    
    return(
        <>
            <ConfirmModal 
                isOpen={confirmOpen} 
                onClose={() => setConfirmOpen(false)} 
            />
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-500'
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="
                                fixed
                                inset-0
                                bg-black
                                bg-opacity-40
                                
                            "                
                        />
                    </Transition.Child>
                    <div className="fixes inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div 
                                className="
                                    pointer-event-none 
                                    fixed 
                                    inset-y-0 
                                    right-0 
                                    flex 
                                    max-w-full 
                                    pl-10
                                "
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter='transform transition ease-in-out duration-500'
                                    enterFrom="translate-x-full"
                                    enterTo="opacity-100"
                                    leave='transform transition ease-in-out duration-500'
                                    leaveFrom="translate-x-full"
                                    leaveTo="opacity-100"
                                >
                                    <Dialog.Panel
                                        className="
                                            pointer-cursor
                                            w-screen
                                            max-w-md
                                        "
                                    >
                                        <div 
                                            className="
                                                flex 
                                                h-full 
                                                flex-col 
                                                overflow-y-scroll 
                                                bg-white 
                                                py-6 
                                                shadow-xl
                                            "
                                        >
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            onClick={onClose}
                                                            className="
                                                                rounded-md
                                                                bg-white
                                                                text-tx/80
                                                                hover:text-tx
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-info/50
                                                                focus:ring-offset-2
                                                            "
                                                        >
                                                            <span className="sr-only">Close paned</span>
                                                            <FontAwesomeIcon icon={ faClose } size="lg" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="
                                                    relative
                                                    mt-6
                                                    flex-1
                                                    px-4
                                                    sm:px-6
                                                "
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-2">
                                                        {
                                                            data.isGroup
                                                            ?
                                                                <AvatarGroup users={data.users} />
                                                            :
                                                                <Avatar user={otherUser}/>
                                                        }
                                                    </div>
                                                    <div>
                                                        {title}
                                                    </div>
                                                    <div className="text-sm text-tx/60">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <div
                                                            onClick={() => setConfirmOpen(true)}
                                                            className="
                                                                flex
                                                                flex-col
                                                                gap-3
                                                                items-center
                                                                cursor-pointer
                                                                hover:opacity-75
                                                            "
                                                        >
                                                            <div
                                                                className="
                                                                    w-10
                                                                    h-10
                                                                    bg-error/10
                                                                    rounded-full
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                "
                                                            >
                                                                <FontAwesomeIcon icon={ faTrash } size="lg" />

                                                            </div>
                                                            <div className="text-sm font-light text-tx/50">
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="
                                                            w-full
                                                            py-5
                                                            sm:px-0
                                                            sm:pt-0
                                                        "
                                                    >
                                      
                                                        <div>
                                                            <dt
                                                                className="
                                                                    text-sm
                                                                    font-medium
                                                                    text-tx/80
                                                                    sm:w-40
                                                                    sm:flex-shrink-0
                                                                "
                                                            >
                                                                {
                                                                    data.isGroup ? 'Emails:' : 'Email:' 
                                                                }
                                                            </dt>
                                                            <dd
                                                                className="
                                                                    mt-1
                                                                    text-sm
                                                                    text-tx
                                                                    sm:col-span-2
                                                                "
                                                            >
                                                                {data.isGroup 
                                                                    ? 
                                                                        data.users.map(user => user.email).join(',\n ') 
                                                                    : 
                                                                        otherUser.email
                                                                }
                                                            </dd>
                                                        </div>
                                                        <hr className="my-2" />
                                                        <div>
                                                            <dt
                                                                className="
                                                                    text-sm
                                                                    font-medium
                                                                    text-tx/80
                                                                    sm:w-40
                                                                    sm:flex-shrink-0
                                                                "
                                                            >
                                                                {
                                                                    data.isGroup ? 'CreatedAt:' : 'Joined:' 
                                                                }
                                                            </dt>
                                                            <dd
                                                                className="
                                                                    mt-1
                                                                    text-sm
                                                                    text-tx
                                                                    sm:col-span-2
                                                                "
                                                            >
                                                                {data.isGroup 
                                                                    ? 
                                                                        <time dateTime={createdAt}>
                                                                            { createdAt }
                                                                        </time>
                                                                    : 
                                                                        <time dateTime={joinedDate}>
                                                                            { joinedDate }
                                                                        </time>
                                                                }
                                                                

                                                            </dd>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileDrawer;