import AST from "./ast";

export default class Compound extends AST {
  children: AST[];

  constructor() {
    super();
    this.children = [];
  }
}
