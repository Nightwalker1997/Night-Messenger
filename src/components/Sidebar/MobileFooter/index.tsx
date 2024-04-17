'use client';

import useConversation from '@/hooks/useConversation';
import useRoutes from '@/hooks/useRoutes';
import MobileItem from './MobileItem';

const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if(isOpen) {
        return null;
    }

    return(
        <div
            className="
                fixed
                justify-between
                w-full
                bottom-0
                z-40
                flex
                items-center
                bg-bg/80
                boreder-t-[1px]
                lg:hidden
            "
        >
            { routes.map((item) => (
                <MobileItem
                    key={item.label}
                    href={item.href}
                    active={item.active}
                    icon={item.icon}
                    onClick={item.onClick}
                />
            ))}
        </div>
    )
    
}

export default MobileFooter;