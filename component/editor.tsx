import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
}

const Editor: React.FC<EditorProps> = (props) => {
  const [codeValue, setCodeValue] = useState("");
  return (
    <CodeMirror
      value={codeValue}
      options={{
        theme: "material",
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        setCodeValue(value);
      }}
      
    />
  );
};

export default Editor;
