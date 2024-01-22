"use client";

import { useState } from "react";
import { STEP_RESULTS } from "./StepDataConstants";
import { SelectedStep, VisibleStepsFilter } from "./StepFunctions";

interface IResultsProps {
  history: SelectedStep[];
}

export function Results(props: IResultsProps) {
  const [results, setResults] = useState(
    STEP_RESULTS.filter(VisibleStepsFilter(props.history))
  );

  return (
    <div>
      <div className="text-xl text-lime-600">
        Komentarze główne (pole &quot;Wyniki badania&quot;)
      </div>
      <div className="border-solid border-2 border-lime-700 bg-lime-200 px-4">
        {results.map((element) => (
          <div
            className="my-4"
            key={element.comments}
            dangerouslySetInnerHTML={{ __html: element.comments }}
          ></div>
        ))}
      </div>
      {results.filter((e) => e.variant !== undefined).length > 0 && (
        <>
          <div className="text-xl text-sky-800">Szczep</div>
          <div>OK</div>
        </>
      )}

      {results.filter((e) => e.recommendations !== undefined).length > 0 && (
        <>
          <div className="text-xl text-red-600">Zalecenia</div>
          <div>OK</div>
        </>
      )}
    </div>
  );
}
