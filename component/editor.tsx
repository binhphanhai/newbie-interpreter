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

const customKeywords: { [key: string]: string } = {
  bien: "custom-blue",
  chuongtrinh: "custom-blue",
  nguyen: "custom-purple",
  thuc: "custom-purple",
  chuoi: "custom-purple",
  bool: "custom-purple",
  ham: "custom-blue",
  trave: "custom-purple",
  neu: "custom-purple",
  nguoclai: "custom-purple",
  khi: "custom-purple",
  dung: "custom-blue",
  sai: "custom-blue",
  in: "custom-purple",
};

const shopeeMode = () => {
  return {
    startState: function () {
      return { inString: false };
    },
    token: (stream: any, state: any) => {
      if (!state.inString && stream.peek() == '"') {
        stream.next();
        state.inString = true;
      }

      if (state.inString) {
        if (stream.skipTo('"')) {
          stream.next();
          state.inString = false;
        } else {
          stream.skipToEnd();
        }
        return "custom-string";
      } else {
        const word = stream.match(/[\w]+/);
        if (word) {
          if (customKeywords[word[0]]) {
            return customKeywords[word[0]];
          }
          return "custom-light-blue";
        }
        stream.next();
        return null;
      }
    },
  };
};

const Editor: React.FC<EditorProps> = (props) => {
  const { code, setCode } = props;

  return (
    <CodeMirror
      value={code}
      defineMode={{ name: "shopee", fn: shopeeMode }}
      options={{
        mode: "shopee",
        theme: "material",
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
      }}
    />
  );
};

export default Editor;
