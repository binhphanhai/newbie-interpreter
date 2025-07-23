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
      <h1 className="page-title">Chào mừng đến với Newbie Interpreter</h1>

      <div className="main-container">
        <section className="editor-section">
          <h2 className="section-title">Hãy thử một số ví dụ sau:</h2>

          <div className="example-container">
            {Object.keys(examples).map((itemKey) => (
              <ExampleItem
                key={itemKey}
                name={itemKey}
                handleSelect={() => setCode(examples[itemKey])}
              />
            ))}
          </div>

          <div className="editor-wrapper">
            <Editor code={code} setCode={setCode} />
          </div>
        </section>

        <aside className="result-panel-container">
          <h2 className="section-title">Kết quả</h2>
          <ResultPanel code={code} />
        </aside>
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
