"use client";

import { SelectedStep, StepData, StepItem, StepType } from "./stepdata";

interface IStepItemProps {
  data: StepItem;
  currentStepData: StepData;
  currentSelectedStep: SelectedStep;
  setCurrentSelectedStep: (newSelectedStep: SelectedStep) => void;
  idx: number;
}

export default function StepItem(props: IStepItemProps) {
  return (
    <div className="max-w-64" key={props.data.title}>
      <div className="form-group">
        <input
          name={props.currentStepData.title}
          className="clear-none"
          onChange={(event) => {
            if (props.currentStepData.type == StepType.Radio) {
              props.setCurrentSelectedStep(
                props.currentSelectedStep.fromThis([props.data])
              );
              return;
            }
            if (event.target.checked) {
              props.setCurrentSelectedStep(
                props.currentSelectedStep.fromThis([
                  ...props.currentSelectedStep.items,
                  props.data,
                ])
              );
              return;
            }
            props.setCurrentSelectedStep(
              props.currentSelectedStep.fromThis(
                props.currentSelectedStep.items.filter(
                  (item) => item != props.data
                )
              )
            );
          }}
          id={props.idx.toString()}
          type={
            props.currentStepData.type == StepType.Checkbox
              ? "checkbox"
              : "radio"
          }
        />
        <label
          className="clear-none float-right ml-2 select-none"
          htmlFor={props.idx.toString()}
          style={props.data.style}
        >
          {props.data.title}
        </label>
      </div>
    </div>
  );
}
