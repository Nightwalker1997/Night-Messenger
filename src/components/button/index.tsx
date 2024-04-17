'use client';

import clsx from "clsx";
import { ReactNode, FC } from "react";

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: ReactNode,
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}
const Button:FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
}) => {
    return (
        <button 
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`
                flex
                justify-center
                px-3
                py-2
                text-sm
                fonst-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                rounded
                shadow
                
            `,
            disabled && "opacity-50 cursor-defualt",
            fullWidth && "w-full",
            secondary ? "text-tx" : "text-bg",
            danger && "bg-error/80 hover:bg-error focus-visible:outline-error",
            !secondary && !danger && "bg-info hover:bg-info/90 focus-visible:outline-info")}
        >
            {children}
        </button>
    )
}

export default Button;