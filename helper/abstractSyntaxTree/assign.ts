import Token from "../token";
import AST from "./ast";

export default class Assign extends AST {
  left: AST;
  op: Token;
  right: AST;

  constructor(left: AST, op: Token, right: AST) {
    super();
    this.left = left;
    this.op = op;
    this.right = right;
  }

  public getType(): string {
    return "Assign";
  }
}
