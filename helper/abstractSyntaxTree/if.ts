import AST from "./ast";
import BinOP from "./binOP";
import Block from "./Block";

export default class If extends AST {
  expression: BinOP;
  ifBlock: Block;
  elseBlock: Block;

  constructor(expression: BinOP, ifBlock: Block, elseBlock: Block) {
    super();
    this.expression = expression;
    this.ifBlock = ifBlock;
    this.elseBlock = elseBlock;
  }
}
