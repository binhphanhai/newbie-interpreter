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
      <div>
        <h2>Welcome to Newbie Interpreter</h2>
        <div className="example-container">
          <div className="title">{"Let's try some examples: "}</div>
          {Object.keys(examples).map((itemKey) => (
            <ExampleItem
              key={itemKey}
              name={itemKey}
              handleSelect={() => setCode(examples[itemKey])}
            />
          ))}
        </div>
      </div>
      <div>
        <Editor code={code} setCode={setCode} />
      </div>
      <div className="result-panel-container">
        <ResultPanel code={code} />
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
