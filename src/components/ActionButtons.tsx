import React, { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

interface ActionButtonsProps {
    onRepair: () => void;
    onAssemble: () => void;
    reStart: () => void;
    isDisabled: boolean;
    selectedData: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onRepair, onAssemble, reStart, isDisabled, selectedData }) => {
    const [isModalOpen, setIsModalOpen] = useState<{
        isOpen: boolean,
        status: string
    }>({
        isOpen: false,
        status: ""
    });
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100">
            <button
                onClick={() => setIsModalOpen({
                    isOpen: true,
                    status: "repair"
                })}
                className="cursor-pointer px-4 py-2 bg-black text-white rounded disabled:bg-gray-400"
                disabled={isDisabled}
            >
                Send to Repair
            </button>
            <button
                onClick={() => setIsModalOpen({
                    isOpen: true,
                    status: "assemble"
                })}
                className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
                Ready to Assemble
            </button>
            <button className="cursor-pointer px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm" onClick={reStart}>
                Restart
            </button>
            <ConfirmationDialog
                isOpen={isModalOpen?.isOpen}
                onClose={() => setIsModalOpen({ isOpen: false, status: "" })}
                onConfirm={() => {
                    isModalOpen?.status === 'repair' ? onRepair() : onAssemble()
                    setIsModalOpen({ isOpen: false, status: "" });
                }}
                title="Confirm Status"
                message={`Update Status of Element Part ID ${selectedData
                    ?.map((item: any) => item.id)
                    .join(", ")} to "Ready to ${isModalOpen?.status}"`}
            />

        </div>
    );
};

export default ActionButtons;