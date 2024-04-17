'use client';
import useActiveList from '@/hooks/useActiveList';
import { User } from '@prisma/client';
import Image from "next/image";
import clsx from 'clsx';

interface AvatarProps{
    user?: User;
}
const Avatar:React.FC<AvatarProps> = ({
    user
}) => {
    const { members } = useActiveList();
    const isOnline = members.indexOf(user?.email!) !== -1;

    return(
        <div className="relative">
            <div
                className="
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    ring-2
                    ring-primary
                    h-9
                    w-9
                    md:h-11
                    md:w-11
                "
            >
                <Image 
                    alt='avater'
                    src={user?.image || '/icons/user_plaecholder.png'}
                    fill
                />
            </div>
             <span
                className={clsx(`
                    absolute
                    block
                    rounded-full
                    
                    ring-2
                    ring-white
                    top-0
                    right-0
                    h-2
                    w-2
                    md:h-3
                    md:w-3
                `, 
                    isOnline ? 'bg-green-500 ': 'bg-red-500'
                )}
            />
        </div>
    )
}

export default Avatar;