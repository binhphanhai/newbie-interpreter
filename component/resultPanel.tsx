import React, { useState } from "react";
import { interpret } from "../helper/interpretUtils";

interface ResultPanelProps {
  code: string;
}

const ResultPanel: React.FC<ResultPanelProps> = (props) => {
  const { code } = props;
  const [result, setResult] = useState<string[]>(["Result"]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleInterpret = () => {
    setIsErrored(false);
    if (code === "") {
      setResult(["Please input code"]);
      return;
    }
    setIsLoading(true);

    try {
      const { tree, result: interpretResult } = interpret(code);
      console.log(tree);
      setResult(interpretResult || []);
      setIsErrored(false);
    } catch (err: any) {
      setIsErrored(true);
      const errMessage = err.message || "Something went wrong";
      setResult([errMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="button-container">
        <span className="button title" onClick={handleInterpret}>
          Phiên dịch
        </span>
      </div>
      <div className={`result-zone ${isErrored ? "is-error" : ""}`}>
        {isLoading
          ? "...Interpreting..."
          : result.map((value, index) => <div key={index}>{value}</div>)}
      </div>
    </>
  );
};

export default ResultPanel;
