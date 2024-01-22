"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  NextStepIndex,
  STEP_DATA,
  SelectedStep,
  StepType,
  VisibleStepsFilter,
} from "./stepdata";
import "./step.css";
import StepItem from "./stepItem";

export default function Step() {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStepData = useMemo(() => STEP_DATA.get(stepIndex)!, [stepIndex]);

  const [currentSelectedStep, setCurrentSelectedStep] = useState<SelectedStep>(
    new SelectedStep(currentStepData.title, stepIndex)
  );
  const [stepsHistory, setStepsHistory] = useState<Array<SelectedStep>>([]);

  const nextStep = useCallback(() => {
    if (currentSelectedStep.items.length == 0) {
      return;
    }
    const nextStepHistory = [...stepsHistory, currentSelectedStep];
    setStepsHistory(nextStepHistory);
    const nextStepIndex = NextStepIndex(nextStepHistory, stepIndex);
    setStepIndex(nextStepIndex);
    if (STEP_DATA.get(nextStepIndex) === undefined) {
      return;
    }
    const newCurrentSelectedStep = new SelectedStep(
      STEP_DATA.get(nextStepIndex)!.title,
      nextStepIndex
    );
    setCurrentSelectedStep(newCurrentSelectedStep);
  }, [stepIndex, currentSelectedStep, stepsHistory]);

  useEffect(() => {
    console.log(
      "Potential next step",
      NextStepIndex([...stepsHistory, currentSelectedStep], stepIndex)
    );
  }, [stepsHistory, stepIndex, currentSelectedStep]);

  return (
    <div className="min-w-full items-center justify-between">
      <div className="items-center mb-8 text-4xl text-center">
        {currentStepData.title}
      </div>
      <div className="mt-12 grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-8 gap-6 text-xl max-w-full justify-items-center">
        {currentStepData.items
          .filter(VisibleStepsFilter(stepsHistory))
          .map((element, idx) => (
            <StepItem
              key={element.title + idx}
              currentSelectedStep={currentSelectedStep}
              data={element}
              currentStepData={currentStepData}
              setCurrentSelectedStep={setCurrentSelectedStep}
              idx={idx}
            />
          ))}
      </div>
      <div className="flex justify-around mt-8">
        <button
          className={
            "rounded-full px-2 mx-2 py-1 text-xl" +
            (currentSelectedStep.items.length > 0
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
            (currentSelectedStep.items.length > 0
              ? " bg-sky-400 cursor-pointer"
              : " bg-gray-400 cursor-default")
          }
          onClick={() => nextStep()}
        >
          Dalej
        </button>
      </div>
    </div>
  );
}
