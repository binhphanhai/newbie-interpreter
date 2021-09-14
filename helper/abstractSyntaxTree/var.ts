import Token from "../token";
import AST from "./ast";

export default class Var extends AST {
  token: Token;
  value: string;

  constructor(token: Token) {
    super();
    this.token = token;
    this.value = token.value;
  }
}
