'use client';

import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MobileItemProps{
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem:React.FC<MobileItemProps> = ({
    href,
    icon,
    active,
    onClick
}) => {
    return(
        <Link
            onClick={onClick}
            href={href}
            className={clsx(`
                group
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-tx/50
                hover:text-tx
                hover:bg-bg/20
            `,
                active && "bg-secondary/10 rounded-full text-tx"
            )}
        >
                <FontAwesomeIcon 
                    className="h-6 w-6"
                    icon={icon} 
                />
        </Link>
    )
}

export default MobileItem;