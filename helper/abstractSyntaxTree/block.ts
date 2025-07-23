import AST from "./ast";
import Compound from "./compound";

export default class Block extends AST {
  declarations: AST[];
  compoundStatement: Compound;

  constructor(inputDeclare: AST[], inputCompound: Compound) {
    super();
    this.declarations = inputDeclare;
    this.compoundStatement = inputCompound;
  }

  public getType(): string {
    return "Block";
  }
}
