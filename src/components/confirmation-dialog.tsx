import React from "react";
import Button from "@components/button";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationDialog: React.FC<PopupProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 transition-opacity bg-gray-500/75 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end gap-2">
                    <Button variant="cancel" onClick={onClose}>Cancel</Button>
                    <Button variant="confirm" onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;