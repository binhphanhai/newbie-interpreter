import Token from "../token";
import AST from "./ast";
import Block from "./block";
import Param from "./param";

export default class ProcedureDeclaration extends AST {
  procName: string;
  token: Token;
  params: Param[];
  blockNode: Block;

  constructor(
    procName: string,
    token: Token,
    params: Param[],
    blockNode: Block
  ) {
    super();
    this.procName = procName;
    this.token = token;
    this.params = params;
    this.blockNode = blockNode;
  }

  public getType(): string {
    return "ProcedureDeclaration";
  }
}
