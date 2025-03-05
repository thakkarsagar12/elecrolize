import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'cancel' | 'confirm';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', disabled, className }) => {
    const baseStyles = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
        primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
        secondary: 'bg-gray-400 text-black hover:bg-gray-500 focus:ring-gray-400',
        cancel: 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-300',
        confirm: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;