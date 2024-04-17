'use client';
import axios from 'axios';
import {FC, useState, useCallback, useEffect} from 'react';
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/input';
import Button from '@/components/button';
import AuthSocialButton from './AuthSocialButton';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
var validator = require('validator');
import { signIn, useSession } from "next-auth/react";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Messages {
    // form_login_title: string;
    // form_register_title: string;
    // form_login: string;
    // form_register: string;
    // form_name: string;
    // form_email: string;
    // form_password: string;
    // form_or: string;
    // form_github: string;
    // form_google: string;
    // form_oldUser: string;
    // form_newUser: string;

    [key: string]: string;
}

type Variant = "LOGIN" | "REGISTER";

const AuthForm:FC<Messages> = ({
    form_login,
    form_login_title,
    form_register,
    form_register_title,
    form_name,
    form_email,
    form_password,
    form_or,
    form_github,
    form_google,
    form_newUser,
    form_oldUser,
    form_error_userExist,
    form_error_emptyBox
}) => {
    const session = useSession();
    const router = useRouter();

    // for switching between LOGIN and REGISTER
    const [variant, setVariant] = useState<Variant>('LOGIN');
    //to disable btn and input after submission
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if(session?.status === 'authenticated'){
            toast.success("you already Loged in!!")
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if(variant === "LOGIN") 
        {
            setVariant("REGISTER");
        }
        else
        { 
            setVariant("LOGIN");
        }
    }, [variant])
    
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email:'',
            password: ''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        if( variant === "REGISTER")
        {
            //check if all the *
            console.log("Data: ", data);
            axios.post('/api/register', data)
            .then(() => {
                signIn('credentials', data);
                toast.success(`Wellcome ${data.name}!`);
                router.push('/users')

            })
            .catch((err: any) => {
                // if(err.response?.data?.error){

                // }
                toast.error('Somthing went wrong!')
            })
            .finally(() => setIsLoading(false));
        }
        else if (variant === "LOGIN")
        {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error('Somthing went wrong!');
                }
                console.log("callback: ", callback)
                if(callback?.ok){
                    console.log("Not working :(");
                    toast.success("Login successFully");
                    router.push('/users')
                }
            })
            .finally(() => setIsLoading(false));
        }
        else
        {
            setIsLoading(false);
            return null;
        }
    }
    //sing in wiht google , github , etc.
    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {
            redirect: false
        })
        .then((callback) => {
            if(callback?.error){
                toast.error('Somthing went wrong!');
            }

            if(callback?.ok && !callback?.error){
                toast.success("Login successFully");
                router.push('/users')
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <>
            <div
                className="
                    sm:mx-auto
                    sm:w-full
                    sm:max-w-md
                "
            >
                <Image
                    src='/icons/messenger.png'
                    height={64}
                    width={64}
                    alt={"Messnger Icon"}
                    className='
                        mx-auto
                        w-auto
                    '
                />
                <h2
                    className="
                        mt-6
                        text-center
                        text-3xl
                        font-bold
                        tracking-tight
                        text-tx
                    "
                >
                    {

                        variant === "REGISTER" 
                        ? 
                            form_register_title 
                        : 
                            form_login_title
                    }
                </h2>
            </div>
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-bg/95
                    px-4
                    py-8
                    shadow
                    shadow-tx/25
                    sm:rounded-lg
                    sm:px-10
                "
            >
                    <form 
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {
                            variant === "REGISTER" && (
                                <Input 
                                    label={form_name}
                                    id="name"
                                    type='text'
                                    autofocus={variant === "REGISTER"}
                                    disabled={isLoading}
                                    required={true}
                                    register={register}
                                    errors={errors}
                                />
                            )
                        }
                        <Input 
                            label={form_email}
                            id="email"
                            type='email'
                            disabled={isLoading}
                            autofocus={variant === "LOGIN"}
                            required={true}
                            // pattern={/\S+@\S+\.\S+/}
                            register={register}
                            errors={errors}
                        />
                        <Input 
                            label={form_password}
                            id="password"
                            type='password'
                            disabled={isLoading}
                            required={true}
                            register={register}
                            errors={errors}
                        />
                        <div>
                            <Button
                                disabled={isLoading}
                                fullWidth
                                type="submit"
                            >
                                {variant === "REGISTER" ? form_register : form_login}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div 
                                className="
                                    absolute 
                                    inset-0 
                                    flex 
                                    items-center
                                "
                            >
                                <div className="w-full border-t border-primay border-2" />
                            </div>

                            <div
                                className="
                                    relative 
                                    flex 
                                    justify-center 
                                    text-sm
                                "
                            >
                                <span
                                    className="
                                        bg-bg
                                        px-2
                                        text-tx
                                    "
                                >
                                    {form_or}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="
                            mt-6
                            flex
                            gap-2
                        "
                    >
                        <AuthSocialButton 
                            text={form_github}
                            icon={faGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton 
                            text={form_google}
                            icon={faGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>

                    <div
                        className="
                            flex 
                            gap-2 
                            justify-center 
                            text-sm 
                            mt-6 
                            px-2 
                            text-tx 

                        "
                    >
                        <div>
                            {
                                variant === "REGISTER" ?  form_oldUser : form_newUser 
                            }
                        </div>
                        <div
                            onClick={toggleVariant}
                            className="
                                hover:text-info 
                                hover:underline
                                cursor-pointer
                            "
                        >
                            {
                                variant === "REGISTER" ? form_login : form_register_title
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthForm;