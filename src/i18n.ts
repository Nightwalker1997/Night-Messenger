import { notFound }           from 'next/navigation';
import { getRequestConfig }   from 'next-intl/server';
 
// Can be imported from a shared config
export const locales = ['en', 'fa'];

export const defaultLocale = 'en';

export const direction = (locale: string) => {
    if (locale === 'en') {
        return 'ltr';
    }else if (locale === 'fa') {
        return 'rtl';
    }

}
export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();
    
    return {
        messages: (await import(`./messages/${locale}.json`)).default
    };
});