export enum StepType {
  Checkbox,
  Radio,
}

export interface StepData {
  title: string;
  type: StepType;
  displayIf?: StepDisplayCondition[];
  hideIf?: StepDisplayCondition[];
  items: StepItem[];
  comment?: string;
  isFinal: boolean;
}

export interface IStepDisplayCondition {
  index: number;
  values: string[];
  onlyOption: boolean;

  fits(steps: SelectedStep[]): boolean;
}

export class StepDisplayCondition implements IStepDisplayCondition {
  index: number = -1;
  values: string[] = [];
  onlyOption: boolean = false;
  constructor(index: number, value: string, onlyOption: boolean = false) {
    this.index = index;
    this.values = [value];
    this.onlyOption = onlyOption;
  }

  fits(steps: SelectedStep[]): boolean {
    let result = false;
    steps.forEach((step) => {
      if (
        step.index == this.index &&
        step.items.filter((x) => x.title == this.values[0]).length > 0 &&
        (this.onlyOption ? step.items.length == 1 : true)
      ) {
        result = true;
      }
    });
    return result;
  }
}

export class OrStepDisplayCondition implements IStepDisplayCondition {
  index: number = -1;
  values: string[] = [];
  onlyOption: boolean = false;

  constructor(index: number, values: string[], onlyOption: boolean = false) {
    this.index = index;
    this.values = values;
    this.onlyOption = onlyOption;
  }

  fits(steps: SelectedStep[]): boolean {
    let result = false;
    steps.forEach((step) => {
      if (
        step.index == this.index &&
        step.items.filter((x) => this.values.indexOf(x.title) !== -1).length >
          0 &&
        (this.onlyOption ? step.items.length == 1 : true)
      ) {
        result = true;
      }
    });
    return result;
  }
}

export class AndStepDisplayCondition implements IStepDisplayCondition {
  index: number = -1;
  values: string[] = [];
  onlyOption: boolean = false;

  constructor(index: number, values: string[], onlyOption: boolean = false) {
    this.index = index;
    this.values = values;
    this.onlyOption = onlyOption;
  }

  fits(steps: SelectedStep[]): boolean {
    let result = false;
    steps.forEach((step) => {
      if (
        step.index == this.index &&
        step.items.filter((x) => this.values.indexOf(x.title) !== -1).length ===
          this.values.length &&
        (this.onlyOption ? step.items.length == 1 : true)
      ) {
        result = true;
      }
    });
    return result;
  }
}

export interface StepItem {
  title: string;
  displayIf?: StepDisplayCondition[];
  hideIf?: StepDisplayCondition[];
  style?: Object;
  isFinal?: boolean;
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
  history: SelectedStep[],
  conditions: StepDisplayCondition[]
) {
  let result = true;
  conditions.forEach((condition) => {
    if (!condition.fits(history)) {
      result = false;
    }
  });
  return result;
}

// Returns undefined if given step was a final one
export function NextStepIndex(
  STEP_DATA: Map<number, StepData>,
  history: Array<SelectedStep>,
  stepIndex: number
) {
  if (STEP_DATA.get(stepIndex)?.isFinal) {
    return undefined;
  }

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
  return nextStep === undefined ? undefined : nextStepIndex;
}

export function VisibleStepsFilter(history: SelectedStep[]) {
  return (step: StepItem | StepResults) =>
    (step.displayIf === undefined ||
      StepDisplayConditionsMet(history, step.displayIf)) &&
    (step.hideIf === undefined ||
      !StepDisplayConditionsMet(history, step.hideIf));
}

export interface StepResults {
  comments?: string;
  mycology?: string;
  variant?: string;
  recommendations?: string;
  displayIf?: IStepDisplayCondition[];
  hideIf?: IStepDisplayCondition[];
}
