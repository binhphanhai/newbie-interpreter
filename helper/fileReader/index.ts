import fs from "fs";
import path from "path";

export const readFiles = (dirname: string) => {
  const filenames = fs.readdirSync(dirname);
  const examples: { [prop: string]: string } = {};
  filenames.forEach((filename) => {
    const content = fs.readFileSync(dirname + filename).toString();
    const filenameWithoutExtension = path.parse(filename).name;
    examples[filenameWithoutExtension] = content;
  });

  return examples;
};
