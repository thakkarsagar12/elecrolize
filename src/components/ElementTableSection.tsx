import React, { useEffect, useState } from "react";
import ChecklistSection from "@components/ChecklistSection";
import { ElementProp } from "../data";
import ActionButtons from "@components/ActionButtons";

interface ElementTableSectionProps {
    selectedElectrolyzer: number | null;
    elements: ElementProp[];
    selectedElements: ElementProp[];
    onSelectElement: (element: ElementProp) => void;
    onSelectAll: (checked: boolean) => void;
    comments: { [key: string]: string };
    onCommentChange: (id: string, value: string) => void;
    checklistItems: string[];
    selectedItems: string[];
    toggleItems: (item: string) => void;
    clearSelectedItems: () => void;
    onRepair: () => void;
    onAssemble: () => void;
    onRestart: () => void;
}

const ElementTableSection: React.FC<ElementTableSectionProps> = ({
    selectedElectrolyzer,
    elements,
    selectedElements,
    onSelectElement,
    onSelectAll,
    comments,
    onCommentChange,
    checklistItems,
    selectedItems,
    toggleItems,
    clearSelectedItems,
    onRepair,
    onAssemble,
    onRestart,
}) => {
    // Local state to manage updated elements
    const [updatedElements, setUpdatedElements] = useState<ElementProp[]>(elements);

    // Sync elements with selectedElements and update status
    useEffect(() => {
        setUpdatedElements(elements);
    }, [elements, selectedElements]);

    const isAllSelected = updatedElements.every((element) =>
        selectedElements.some((sel) => sel.id === element.id)
    );

    return (
        <div className="flex p-4 space-x-4">
            <div className="w-2/5 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Electrolyzer ID: {selectedElectrolyzer}
                </h2>
                <div className="flex items-center justify-between border-b border-gray-300 py-2">
                    <div className="flex space-x-4 text-sm font-medium text-gray-700">
                        <span>Position</span>
                        <span>Element Part ID</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={(e) => onSelectAll(e.target.checked)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Select all</span>
                    </div>
                </div>
                <div className="space-y-2 mt-2">
                    {updatedElements.map((element) => (
                        <div
                            key={element.id}
                            className="bg-gray-100 p-2 rounded"
                        >
                            <div
                                className="flex items-center justify-between "
                            >
                                <div className="flex items-center space-x-4">
                                    {element.status === "normal" && (
                                        <input
                                            type="checkbox"
                                            checked={selectedElements.some((el) => el.id === element.id)}
                                            onChange={() => onSelectElement(element)}
                                            className="cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                    )}

                                    <span className="text-sm text-gray-700">{element.position}</span>
                                    <span className="text-sm text-gray-700">{element.id}</span>
                                    {selectedElements.some((sel) => sel.id === element.id) && (
                                        <span className="text-sm text-gray-500">{selectedItems.length}</span>
                                    )}
                                    {element.status === "normal" && (
                                        <span className="text-sm text-gray-500">Normal</span>
                                    )}
                                    {element.status === "repair" && (
                                        <span className="text-sm text-red-500">Repair</span>
                                    )}
                                    {element.status === "assemble" && (
                                        <span className="text-sm text-green-500">Assemble</span>
                                    )}

                                </div>

                            </div>
                            <div className="grid grid-cols-2 gap-2" >
                                {(element?.checklist.length > 0) ?
                                    (
                                        element?.checklist?.map((item: string, index: number) => (
                                            <span key={index} className="bg-orange-100 px-2 py-1 rounded-full text-[10px] text-orange-500 font-semibold">{item}</span>
                                        ))
                                    )
                                    : null}
                            </div>
                            <div className="text-black">
                                {(element?.comment.length > 0 && element.status.toLowerCase() !== "normal") ?
                                    <span className="text-[12px] text-bold">Comments: <span className="text-[10px]">{element.comment}</span></span>
                                    : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-3/5 space-y-4">
                <div className="bg-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Cut Out Comments</h2>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-950"
                        placeholder="Cut out comments here"
                        rows={4}
                    />
                </div>
                <div className="bg-gray-200 p-4">
                    <ChecklistSection
                        checklistItems={checklistItems}
                        selectedItems={selectedItems}
                        onToggle={toggleItems}
                        onClear={clearSelectedItems}
                    />
                </div>
                <div className="bg-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Element Part ID Comments</h2>
                    {selectedElements.map((selectedElement) => (
                        <div key={selectedElement.id} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">{selectedElement.id}</label>
                            <textarea
                                value={comments[selectedElement.id] || ""}
                                onChange={(e) => onCommentChange(selectedElement.id, e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-950"
                                placeholder="Write your comment"
                                rows={2}
                            />
                        </div>
                    ))}
                </div>

                <ActionButtons
                    onRepair={onRepair}
                    onAssemble={onAssemble}
                    isDisabled={false}
                    selectedData={selectedElements}
                    reStart={onRestart} />
            </div>
        </div>
    );
};

export default ElementTableSection;