import {
  StepData,
  StepDisplayCondition,
  StepItem,
  StepResults,
  StepType,
} from "./StepFunctions";

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
      ] as StepItem[],
      isFinal: false,
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
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    2,
    {
      title: "Czy wykonano przednamnażanie w bulionie odżywczym?",
      type: StepType.Radio,
      displayIf: [
        {
          index: 1,
          value: "Płyny / pochwa / napletek / mleko",
          onlyOption: false,
        },
      ],
      items: [{ title: "Tak" }, { title: "Nie" }] as StepItem[],
      isFinal: false,
    },
  ],
  [
    3,
    {
      title: "Wybierz grupę zwierząt",
      type: StepType.Radio,
      displayIf: [{ index: 1, value: "Kał / prostnica", onlyOption: false }],
      items: [{ title: "Ssaki" }, { title: "Pozostałe" }] as StepItem[],
      isFinal: false,
    },
  ],
  [
    4,
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
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    5,
    {
      title: "Eschericha coli:",
      type: StepType.Checkbox,
      displayIf: [
        { index: 4, onlyOption: true, value: "Escherichia coli" },
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
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    6,
    {
      title:
        "Czy bakteria / któraś z bakterii jest odporna na większość antybiotyków",
      type: StepType.Radio,
      items: [{ title: "Tak" }, { title: "Nie" }],
      isFinal: true,
    },
  ],
  [
    7,
    {
      title: "Czy Klebsiella występuje jako monokultura?",
      type: StepType.Radio,
      items: [{ title: "Tak" }, { title: "Nie" }] as StepItem[],
      isFinal: false,
    },
  ],
  [
    8,
    {
      title: "Czy od daty posiewu minęły 72 godziny?",
      type: StepType.Radio,
      items: [
        { title: "Tak" },
        {
          title: "Nie (odłóż protokół do segregatora)",
        },
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    9,
    {
      title: "Wynik posiewu",
      type: StepType.Checkbox,
      items: [
        { title: "Ujemny" },
        { title: "Clostridium" },
        { title: "Inne" },
      ] as StepItem[],
      isFinal: false,
    },
  ],
]);

export const STEP_RESULTS: StepResults[] = [
  {
    comments:
      "<b>ENTEROCOCCUS</b>; bakterie z rodzaju Enterococcus wykazują często naturalną oporność na penicylinę, ampicylinę oraz większość cefalosporyn; wrażliwość na penicylinę oraz ampicylinę sugeruje wrażliwość na amoksycylinę z kwasem klawulanowym lub ampicylinę z sulbaktamem; wykazana w warunkach in vitro wrażliwość na cefalosporyny, klindamycynę oraz sulfametoksazol z trimetoprimem może okazać się niewystarczająca w terapii klinicznej; monoterapia z użyciem aminoglikozydów jest nieskuteczna, zaleca się terapię łączoną aminoglikozydów z penicylinami",
    displayIf: [
      {
        index: 4,
        value: "Enterococcus",
        onlyOption: false,
      },
    ] as StepDisplayCondition[],
  },
  {
    comments:
      "<b>PSEUDOMONAS:</b> bakterie z rodzaju Pseudomonas wykazują oporność na antybiotyki beta-laktamowe, w tym penicylinę G, ampicylinę, amoksycylinę z kwasem klawulanowym, cefalosporyny I i II generacji, a także makrolidy, linkozamidy, streptograminy, tetracykliny, oksazolidony, chloramfenikol, kwas fusydowy, sulfonamidy z trimetoprimem, wankomycynę i teikoplaninę",
    displayIf: [
      {
        index: 4,
        value: "Pseudomonas",
        onlyOption: false,
      },
    ] as StepDisplayCondition[],
  },
  {
    comments:
      "<b>ENTEROBACTERIACEAE;</b> bakterie należące do rodziny Enterobacteriaceae wykazują naturalną oporność na: klindamycynę, kwas fusydowy, glikopeptydy (wankomycyna, teikoplaniny), makrolidy (azytromycyna, erytromycyna, klarytromycyna) oraz rifampicynę; wyjątkiem jest azytromycyna wykazująca aktywność wobec szczepów wywołujących biegunkę, w tym Campylobacter spp., Salmonella spp., Shigella spp., enteropatogenne szczepy Escherichia coli",
    displayIf: [
      {
        index: 4,
        value: "Enterobacterales",
        onlyOption: false,
      },
    ] as StepDisplayCondition[],
  },
  {
    comments: `<b>AUTOSZCZEPIONKA:</b> w przypadku wyhodowania szczepu wielolekopornego lub gdy zakażenie bakteryjne jest przewlekłe/nawracające, a czynnikiem etiologicznym we wcześniej uzyskanych wynikach badań jest ten sam drobnoustrój, istnieje możliwość wykonania autoszczepionki. Wyhodowany w laboratorium szczep będzie przechowywany przez 48h w oczekiwaniu na decyzję prowadzącego lekarza weterynarii.
  
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
        index: 6,
        value: "Tak",
        onlyOption: false,
      },
    ] as StepDisplayCondition[],
  },
  {
    comments: "Posiew wykonano z przednamnażaniem w bulionie odżywczym",
    displayIf: [
      {
        index: 2,
        value: "Tak",
        onlyOption: false,
      },
    ] as StepDisplayCondition[],
  },
];
