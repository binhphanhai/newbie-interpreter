import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";

if (typeof navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
}

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { code, setCode } = props;
  return (
    <CodeMirror
      value={code}
      options={{
        theme: "material",
        lineNumbers: true,
        mode: "javascript",
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
      }}
    />
  );
};

export default Editor;
