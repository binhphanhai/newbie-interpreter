import AST from "./ast";
import BinOP from "./binOP";
import Block from "./block";

export default class If extends AST {
  expression: BinOP;
  ifBlock: Block;
  elseBlock: Block | null;

  constructor(expression: BinOP, ifBlock: Block, elseBlock: Block | null) {
    super();
    this.expression = expression;
    this.ifBlock = ifBlock;
    this.elseBlock = elseBlock;
  }
}
