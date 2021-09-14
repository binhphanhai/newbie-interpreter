import Token from "../token";
import AST from "./ast";

export default class TypeAST extends AST {
  token: Token;
  value: string;

  constructor(token: Token) {
    super();
    this.token = token;
    this.value = token.value;
  }
}
