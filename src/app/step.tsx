
'use client'
import { useState } from "react";
import { STEP_DATA } from "./stepdata";
import './step.css'


export default function Step() {

    let [stepIndex, setStepIndex] = useState(0);
    let current_step_data = STEP_DATA.get(stepIndex)!;

    return (
        <div className="min-w-full items-center justify-between">
            <div className="items-center mb-8 text-4xl text-center">{current_step_data.title}</div>
            <div className="mt-12 grid lg:grid-cols-4 md:grid-cols-2 lg:gap-10 md:gap-8 gap-6 text-xl max-w-full justify-items-center">
                {current_step_data.items.map((element, idx) => {
                    return <div className="max-w-64" key={element.title}>
                        <div className="form-group">
                            <input className="clear-none" onClick={() => setStepIndex(element.nextStep)} id={idx.toString()} type="checkbox" />
                            <label className="clear-none float-right ml-2 select-none" htmlFor={idx.toString()}>
                                {element.title}
                            </label>
                        </div>
                    </div>;
                })}
            </div>
        </div>
    )
}