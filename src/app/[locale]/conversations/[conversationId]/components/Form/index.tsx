'use client';

import useConversation from "@/hooks/useConversation";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import MessageInput from "./MessageInput";
import { CldUploadButton } from 'next-cloudinary';

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            message: ''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true});

        axios.post('/api/messages', {
            ...data,
            conversationId
        }) 
    }

    const handleUpload = (result: any) =>{
        console.log("conversationId> form> handleUpload")
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
    return (
        <div
            className="
                p-4
                bg-bg/10
                border-t
                flex
                items-center
                gap-2
                lg:gap-4
                w-full
            "
        >
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            >
                <FontAwesomeIcon icon={faImage} size='xl' />
            </CldUploadButton>

            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    items-center
                    gap-2
                    lg:gap-4
                    w-full
                "
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                
                <button 
                    type="submit"
                    className="
                        rounded-full
                        p-2
                        bg-info/80
                        cursor-pointer
                        hover:bg-info
                        transition
                        text-tx
                    "
                >
                    <FontAwesomeIcon icon={faPaperPlane} size='xl' />
                </button>
            </form>
        </div>
    )
}

export default Form;