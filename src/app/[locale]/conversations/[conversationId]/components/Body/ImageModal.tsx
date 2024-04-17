'use client';

import Modal from "@/components/Modal";
import Image from "next/image";


interface ImageModalProps{
    src: string | null;
    isOpen: boolean;
    onClose: () => void;
}


const ImageModal:React.FC<ImageModalProps> = ({
    src,
    isOpen,
    onClose
}) => {
    if(!src){
        return null;
    }
    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="h-96 w-96">
                <Image
                    src={src}
                    alt="image"
                    fill
                    className="object-cover"
                />
            </div>
        </Modal>
    )
}

export default ImageModal;