import AST from "./ast";
import TypeAST from "./typeAST";
import Var from "./var";

export default class VariableDeclaration extends AST {
  varNode: Var;
  typeNode: TypeAST;

  constructor(varNode: Var, typeNode: TypeAST) {
    super();
    this.varNode = varNode;
    this.typeNode = typeNode;
  }

  public getType(): string {
    return "VariableDeclaration";
  }
}
