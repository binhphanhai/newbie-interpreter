import AST from "./ast";

export default class NoOP extends AST {
  constructor() {
    super();
  }

  public getType(): string {
    return "NoOP";
  }
}
