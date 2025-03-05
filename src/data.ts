export const electrolyzer_ids = [6310, 6345, 6350, 6388, 6392];

export interface ElementProp {
    position: number;
    id: string;
    status: string;
    comment: string;
    checklist: string[];
}

export const element_ids: ElementProp[] = [
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
];

export const checklist_items = [
    "Anolyte Leaker",
    "Catholyte Leaker",
    "1-1.5\" Nozzle",
    "2\" Nozzle",
    "4\" Nozzle",
    "8\" Nozzle",
    "Cathode screens",
    "Cathode perimeter screens",
    "Gasket surface",
    "Dye-Check Coupling",
    "Outside Steel",
    "Hydrogen Chamber",
    "Hydrogen Box",
    "Hydrogen Channel",
    "Anode Studs / Alignmnet",
];