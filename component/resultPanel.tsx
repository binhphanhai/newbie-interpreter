import React, { useState } from "react";
import axios from "axios";

interface ResultPanelProps {
  code: string;
}

const ResultPanel: React.FC<ResultPanelProps> = (props) => {
  const { code } = props;
  const [result, setResult] = useState<string[]>(["Result"]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleInterprete = () => {
    setIsErrored(false);
    if (code === "") {
      setResult(["Please input code"]);
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/interprete", { code: code })
      .then((res) => {
        setResult(res.data.result);
      })
      .catch((err) => {
        setIsErrored(true);
        const errMessage = err.response?.data.message || "Something went wrong";
        setResult([errMessage]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setResult(result);
  };
  return (
    <div>
      <div className="button-container">
        <span className="button title" onClick={handleInterprete}>
          Interprete
        </span>
      </div>
      <div className={`result-zone ${isErrored ? "is-error" : ""}`}>
        {isLoading
          ? "...Interpreting..."
          : result.map((value, index) => <div key={index}>{value}</div>)}
      </div>
    </div>
  );
};

export default ResultPanel;
