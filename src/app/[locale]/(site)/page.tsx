import {useTranslations} from 'next-intl';
import AuthForm from './components/AuthForm';

export default function Home() {
    const t = useTranslations('Form');
    return (
        <main 
            className="
                flex
                min-h-full
                flex-col
                justify-center
                py-12
                sm:px-6
                lg:px-8
                bg-bg
                text-tx
            "
        >
            
            <AuthForm
                form_register_title={t('register_title')}
                form_login_title={t('login_title')}
                form_name={t('name')}
                form_email={t('email')}
                form_password={t('password')}
                form_register={t('register')}
                form_login={t('login')}
                form_or={t('or')}
                form_github='Github'
                form_google='Google'
                form_newUser='New to NightMessenger?'
                form_oldUser='Already have an account?'
                form_error_userExist="User already exists"
                form_error_emptyBox="Please fill all the boxes"
            />
        </main>
    )
}
