import Token from "../token";
import AST from "./ast";
import TypeAST from "./typeAST";
import Var from "./var";

export default class Param extends AST {
  varNode: Var;
  typeNode: TypeAST;

  constructor(varNode: Var, typeNode: TypeAST) {
    super();
    this.varNode = varNode;
    this.typeNode = typeNode;
  }
}
