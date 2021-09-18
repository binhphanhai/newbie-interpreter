import AST from "./ast";
import Block from "./block";
import Param from "./param";

export default class ProcedureDeclaration extends AST {
  procName: string;
  params: Param[];
  blockNode: Block;

  constructor(procName: string, params: Param[], blockNode: Block) {
    super();
    this.procName = procName;
    this.params = params;
    this.blockNode = blockNode;
  }
}
