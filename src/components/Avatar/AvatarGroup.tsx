'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps{
    users: User[];
}

const AvatarGroup:React.FC<AvatarGroupProps> = ({
    users
}) => {
    const firstThreeUsers = users.slice(0, 3);

    const positionMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'
    }
    
    return(
        <div className="relative h-11 w-11">
            {firstThreeUsers.map((user, index) => (
                <div
                    key={user.id}
                    className={`
                        absolute
                        inline-block
                        rounded-full
                        overflow-hidden
                        h-[21px]
                        w-[21px]
                        ${positionMap[index as keyof typeof positionMap]}
                    `}
                >
                    <Image
                        alt='Profile'
                        fill
                        src={user?.image || '/icons/user_plaecholder.png'}
                    />
                </div>
            ))}

        </div>
    )
}

export default AvatarGroup;