import {
  OrStepDisplayCondition,
  StepData,
  StepDisplayCondition,
  StepItem,
  StepResults,
  StepType,
} from "./StepFunctions";

export const FINAL_STEP_VALUE = 1000000;

const DISPLAY_IF_SSAK = [new StepDisplayCondition(7, "Ssaki", false)];

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
      title: "Czy od daty posiewu minęły 72 godziny?",
      type: StepType.Radio,
      displayIf: [new StepDisplayCondition(0, "Beztlenowy", true)],
      items: [
        { title: "Tak" },
        {
          title: "Nie (odłóż protokół do segregatora)",
          isFinal: true,
        },
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    2,
    {
      title: "Wynik posiewu beztlenowego",
      type: StepType.Checkbox,
      displayIf: [new StepDisplayCondition(0, "PLACEHOLDER")],
      items: [
        { title: "Ujemny" },
        { title: "Clostridium" },
        { title: "Inne" },
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    3,
    {
      title: "Posiew w kierunku grzybów drożdżopodobnych",
      type: StepType.Radio,
      displayIf: [new StepDisplayCondition(0, "Drożdżaki")],
      items: [{ title: "W toku" }, { title: "Zakończony" }] as StepItem[],
      isFinal: false,
    },
  ],
  [
    4,
    {
      title: "Wynik posiewu w kierunku grzybów drożdżopodobnych",
      type: StepType.Checkbox,
      displayIf: [
        new StepDisplayCondition(0, "Drożdżaki"),
        new StepDisplayCondition(3, "Zakończony"),
      ],
      items: [
        { title: "Malassezia" },
        { title: "Candida" },
        { title: "Rhodotorula" },
        { title: "ujemny" },
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    5,
    {
      title: "Wybierz materiał / miejsce pobrania",
      type: StepType.Radio,
      items: [
        { title: "Skóra" },
        { title: "Mocz" },
        { title: "Oko / Ucho" },
        {
          title: "Kał / prostnica",
          hideIf: [new StepDisplayCondition(0, "Tlenowy", false)],
        },
        {
          title: "Płyny / pochwa / napletek / mleko",
        },
      ] as StepItem[],
      isFinal: false,
    },
  ],
  [
    6,
    {
      title: "Czy wykonano przednamnażanie w bulionie odżywczym?",
      type: StepType.Radio,
      displayIf: [
        new StepDisplayCondition(5, "Płyny / pochwa / napletek / mleko", false),
      ],
      items: [{ title: "Tak" }, { title: "Nie" }] as StepItem[],
      isFinal: false,
    },
  ],
  [
    7,
    {
      title: "Wybierz grupę zwierząt",
      type: StepType.Radio,
      displayIf: [new StepDisplayCondition(5, "Kał / prostnica", false)],
      items: [{ title: "Ssaki" }, { title: "Pozostałe" }] as StepItem[],
      isFinal: false,
    },
  ],
  [
    8,
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
    9,
    {
      title: "Eschericha coli:",
      type: StepType.Checkbox,
      displayIf: [new StepDisplayCondition(8, "Escherichia coli", false)],
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
    10,
    {
      title: "Czy Klebsiella występuje jako monokultura?",
      type: StepType.Radio,
      displayIf: [new StepDisplayCondition(8, "Klebsiella spp.", true)],
      items: [{ title: "Tak" }, { title: "Nie" }] as StepItem[],
      isFinal: false,
    },
  ],
  [
    11,
    {
      title:
        "Czy bakteria / któraś z bakterii jest odporna na większość antybiotyków",
      type: StepType.Radio,
      items: [{ title: "Tak" }, { title: "Nie" }],
      isFinal: true,
    },
  ],
]);

export const STEP_RESULTS: StepResults[] = [
  {
    comments:
      "<b>ENTEROCOCCUS</b>; bakterie z rodzaju Enterococcus wykazują często naturalną oporność na penicylinę, ampicylinę oraz większość cefalosporyn; wrażliwość na penicylinę oraz ampicylinę sugeruje wrażliwość na amoksycylinę z kwasem klawulanowym lub ampicylinę z sulbaktamem; wykazana w warunkach in vitro wrażliwość na cefalosporyny, klindamycynę oraz sulfametoksazol z trimetoprimem może okazać się niewystarczająca w terapii klinicznej; monoterapia z użyciem aminoglikozydów jest nieskuteczna, zaleca się terapię łączoną aminoglikozydów z penicylinami",
    displayIf: [new StepDisplayCondition(8, "Enterococcus", false)],
  },
  {
    comments:
      "<b>PSEUDOMONAS:</b> bakterie z rodzaju Pseudomonas wykazują oporność na antybiotyki beta-laktamowe, w tym penicylinę G, ampicylinę, amoksycylinę z kwasem klawulanowym, cefalosporyny I i II generacji, a także makrolidy, linkozamidy, streptograminy, tetracykliny, oksazolidony, chloramfenikol, kwas fusydowy, sulfonamidy z trimetoprimem, wankomycynę i teikoplaninę",
    displayIf: [new StepDisplayCondition(8, "Pseudomonas", false)],
  },
  {
    comments:
      "<b>ENTEROBACTERIACEAE;</b> bakterie należące do rodziny Enterobacteriaceae wykazują naturalną oporność na: klindamycynę, kwas fusydowy, glikopeptydy (wankomycyna, teikoplaniny), makrolidy (azytromycyna, erytromycyna, klarytromycyna) oraz rifampicynę; wyjątkiem jest azytromycyna wykazująca aktywność wobec szczepów wywołujących biegunkę, w tym Campylobacter spp., Salmonella spp., Shigella spp., enteropatogenne szczepy Escherichia coli",
    displayIf: [new StepDisplayCondition(8, "Enterobacter", false)],
  },
  {
    comments: `<b>(-) UJEMNY:</b> Nie stwierdzono wzrostu bakterii po 24, 48 oraz 72 godzinach, zarówno na podłożach namnażających jak i selektywnych <b>w warunkach beztlenowych</b>.

      `,
    displayIf: [
      new StepDisplayCondition(0, "Tlenowy", false),
      new StepDisplayCondition(0, "Beztlenowy", false),
    ],
  },
  {
    comments: `<b>AUTOSZCZEPIONKA:</b> w przypadku wyhodowania szczepu wielolekopornego lub gdy zakażenie bakteryjne jest przewlekłe/nawracające, a czynnikiem etiologicznym we wcześniej uzyskanych wynikach badań jest ten sam drobnoustrój, istnieje możliwość wykonania autoszczepionki. Wyhodowany w laboratorium szczep będzie przechowywany przez 48h w oczekiwaniu na decyzję prowadzącego lekarza weterynarii.
  
      W przypadku znacznej oporności oznaczonej metodą krążkowo-dyfuzyjną zalecane jest oznaczenie wrażliwości szczepów bakteryjnych metodą rozcieńczeń MIC (minimalne stężenie hamujące).
      `,
    displayIf: [new StepDisplayCondition(0, "Tlenowy", false)],
  },
  {
    comments:
      "W przypadku znacznej oporności oznaczonej metodą krążkowo-dyfuzyjną zalecane jest oznaczenie wrażliwości szczepów bakteryjnych metodą rozcieńczeń MIC (minimalne stężenie hamujące).",
    displayIf: [new StepDisplayCondition(1, "Tak", false)],
  },
  {
    comments: "Posiew wykonano z przednamnażaniem w bulionie odżywczym",
    displayIf: [new StepDisplayCondition(6, "Tak", false)],
  },
  {
    mycology:
      "Wyhodowano <b>Malassezia spp. / Candida spp. / Rhodotorula spp.</b>",
    displayIf: [
      new OrStepDisplayCondition(
        4,
        ["Malassezia", "Candida", "Rhodotorula"],
        false
      ),
    ],
  },
  {
    mycology: "Nie wyhodowano grzybów drożdżopodobnych.",
    displayIf: [new StepDisplayCondition(4, "ujemny", true)],
  },
  {
    mycology: "Rozpoczęto hodowlę, wynik za około (7 dni od daty posiewu).",
    displayIf: [new StepDisplayCondition(3, "W toku", true)],
  },
];
