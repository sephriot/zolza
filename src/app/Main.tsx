"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NextStepIndex, SelectedStep } from "./StepFunctions";
import "./step.css";
import { STEP_DATA } from "./StepDataConstants";
import { Results } from "./Results";
import { Step } from "./Step";

export default function Main() {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStepData = useMemo(() => STEP_DATA.get(stepIndex)!, [stepIndex]);

  const [currentSelectedStep, setCurrentSelectedStep] = useState<SelectedStep>(
    new SelectedStep(currentStepData.title, stepIndex)
  );
  const [stepsHistory, setStepsHistory] = useState<Array<SelectedStep>>([]);
  const [displayResults, setDisplayResults] = useState(false);

  const nextStep = useCallback(() => {
    if (currentSelectedStep.items.length == 0) {
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

  useEffect(() => {
    console.log(
      "Potential next step",
      NextStepIndex(
        STEP_DATA,
        [...stepsHistory, currentSelectedStep],
        stepIndex
      )
    );
  }, [stepsHistory, stepIndex, currentSelectedStep]);

  return displayResults ? (
    <Results history={stepsHistory} />
  ) : (
    <Step
      currentStepData={currentStepData}
      currentSelectedStep={currentSelectedStep}
      setCurrentSelectedStep={setCurrentSelectedStep}
      stepsHistory={stepsHistory}
      nextStep={nextStep}
    />
  );
}
