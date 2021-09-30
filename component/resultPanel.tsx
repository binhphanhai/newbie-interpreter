import React, { useState } from "react";
import { interprete } from "../helper/interpreteUtils";

interface ResultPanelProps {
  code: string;
}

const ResultPanel: React.FC<ResultPanelProps> = (props) => {
  const { code } = props;
  const [result, setResult] = useState<string[]>(["Result"]);

  const handleInterprete = () => {
    const result = interprete(code);
    setResult(result);
  };
  return (
    <div>
      <div className="button-container">
        <span className="button title" onClick={handleInterprete}>
          Interprete
        </span>
      </div>
      <div className="result-zone">
        {result.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
    </div>
  );
};

export default ResultPanel;
