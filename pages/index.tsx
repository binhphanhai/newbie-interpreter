import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useState } from "react";
import Editor from "../component/editor";
import ExampleItem from "../component/exampleItem";
import ResultPanel from "../component/resultPanel";
import { readFiles } from "../helper/fileReader";

const Home = ({ examples }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [code, setCode] = useState("");
  return (
    <div>
      <h2>Chào mừng đến với Newbie Interpreter</h2>
      <div className="main-container">
        <div style={{ flex: 1 }}>
          <div className="title">Hãy thử 1 số ví dụ sau:</div>
          <div className="example-container">
            {Object.keys(examples).map((itemKey) => (
              <ExampleItem
                key={itemKey}
                name={itemKey}
                handleSelect={() => setCode(examples[itemKey])}
              />
            ))}
          </div>
          <div>
            <Editor code={code} setCode={setCode} />
          </div>
        </div>
        <div className="result-panel-container">
          <ResultPanel code={code} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const examples = readFiles("examples/");
  return {
    props: {
      examples,
    },
  };
};

export default Home;
