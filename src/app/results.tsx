"use client";
import { useState } from "react";
import { STEP_RESULTS } from "./stepDataConstants";
import { SelectedStep, VisibleStepsFilter } from "./stepFunctions";

interface IResultsProps {
  history: SelectedStep[];
}

export function Results(props: IResultsProps) {
  const [results, setResults] = useState(
    STEP_RESULTS.filter(VisibleStepsFilter(props.history))
  );

  return (
    <div>
      <div className="text-xl text-lime-600 font-semibold px-4">
        Komentarze główne (pole &quot;Wyniki badania&quot;)
      </div>
      <div className="border-solid border-2 border-lime-700 bg-lime-200 px-4">
        {results.map(
          (element) =>
            element.comments && (
              <div
                className="my-4"
                key={element.comments}
                dangerouslySetInnerHTML={{ __html: element.comments }}
              ></div>
            )
        )}
      </div>
      {results.filter((e) => e.mycology !== undefined).length > 0 && (
        <>
          <div className="text-xl text-amber-800 mt-2 font-semibold px-4">
            Mykologia
          </div>
          <div className="border-solid border-2 border-amber-700 bg-orange-200 px-4">
            {results.map(
              (element) =>
                element.mycology && (
                  <div
                    className="my-4"
                    key={element.mycology}
                    dangerouslySetInnerHTML={{ __html: element.mycology }}
                  ></div>
                )
            )}
          </div>
        </>
      )}

      {results.filter((e) => e.variant !== undefined).length > 0 && (
        <>
          <div className="text-xl text-sky-800 px-4">Szczep</div>
          <div>OK</div>
        </>
      )}

      {results.filter((e) => e.recommendations !== undefined).length > 0 && (
        <>
          <div className="text-xl text-red-600 px-4">Zalecenia</div>
          <div>OK</div>
        </>
      )}
    </div>
  );
}
