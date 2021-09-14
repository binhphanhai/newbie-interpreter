import Token from "../token";
import AST from "./ast";

export default class ProcedureCall extends AST {
  procName: string;
  actualParams: AST[];
  token: Token;

  constructor(procName: string, actualParams: AST[], token: Token) {
    super();
    this.procName = procName;
    this.actualParams = actualParams;
    this.token = token;
  }
}
