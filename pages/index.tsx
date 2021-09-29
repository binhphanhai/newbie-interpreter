import type { NextPage } from "next";
import { useState } from "react";
import Editor from "../component/editor";
import ResultPanel from "../component/resultPanel";

const Home: NextPage = () => {
  const [code, setCode] = useState("");

  return (
    <div>
      <div></div>
      <div>
        <Editor code={code} setCode={setCode} />
      </div>
      <div className="result-panel-container">
        <ResultPanel code={code} />
      </div>
    </div>
  );
};

export default Home;
