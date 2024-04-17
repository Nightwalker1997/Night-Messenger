import {useTranslations} from 'next-intl';
import EmptyState from '@/components/EmptyState';
const Users = () => {
    const t = useTranslations('State');

    return (
        <div
            className="
                hidden
                lg:block
                lg:pl-80
                h-full
                
            "
        >
            <EmptyState emptyMessage={t('emptyState')} />
        </div>
    )
}

export default Users;