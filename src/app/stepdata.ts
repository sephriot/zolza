export interface StepData {
    title: string,
    items: Array<StepItem>
}

export interface StepItem {
    title: string,
    nextStep: number
}


export const STEP_DATA: Map<number, StepData> = new Map([[0,
    {
        title: "Wybierz rodzaj posiewu",
        items: [
            { title: "Tlenowy", nextStep: 1 },
            { title: "Beztlenowy", nextStep: 1 },
            { title: "Enteropatogeny", nextStep: 1 },
            { title: "Drożdżaki", nextStep: 1 }
        ]
    }],
    [1, {
        title: "Wybierz materiał / miejsce pobrania",
        items: [
            { title: "Skóra", nextStep: 2 },
            { title: "Mocz", nextStep: 2 },
            { title: "Oko / Ucho", nextStep: 2 },
            { title: "Kał / prostnica", nextStep: 5 },
            { title: "Płyny / pochwa / napletek / mleko", nextStep: 2 }
        ]
    }],
    [2, {
        title: "Wybierz drobnoustrój",
        items: [
        { title: "Staphylococcus", nextStep: 4 },
        { title: "Pseudomonas", nextStep: 4 },
        { title: "Enterococcus", nextStep: 4 },
        { title: "Enterobacterales", nextStep: 4 },
        { title: "Streptococcus", nextStep: 4 },
        { title: "Pasteurella", nextStep: 4 }
        ]
    }],
    [3, {
        title: "Wybierz drobnoustrój",
        items: [
        { title: "Escherichia coli", nextStep: 4 },
        { title: "Proteus", nextStep: 4 },
        { title: "Enterobacter", nextStep: 4 },
        { title: "Klebsiella spp.", nextStep: 4 },
        { title: "Pozostałe", nextStep: 4 },
        ]
    }],
    [4,{
        title: "Czy bakteria / któraś z bakterii jest odporna na większość antybiotyków",
        items: [
        { title: "Tak", nextStep: 4 },
        { title: "Nie", nextStep: 4 },
        ]
    }],
    [5, {
        title: "Wybierz grupę zwierząt",
        items: [
        { title: "Ssaki", nextStep: 3 },
        { title: "Pozostałe", nextStep: 2 },
        ]
    }]
]);