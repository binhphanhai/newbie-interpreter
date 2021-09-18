import AST from "./ast";
import BinOP from "./binOP";
import Block from "./block";

export default class While extends AST {
  expression: BinOP;
  whileBlock: Block;

  constructor(expression: BinOP, whileBlock: Block) {
    super();
    this.expression = expression;
    this.whileBlock = whileBlock;
  }
}
