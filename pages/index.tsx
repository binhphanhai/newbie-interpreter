import type { NextPage } from "next";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = useState("");

  const handleInterprete = () => {
    const code = inputRef.current?.value!;
    setResult(code);
  };

  return (
    <div>
      <textarea ref={inputRef}></textarea>
      <button onClick={handleInterprete}>Interprete</button>
      <div>{result}</div>
    </div>
  );
};

export default Home;
