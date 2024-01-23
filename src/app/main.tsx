"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NextStepIndex, SelectedStep } from "./stepFunctions";
import "./step.css";
import { STEP_DATA } from "./stepDataConstants";
import { Results } from "./results";
import { Step } from "./step";

export default function Main() {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStepData = useMemo(() => STEP_DATA.get(stepIndex)!, [stepIndex]);

  const [currentSelectedStep, setCurrentSelectedStep] = useState<SelectedStep>(
    new SelectedStep(currentStepData.title, stepIndex)
  );
  const [stepsHistory, setStepsHistory] = useState<Array<SelectedStep>>([]);
  const [displayResults, setDisplayResults] = useState(false);

  const previousStep = useCallback(() => {
    if (stepsHistory.length === 0) {
      return;
    }
    const lastStep = stepsHistory.pop()!;
    setStepsHistory(stepsHistory);
    setStepIndex(lastStep.index);
    const newCurrentSelectedStep = new SelectedStep(
      STEP_DATA.get(lastStep.index)!.title,
      lastStep.index
    );
    setCurrentSelectedStep(newCurrentSelectedStep);
  }, [stepsHistory]);

  const nextStep = useCallback(() => {
    if (currentSelectedStep.items.length == 0) {
      return;
    }
    if (currentSelectedStep.items.filter((e) => e.isFinal).length > 0) {
      setStepIndex(0);
      setStepsHistory([]);
      setCurrentSelectedStep(new SelectedStep(STEP_DATA.get(0)!.title, 0));
      return;
    }

    const nextStepHistory = [...stepsHistory, currentSelectedStep];
    setStepsHistory(nextStepHistory);
    const nextStepIndex = NextStepIndex(STEP_DATA, nextStepHistory, stepIndex);
    if (nextStepIndex === undefined) {
      setDisplayResults(true);
      return;
    }

    setStepIndex(nextStepIndex);
    const newCurrentSelectedStep = new SelectedStep(
      STEP_DATA.get(nextStepIndex)!.title,
      nextStepIndex
    );
    setCurrentSelectedStep(newCurrentSelectedStep);
  }, [stepIndex, currentSelectedStep, stepsHistory]);

  return displayResults ? (
    <Results history={stepsHistory} />
  ) : (
    <div className="flex flex-col min-w-full items-center justify-between">
      {/* <div className="mb-12">
        {stepsHistory.map((x, idx) => {
          return (
            <div key={x.index}>
              {x.title} {idx !== stepsHistory.length - 1 ? " > " : ""}
            </div>
          );
        })}
      </div> */}
      <Step
        currentStepData={currentStepData}
        currentSelectedStep={currentSelectedStep}
        setCurrentSelectedStep={setCurrentSelectedStep}
        stepsHistory={stepsHistory}
        nextStep={nextStep}
        previousStep={previousStep}
      />
    </div>
  );
}
