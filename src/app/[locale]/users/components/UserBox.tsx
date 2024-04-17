'use client';

import { User } from "@prisma/client";
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Avatar from '@/components/Avatar';
import LoadingModal from "@/components/Modal/LoadingModal";

interface UserBoxProps {
    data: User;
}

const UserBox:React.FC<UserBoxProps> = ({
    data
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', { userId: data.id })
        .then((data) => {
        router.push(`/conversations/${data.data.id}`);
        })
        .catch(err => {
            console.log("Error in UserBox: ", err);
        })
        .finally(() => setIsLoading(false));
    }, [data, router]);
    
    return(
        <>
        {isLoading && <LoadingModal />}
        <div
            onClick={handleClick}
            className="
                w-full 
                relative 
                flex 
                items-center 
                space-x-3 
                bg-bgcolor-main
                border-primary
                shadow-bgcolor-secondary
                hover:border-2
                hover:shadow-md
                px-3
                py-1.5
                hover:bg-bgcolor-main
                rounded-lg
                transition
                cursor-pointer
                overflow-y-auto
                mx-1.5
            "
        >
             <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <span 
                            className="absolute inset-0" 
                            aria-hidden="true" 
                        />
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
                                    text-sm 
                                    font-medium 
                                    text-tx
                                "
                            >
                                {data.name}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
        </>

    )
}

export default UserBox;