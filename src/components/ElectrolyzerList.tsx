import React from "react";
import Tag from "@components/tags";
import SearchInput from "@components/search-input";

interface Props {
    electrolyzers: number[];
    selectedElectrolyzer: number | null;
    searchTerm: string;
    onSearch: (value: string) => void;
    onSelect: (id: number) => void;
}

const ElectrolyzerList: React.FC<Props> = ({
                                               electrolyzers,
                                               selectedElectrolyzer,
                                               searchTerm,
                                               onSearch,
                                               onSelect,
                                           }) => {
    const filteredElectrolyzers = electrolyzers.filter((id) =>
        id.toString().includes(searchTerm)
    );

    return (
        <div className="w-1/4 p-4 border-r border-gray-300 bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Available Electrolyzers ID
            </h2>
            <SearchInput
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search Electrolyzer ID"
            />
            <div className="mt-2 flex flex-col gap-2">
                {filteredElectrolyzers.map((id) => (
                    <Tag
                        key={id}
                        color={selectedElectrolyzer === id ? "orange" : "gray"}
                        onClick={() => onSelect(id)}
                    >
                        {id}
                    </Tag>
                ))}
            </div>
        </div>
    );
};

export default ElectrolyzerList;