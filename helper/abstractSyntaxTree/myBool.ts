import Token from "../token";
import AST from "./ast";

export default class MyBool extends AST {
  token: Token;
  value: boolean;

  constructor(token: Token) {
    super();
    this.token = token;
    this.value = token.value === "TRUE";
  }

  public getType(): string {
    return "MyBool";
  }
}
