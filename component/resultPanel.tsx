import React, { useState } from "react";
import { interpret } from "../helper/interpretUtils";

interface ResultPanelProps {
  code: string;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ code }) => {
  const [result, setResult] = useState<string[]>([
    "Nhấn 'Phiên dịch' để chạy code",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleInterpret = async () => {
    setIsErrored(false);

    if (code.trim() === "") {
      setResult(["Vui lòng nhập code để thực thi"]);
      setIsErrored(true);
      return;
    }

    setIsLoading(true);

    try {
      // Add small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 100));

      const { tree, result: interpretResult } = interpret(code);
      setResult(
        interpretResult && interpretResult.length > 0
          ? interpretResult
          : ["Thực thi thành công"]
      );
      setIsErrored(false);
    } catch (err: any) {
      setIsErrored(true);
      const errMessage = err.message || "Đã xảy ra lỗi không xác định";
      setResult([`Lỗi: ${errMessage}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const resultClass = `result-zone ${
    isErrored
      ? "is-error"
      : !isLoading && result.length > 0 && !isErrored
      ? "is-success"
      : ""
  }`;

  return (
    <>
      <div className="button-container">
        <button
          className="interpret-button"
          onClick={handleInterpret}
          disabled={isLoading}
          type="button"
          aria-label="Thực thi code"
        >
          {isLoading && <div className="loading-spinner" />}
          {isLoading ? "Đang thực thi..." : "Phiên dịch"}
        </button>
      </div>

      <div className={resultClass} role="log" aria-live="polite">
        {isLoading ? (
          <div className="loading-message">
            <div className="loading-spinner" />
            Đang phiên dịch code...
          </div>
        ) : (
          result.map((value, index) => (
            <div key={index} className="result-line">
              {value}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ResultPanel;
