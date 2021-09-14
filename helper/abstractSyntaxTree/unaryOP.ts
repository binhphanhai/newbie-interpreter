import Token from "../token";
import AST from "./ast";

export default class UnaryOP extends AST {
  op: Token;
  expression: AST;

  constructor(op: Token, expression: AST) {
    super();
    this.op = op;
    this.expression = expression;
  }
}
