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

export function VisibleStepsFilter(history: Array<SelectedStep>) {
  return (step: StepItem | StepResults) =>
    (step.displayIf === undefined ||
      StepDisplayConditionsMet(history, step.displayIf)) &&
    (step.hideIf === undefined ||
      !StepDisplayConditionsMet(history, step.hideIf));
}

export interface StepResults {
  comments: string;
  variant?: string;
  recommendations?: string;
  displayIf?: StepDisplayCondition[];
  hideIf?: StepDisplayCondition[];
}
