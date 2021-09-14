import AST from "./ast";
import Block from "./Block";

export default class ProgramAST extends AST {
  name: string;
  block: Block;

  constructor(name: string, block: Block) {
    super();
    this.name = name;
    this.block = block;
  }
}
