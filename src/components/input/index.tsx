'use client';

import { FC } from 'react';
import clsx from 'clsx';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form';


interface InputProps{
    label:          string;
    id:             string;
    type?:          string;
    placeholder?:   string;
    alt?:           string;
    
    autofocus?:     boolean;
    required?:      boolean;
    disabled?:      boolean;
    readonly?:      boolean;
    
    pattern?:       string | RegExp | undefined;

    autocomplete?:  "on" | "off";
    register:       UseFormRegister<FieldValues>;
    errors:         FieldErrors;

}
const Input:FC<InputProps> = ({
    label,      
    id,
    type,
    placeholder,
    pattern,
    alt,
    autofocus,
    required,
    disabled,
    readonly,
    autocomplete,
    register,
    errors
}) => {

    return (
        <div>
            <label 
                className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-tx/95
                "
                htmlFor={id}
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    // pattern={pattern}
                    alt={alt}
                    autoFocus={autofocus}
                    disabled={disabled}
                    readOnly={readonly}
                    autoComplete={autocomplete}
                    {
                        ...register(id, { 
                            required,
                      
                        })
                    }

                    className={clsx(`
                        text-black
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-bg-10
                        placeholder:text-bg/40
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-success/30
                        sm:text-sm
                        sm:leading-6`,
                        errors[id] && "focus:ring-error",
                        disabled && "opacity-50 cursor-default"
                    )}

                />
            </div>
        </div>
    )
}

export default Input;