"use client";
import { SelectedStep, StepData, VisibleStepsFilter } from "./stepFunctions";

import "./step.css";
import StepItem from "./stepItem";

interface IStepProps {
  currentStepData: StepData;
  currentSelectedStep: SelectedStep;
  setCurrentSelectedStep: (newSelectedStep: SelectedStep) => void;
  stepsHistory: Array<SelectedStep>;
  nextStep: () => void;
}

export function Step(props: IStepProps) {
  return (
    <div className="min-w-full items-center justify-between">
      <div className="items-center mb-8 text-4xl text-center">
        {props.currentStepData.title}
      </div>
      <div className="mt-12 grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-8 gap-6 text-xl max-w-full justify-items-center">
        {props.currentStepData.items
          .filter(VisibleStepsFilter(props.stepsHistory))
          .map((element, idx) => (
            <StepItem
              key={element.title + idx}
              currentSelectedStep={props.currentSelectedStep}
              data={element}
              currentStepData={props.currentStepData}
              setCurrentSelectedStep={props.setCurrentSelectedStep}
              idx={idx}
            />
          ))}
      </div>
      <div className="flex justify-around mt-8">
        <button
          className={
            "rounded-full px-2 mx-2 py-1 text-xl" +
            (props.currentSelectedStep.items.length > 0
              ? " bg-gray-400 cursor-default"
              : " bg-gray-400 cursor-default")
          }
          onClick={() => {
            // TODO
          }}
        >
          Wstecz
        </button>
        <button
          className={
            "rounded-full px-2 py-1 text-xl" +
            (props.currentSelectedStep.items.length > 0
              ? " bg-sky-400 cursor-pointer"
              : " bg-gray-400 cursor-default")
          }
          onClick={() => props.nextStep()}
        >
          Dalej
        </button>
      </div>
    </div>
  );
}
