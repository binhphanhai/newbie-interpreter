import Token from "../token";
import Interpreter from "./interpreter";
import Lexer from "./lexer";
import Parser from "./parser";
import SemanticAnalyzer from "./semanticAnalyzer";

Token.addSampleCompareOperator();
Lexer.initReservedKeywords();

export const interprete = (code: string) => {
  const lexer = new Lexer(code);
  const parser = new Parser(lexer);

  const tree = parser.parse();

  const semanticAnalyzer = new SemanticAnalyzer();
  semanticAnalyzer.visit(tree);

  const interpreter = new Interpreter(tree);

  return interpreter.interprete();
};
