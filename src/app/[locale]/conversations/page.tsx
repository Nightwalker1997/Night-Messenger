'use client';

import clsx from 'clsx';
// import { useTranslations } from 'next-intl';
import useConversation from '@/hooks/useConversation';
import EmptyState from '@/components/EmptyState';

const Conversations  = () => {
    const { isOpen } = useConversation();
    
    // const t = useTranslations('State');
    
    return (
        <div
            className={clsx(`
                lg:pl-80 h-full lg:block
            `,
                isOpen ? 'block' : 'hidden'
            )}
        >
            <EmptyState 
                emptyMessage={ "Select a chat or start a new conversation."/*('emptyState')*/} 
            />
        </div>
    )
}

export default Conversations;