import React from 'react';

interface Props {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, disabled, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 w-[450px] py-2 rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#761BE4] focus:ring-opacity-50 ${disabled ? 'bg-[#CBB6E5] text-gray-500 cursor-not-allowed' : 'bg-[#761BE4] text-white hover:bg-[#6A19CD]'}`}
        >
            {children}
        </button>
    );
};

export default Button;