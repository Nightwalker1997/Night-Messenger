'use client';

import { useState, useCallback } from 'react';
import Modal from "@/components/Modal";
import { Dialog, Transition } from "@headlessui/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useConversation from '@/hooks/useConversation';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/button';

interface ConfirmModalProps{
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModal:React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(() =>{
            onClose();
            router.push('/conversations');
            router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false))
    }, [router, conversationId, onClose]);

    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='sm:flex sm:items-start'>
                <div
                    className="
                        mx-auto
                        flex
                        h-12
                        w-12
                        flex-shrink-0
                        justify-center
                        items-center
                        rounded-full
                        bg-red-200
                        sm:mx-0
                        sm:h-10
                        sm:w-10
                    "
                >
                    <FontAwesomeIcon icon={faTriangleExclamation} size='xl' />
                </div>
                <div
                    className="
                        mt-3
                        text-center
                        sm:ml-4
                        sm:mt-0
                        sm:text-left
                    "
                >
                    <Dialog.Title
                        as='h3'
                        className="
                            text-base
                            font-semibold
                            leading-6
                            text-tx
                        "
                    >
                        Delete Conversation
                    </Dialog.Title>
                    <div className="mt-2">
                        <p
                            className="
                                text-sm
                                text-tx/80
                                
                            "
                        >
                            Are you sure you want to delete this conversation?
                             This action connot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="
                    mt-5
                    sm:mt-4
                    sm:flex
                    sm:flex-row-reverse
                    gap-2
                "
            >
                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}


export default ConfirmModal;