import React, { useState } from "react";

interface ResultPanelProps {
  code: string;
}

const ResultPanel: React.FC<ResultPanelProps> = (props) => {
  const [result, setResult] = useState("Result");
  return (
    <div>
      <div className="button-container">
        <span className="button title">Interprete</span>
      </div>
      <div className="result-zone">{result}</div>
    </div>
  );
};

export default ResultPanel;
