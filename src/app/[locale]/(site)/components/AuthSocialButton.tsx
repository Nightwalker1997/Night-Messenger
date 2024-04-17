import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FC} from 'react';

interface AuthSocialButtonProps {
    icon: any;
    text: string;
    onClick: () => void;

}

const AuthSocialButton: FC<AuthSocialButtonProps> = ({
    text,
    icon,
    onClick
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                inline-flex
                w-full
                justify-center
                rounded-md
                bg-info/90
                px-4
                py-2
                text-white
                shadow-sm
                shadow-tx
                hover:shadow-none
                ring-1
                ring-inset
                ring-info
                hover:bg-info

            "
        >
            <div className="inline-block">
                {text}
                <FontAwesomeIcon 
                    className="px-2"
                    icon={icon} 
                />
            </div>
        </button>
    )
}

export default AuthSocialButton;