'use client';

import clsx from 'clsx';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DesktopItemProps{
    href: string;
    label: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;

}

const DesktopItem: React.FC<DesktopItemProps> = ({
    href,
    label,
    icon,
    active,
    onClick
}) => {
    return(
        <li
            onClick={onClick}
        >
            <Link
                href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    px-3
                    py-4
                    text-lg
                    leading-12
                    font-semibold
                    text-tx/50
                    hover:text-tx
                    hover:bg-bg/20
                `,
                    active && 'bg-secondary/10 rounded-full text-tx'
                )}
            >


                <FontAwesomeIcon 
                    className="h-6 w-6 shrink-0"
                    icon={icon} 
                />
                <span
                    className="sr-only"
                >
                    {label}
                </span>
            </Link>
        </li>
    )
}

export default DesktopItem;