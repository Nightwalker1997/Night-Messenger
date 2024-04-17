'use client';

import { User } from "@prisma/client";
import UserBox  from './UserBox';

interface UserListProps {
  usersList: User[];
  people: string;
}

const UserList: React.FC<UserListProps> = ({ 
    usersList, 
    people
}) => {
    return ( 
        <aside 
            className="
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
            "
        >
        <div className="px-5 ">
            <div
                className="
                    flex 
                    flex-col 
                    items-center 
                    justify-center
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
                    {people}
                </div>
            </div>
            {usersList.map((user) => (
                <UserBox
                    key={user.id}
                    data={user}
                />
            ))}
        </div>
    </aside>
  );
}
 
export default UserList;
