'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from '@prisma/client';
import Modal from "@/components/Modal";
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/components/button";

interface SettingModalProps{
    currentUser: User;
    isOpen?: boolean;
    onClose: () => void;
}

const SettingModal:React.FC<SettingModalProps> = ({
    currentUser,
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch, // for image value
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: currentUser?.name,
            image: currentUser?.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/settings', data)
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch((error) => toast.error("Something went wrong. Oops :) "))
        .finally(() => setIsLoading(false));
    }

    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-tx/20 pb12">
                        <h2
                            className="
                                text-base
                                font-semibold
                                leading-7
                                text-tx
                            "
                        >
                            Profile
                        </h2>
                        <p
                            className="
                                mt-1
                                text-sm
                                leading-6
                                text-tx/60
                            "
                        >
                            Edit your public information.
                        </p>
                        <div
                            className="
                                mt-10
                                flex
                                flex-col
                                gap-y-8
                            "
                        >
                            <Input
                                disabled={isLoading}
                                label="Name: "
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label 
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        leading-6
                                        text-tx
                                    "
                                >
                                    Photo

                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        alt="Profile Image"
                                        src={image || currentUser?.image || '/icons/user_plaecholder.png'}
                                        width={48}
                                        height={48}
                                        className="rounded-full"

                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1}}
                                        onUpload={handleUpload}
                                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                    >
                                        <Button 
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="
                            mt-6
                            flex
                            item-center
                            justify-end
                            gap-x-6
                        "
                    >
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancle
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SettingModal;