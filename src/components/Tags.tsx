import React from 'react';

interface TagProps {
    children: React.ReactNode;
    color?: 'orange' | 'green' | 'red' | 'gray' | 'none';
    onClick?: () => void;
    className?: string;
}

const Tag: React.FC<TagProps> = ({ children, color = 'none', onClick, className }) => {
    const colorStyles = {
        orange: 'bg-orange-100 text-orange-800 border-orange-300',
        green: 'bg-green-100 text-green-800 border-green-300',
        red: 'bg-red-100 text-red-800 border-red-300',
        gray: 'bg-gray-200 text-gray-800 border-gray-300',
        none: 'bg-white text-gray-800 border-gray-300',
    };

    return (
        <span
            onClick={onClick}
            className={`inline-block px-2 py-1 text-sm border rounded-full cursor-pointer ${colorStyles[color]} ${onClick ? 'hover:bg-opacity-80' : ''} ${className}`}
        >
      {children}
    </span>
    );
};

export default Tag;