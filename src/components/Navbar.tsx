import React from "react";

interface NavbarProps {
    title: string;
    subLabels?: string[];
    badge?: string;
    selectedElectrolyzer?: number | null;
}

const Navbar: React.FC<NavbarProps> = ({
                                           title,
                                           subLabels = [],
                                           badge = null,
                                           selectedElectrolyzer = null,
                                       }) => {
    return (
        <nav className="bg-gray-200 p-4 flex justify-between items-center max-w-full">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-800">
                    {title} {selectedElectrolyzer ? `| Electrolyzer ID: ${selectedElectrolyzer}` : ""}
                </h1>
                {subLabels.length > 0 && (
                    <div className="flex gap-2">
                        {subLabels.map((label, index) => (
                            <span key={index} className="text-sm text-gray-600">
                {label}
              </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2">
                {badge && (
                    <span className="rounded text-sm font-medium text-gray-800 bg-white p-2">
            {badge}
          </span>
                )}
            </div>
        </nav>
    );
};

export default Navbar;