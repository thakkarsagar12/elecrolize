import React from "react";
import Button from "./button";
interface ChecklistSectionProps {
    checklistItems: string[];
    selectedItems: string[];
    onToggle: (item: string) => void;
    onClear: () => void;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({
    checklistItems,
    selectedItems,
    onToggle,
    onClear,
}) => {
    return (
        <div className="bg-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Disassembly Checklist ({selectedItems.length})
            </h2>
            <div className="flex flex-wrap gap-2">
                {checklistItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => onToggle(item)}
                        className={`px-2 py-1 rounded cursor-pointer hover:bg-orange-100 text-sm ${selectedItems.includes(item)
                            ? "bg-orange-200 text-orange-800"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <button
                onClick={onClear}
                className="mt-2 px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm"
            >
                Clear Selection
            </button>
        </div>
    );
};

export default ChecklistSection;