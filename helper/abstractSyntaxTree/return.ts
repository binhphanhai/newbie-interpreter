import Token from "../token";
import AST from "./ast";

export default class Return extends AST {
  token: Token;
  result: AST;

  constructor(token: Token, result: AST) {
    super();
    this.token = token;
    this.result = result;
  }
}
