"use client";
import React, { useEffect, useReducer, useState } from "react";
import Navbar from "@components/navbar";
import ElectrolyzerList from "@components/ElectrolyzerList";
import { checklist_items, electrolyzer_ids, element_ids, ElementProp } from "../data";
import ElementTableSection from "@components/ElemetTableSelection";

interface PageState {
  selectedElectrolyzer: number | null;
  searchTerm: string;
  selectedElements: ElementProp[];
  comments: { [key: string]: string };
  selectedItems: string[];
}

// Reducer and Initial State
const initialState: PageState = {
  selectedElectrolyzer: null,
  searchTerm: "",
  selectedElements: [],
  comments: {},
  selectedItems: [],
};

const reducer = (state: PageState, action: Partial<PageState>): PageState => ({
  ...state,
  ...action,
});

const Page: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedElectrolyzer, searchTerm, selectedElements, comments, selectedItems } = state;

  const [elements, setElements] = useState<ElementProp[]>([
    { position: 1, id: "TC080", status: "normal", comment: "", checklist: [] },
    { position: 2, id: "1869", status: "normal", comment: "", checklist: [] },
    { position: 3, id: "BR307", status: "normal", comment: "", checklist: [] },
    { position: 4, id: "2765", status: "normal", comment: "", checklist: [] },
    { position: 5, id: "BR-165", status: "normal", comment: "", checklist: [] },
    { position: 6, id: "1716", status: "normal", comment: "", checklist: [] },
    { position: 7, id: "2013", status: "normal", comment: "", checklist: [] },
    { position: 8, id: "2015", status: "normal", comment: "", checklist: [] },
    { position: 9, id: "2329", status: "normal", comment: "", checklist: [] },
    { position: 10, id: "2341", status: "normal", comment: "", checklist: [] },
    { position: 11, id: "1863", status: "normal", comment: "", checklist: [] },
    { position: 12, id: "BR-201", status: "normal", comment: "", checklist: [] },
    { position: 13, id: "TA-134", status: "normal", comment: "", checklist: [] },
  ]);

  const handleSelectElement = (element: ElementProp) => {
    dispatch({
      selectedElements: selectedElements.some((el) => el.id === element.id)
        ? selectedElements.filter((el) => el.id !== element.id) // Uncheck: Remove from selectedElements
        : [...selectedElements, element], // Check: Add to selectedElements
    });
  };


  const handleSelectAll = (checked: boolean) => {
    dispatch({
      selectedElements: checked ? [...element_ids] : [],
    });
  };

  const handleCommentChange = (id: string, value: string) => {
    dispatch({
      comments: { ...comments, [id]: value },
    });
    const ids = selectedElements.map((i) => i.id)
    setElements(elements.map((data) => {
      if (ids.includes(data.id)) {
        return {
          ...data,
          comment: value
        }
      } else {
        return data
      }
    }))
  };

  const toggleItems = (item: string) => {
    dispatch({
      selectedItems: selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item) // Remove item if it exists
        : [...selectedItems, item], // Add item if it doesn't exist
    });
  };

  const clearSelection = () => {
    dispatch({
      selectedItems: [],
    });
  }

  const handleRepair = () => {
    const ids = selectedElements.map((i) => i.id)
    setElements(elements.map((data) => {
      if (ids.includes(data.id)) {
        return {
          ...data,
          status: "repair",
          checklist: [...selectedItems]
        }
      } else {
        return data
      }
    }))
    dispatch({
      selectedElements: [],
      selectedItems: [],
    });
  };

  const handleAssemble = () => {
    const ids = selectedElements.map((i) => i.id)
    setElements(elements.map((data) => {
      if (ids.includes(data.id)) {
        return {
          ...data,
          status: "assemble",
          checklist: [...selectedItems]
        }
      } else {
        return data
      }
    }))
    dispatch({
      selectedElements: [],
    });
  };

  const handleRestartAction = () => {
    dispatch(initialState)
    setElements(element_ids)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* First Navbar */}
      <Navbar
        title="Tephram Assent Management Solution"
        subLabels={["Diso Cell", "Renewal Group"]}
        badge="JD"
      />

      <br />

      {/* Second Navbar */}
      <Navbar
        title="Disassembly Electrolyzer"
      />

      <div className="flex flex-1">
        {/* Left Sidebar - Electrolyzer List */}
        <ElectrolyzerList
          electrolyzers={electrolyzer_ids}
          selectedElectrolyzer={selectedElectrolyzer}
          searchTerm={searchTerm}
          onSearch={(value) => dispatch({ searchTerm: value })}
          onSelect={(id) => dispatch({ selectedElectrolyzer: id })}
        />

        {/* Right Section */}
        <div className="flex-1 p-4">
          {selectedElectrolyzer ? (
            <ElementTableSection
              selectedElectrolyzer={selectedElectrolyzer}
              elements={elements}
              selectedElements={state.selectedElements}
              onSelectElement={handleSelectElement}
              onSelectAll={handleSelectAll}
              comments={comments}
              onCommentChange={handleCommentChange}
              checklistItems={checklist_items}
              selectedItems={selectedItems}
              toggleItems={toggleItems}
              clearSelectedItems={clearSelection}
              onRepair={handleRepair}
              onAssemble={handleAssemble}
              onRestart={handleRestartAction}
            />
          ) : (
            <div className="bg-gray-200 p-4 text-center text-gray-600">
              Select an Electrolyzer ID and then select one or more element part
              IDs to start disassembly
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;