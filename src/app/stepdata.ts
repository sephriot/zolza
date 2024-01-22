export enum StepType {
  Checkbox,
  Radio,
}

export interface StepData {
  title: string;
  type: StepType;
  displayIf?: StepDisplayCondition[];
  hideIf?: StepDisplayCondition[];
  items: Array<StepItem>;
  comment?: string;
}

export interface StepDisplayCondition {
  index: number;
  value: string;
  onlyOption: boolean;
}

export interface StepItem {
  title: string;
  displayIf?: StepDisplayCondition[];
  hideIf?: StepDisplayCondition[];
  style?: Object;
}

export class SelectedStep {
  title: string = "";
  index: number = 0;
  items: Array<StepItem> = [];
  constructor(title: string, index: number, items: Array<StepItem> = []) {
    this.title = title;
    this.index = index;
    this.items = items;
  }

  fromThis(items: Array<StepItem>) {
    return new SelectedStep(this.title, this.index, items);
  }
}

export function StepDisplayConditionsMet(
  history: Array<SelectedStep>,
  conditions: StepDisplayCondition[]
) {
  let result = true;
  conditions.forEach((condition) => {
    if (
      history.filter((x) => {
        return (
          x.index == condition.index &&
          x.items.filter((y) => y.title == condition.value).length > 0 &&
          (condition.onlyOption ? x.items.length == 1 : true)
        );
      }).length === 0
    ) {
      result = false;
    }
  });
  return result;
}

export function NextStepIndex(history: Array<SelectedStep>, stepIndex: number) {
  let nextStepIndex = stepIndex + 1;
  let nextStep = STEP_DATA.get(nextStepIndex);
  while (
    nextStep !== undefined &&
    ((nextStep?.displayIf !== undefined &&
      !StepDisplayConditionsMet(history, nextStep.displayIf)) ||
      (nextStep?.hideIf !== undefined &&
        StepDisplayConditionsMet(history, nextStep.hideIf)))
  ) {
    nextStepIndex++;
    nextStep = STEP_DATA.get(nextStepIndex);
  }
  return nextStep === undefined ? FINAL_STEP_VALUE : nextStepIndex;
}

export function VisibleStepsFilter(history: Array<SelectedStep>) {
  return (step: StepItem) =>
    (step.displayIf === undefined ||
      StepDisplayConditionsMet(history, step.displayIf)) &&
    (step.hideIf === undefined ||
      !StepDisplayConditionsMet(history, step.hideIf));
}

export const FINAL_STEP_VALUE = 1000000;

const DISPLAY_IF_SSAK = [
  { index: 2, value: "Ssaki", onlyOption: false },
] as StepDisplayCondition[];

export const STEP_DATA: Map<number, StepData> = new Map([
  [
    0,
    {
      title: "Wybierz rodzaj posiewu",
      type: StepType.Checkbox,
      items: [
        { title: "Tlenowy" },
        { title: "Beztlenowy" },
        { title: "Enteropatogeny" },
        { title: "Drożdżaki" },
      ],
    },
  ],
  [
    1,
    {
      title: "Wybierz materiał / miejsce pobrania",
      type: StepType.Radio,

      items: [
        { title: "Skóra" },
        { title: "Mocz" },
        { title: "Oko / Ucho" },
        {
          title: "Kał / prostnica",
          hideIf: [
            { index: 0, value: "Tlenowy", onlyOption: false },
          ] as StepDisplayCondition[],
        },
        {
          title: "Płyny / pochwa / napletek / mleko",
        },
      ],
    },
  ],
  [
    2,
    {
      title: "Wybierz grupę zwierząt",
      type: StepType.Radio,
      displayIf: [{ index: 1, value: "Kał / prostnica", onlyOption: false }],
      items: [{ title: "Ssaki" }, { title: "Pozostałe" }],
    },
  ],
  [
    3,
    {
      title: "Wybierz drobnoustrój",
      type: StepType.Checkbox,
      items: [
        { title: "Staphylococcus", hideIf: DISPLAY_IF_SSAK },
        { title: "Pseudomonas", hideIf: DISPLAY_IF_SSAK },
        { title: "Enterococcus", hideIf: DISPLAY_IF_SSAK },
        { title: "Enterobacterales", hideIf: DISPLAY_IF_SSAK },
        { title: "Streptococcus", hideIf: DISPLAY_IF_SSAK },
        { title: "Pasteurella", hideIf: DISPLAY_IF_SSAK },
        {
          title: "Enterococcus spp.",
          style: { color: "#22d466" },
          displayIf: DISPLAY_IF_SSAK,
        },
        {
          title: "Escherichia coli",
          displayIf: DISPLAY_IF_SSAK,
        },
        {
          title: "Proteus",
          displayIf: DISPLAY_IF_SSAK,
        },
        {
          title: "Enterobacter",
          displayIf: DISPLAY_IF_SSAK,
        },
        {
          title: "Klebsiella spp.",
          displayIf: DISPLAY_IF_SSAK,
        },
        {
          title: "Pseudomonas",
          displayIf: DISPLAY_IF_SSAK,
        },
        {
          title: "Pozostałe",
          displayIf: DISPLAY_IF_SSAK,
        },
      ],
    },
  ],
  [
    4,
    {
      title: "Eschericha coli:",
      type: StepType.Checkbox,
      displayIf: [
        { index: 3, onlyOption: true, value: "Escherichia coli" },
      ] as StepDisplayCondition[],
      items: [
        {
          title: "Hemolizuje - (β - hem)",
        },
        {
          title: "Wytwarza toksynę Shiga",
        },
        {
          title:
            "Posiada markery patogenności wykryte metodą PCR (EPEC, ETEC, EHEC, EIEC, EAEC)",
        },
        {
          title: "Żadne z powyższych",
        },
      ],
    },
  ],
  [
    5,
    {
      title:
        "Czy bakteria / któraś z bakterii jest odporna na większość antybiotyków",
      type: StepType.Radio,

      items: [{ title: "Tak" }, { title: "Nie" }],
    },
  ],
  [
    6,
    {
      title: "Czy Klebsiella występuje jako monokultura?",
      type: StepType.Radio,

      items: [{ title: "Tak" }, { title: "Nie" }],
    },
  ],
  [
    7,
    {
      title: "Czy od daty posiewu minęły 72 godziny?",
      type: StepType.Radio,

      items: [
        { title: "Tak" },
        {
          title: "Nie (odłóż protokół do segregatora)",
        },
      ],
    },
  ],
  [
    8,
    {
      title: "Wynik posiewu",
      type: StepType.Checkbox,

      items: [{ title: "Ujemny" }, { title: "Clostridium" }, { title: "Inne" }],
    },
  ],
]);

export interface StepResults {
  comments: string;
  variant?: string;
  recommendations?: string;
  displayIf?: StepDisplayCondition[];
}

export const STEP_RESULTS: StepResults[] = [
  {},
  {
    comments: `AUTOSZCZEPIONKA: w przypadku wyhodowania szczepu wielolekopornego lub gdy zakażenie bakteryjne jest przewlekłe/nawracające, a czynnikiem etiologicznym we wcześniej uzyskanych wynikach badań jest ten sam drobnoustrój, istnieje możliwość wykonania autoszczepionki. Wyhodowany w laboratorium szczep będzie przechowywany przez 48h w oczekiwaniu na decyzję prowadzącego lekarza weterynarii.

    W przypadku znacznej oporności oznaczonej metodą krążkowo-dyfuzyjną zalecane jest oznaczenie wrażliwości szczepów bakteryjnych metodą rozcieńczeń MIC (minimalne stężenie hamujące).
    `,
    displayIf: [
      {
        index: 0,
        value: "Tlenowy",
        onlyOption: false,
      },
    ] as StepDisplayCondition[],
  },
  {
    comments:
      "W przypadku znacznej oporności oznaczonej metodą krążkowo-dyfuzyjną zalecane jest oznaczenie wrażliwości szczepów bakteryjnych metodą rozcieńczeń MIC (minimalne stężenie hamujące).",
    displayIf: [
      {
        index: 5,
        value: "Tak",
        onlyOption: false,
      },
    ] as StepDisplayCondition[],
  },
];
