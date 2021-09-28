import Assign from "../abstractSyntaxTree/assign";
import AST from "../abstractSyntaxTree/ast";
import BinOP from "../abstractSyntaxTree/binOP";
import Block from "../abstractSyntaxTree/block";
import Compound from "../abstractSyntaxTree/compound";
import If from "../abstractSyntaxTree/if";
import MyBool from "../abstractSyntaxTree/myBool";
import MyNumber from "../abstractSyntaxTree/myNumber";
import MyString from "../abstractSyntaxTree/myString";
import NoOP from "../abstractSyntaxTree/noOP";
import Param from "../abstractSyntaxTree/param";
import ProcedureCall from "../abstractSyntaxTree/procedureCall";
import ProcedureDeclaration from "../abstractSyntaxTree/procedureDeclaration";
import ProgramAST from "../abstractSyntaxTree/programAST";
import Return from "../abstractSyntaxTree/return";
import TypeAST from "../abstractSyntaxTree/typeAST";
import UnaryOP from "../abstractSyntaxTree/unaryOP";
import Var from "../abstractSyntaxTree/var";
import VariableDeclaration from "../abstractSyntaxTree/variableDeclaration";
import While from "../abstractSyntaxTree/while";
import CallStack from "../callStack";
import ActivationRecord, { ARType } from "../callStack/activationRecord";
import { ErrorCode } from "../errors/baseError";
import { SemanticError } from "../errors/semanticError";
import SymbolTable from "../symbolTable";
import ProcedureSymbol from "../symbolTable/procedureSymbol";
import VarSymbol from "../symbolTable/varSymbol";
import Token, { TokenType } from "../token";
import NodeVisitor from "./nodeVisitor";

export default class Interpreter extends NodeVisitor {
  private tree: AST;
  private callStack: CallStack;

  constructor(tree: AST) {
    super();
    this.tree = tree;
    this.callStack = new CallStack();
  }

  private showError(message: string) {
    throw new Error(message);
  }

  private visitBinOP(node: BinOP) {
    switch (node.op.type) {
      case TokenType.PLUS:
        return this.visit(node.left) + this.visit(node.right);
      case TokenType.MINUS:
        return this.visit(node.left) - this.visit(node.right);
      case TokenType.MULTIPLE:
        return this.visit(node.left) * this.visit(node.right);
      case TokenType.INTEGER_DIV:
        return Math.floor(this.visit(node.left) / this.visit(node.right));
      case TokenType.INTEGER_MOD:
        return this.visit(node.left) % this.visit(node.right);
      case TokenType.REAL_DIV:
        return this.visit(node.left) / this.visit(node.right);
      case TokenType.EQUAL:
        return this.visit(node.left) === this.visit(node.right);
      case TokenType.NOT_EQUAL:
        return this.visit(node.left) !== this.visit(node.right);
      case TokenType.GREATER_THAN:
        return this.visit(node.left) > this.visit(node.right);
      case TokenType.LESS_THAN:
        return this.visit(node.left) < this.visit(node.right);
      case TokenType.GREATER_THAN_OR_EQUAL:
        return this.visit(node.left) >= this.visit(node.right);
      case TokenType.LESS_THAN_OR_EQUAL:
        return this.visit(node.left) <= this.visit(node.right);
      default:
        this.showError("Error in visitBinOP: not supported operator");
    }
  }

  private visitUnaryOP(node: UnaryOP) {
    switch (node.op.type) {
      case TokenType.PLUS:
        return +this.visit(node.expression);
      case TokenType.MINUS:
        return -this.visit(node.expression);
      default:
        this.showError("Error in visitUnaryOP: not supported operator");
    }
  }

  private visitNoOP(node: NoOP) {}

  private visitMyNumber(node: MyNumber) {
    return +node.value;
  }

  private visitMyString(node: MyString) {
    return node.value;
  }

  private visitMyBool(node: MyBool) {
    return node.value as boolean;
  }

  private visitCompound(node: Compound) {
    for (const child of node.children) {
      if (child.getType() === Return.name.toString()) return this.visit(child);
      else this.visit(child);
    }
  }

  private visitAssign(node: Assign) {
    const variable = node.left as Var;

    const ar = this.callStack.peek()!;
    ar.setItem(variable.value, this.visit(node.right));
  }

  private visitVar(node: Var) {
    const ar = this.callStack.peek()!;
    return ar.getItem(node.value);
  }

  private visitBlock(node: Block) {
    for (const declaration of node.declarations) {
      this.visit(declaration);
    }
    return this.visit(node.compoundStatement);
  }

  private visitProcedureDeclaration(node: ProcedureDeclaration) {
    const ar = this.callStack.peek()!;
    ar.setItem(node.procName, node);
  }

  private visitVariableDeclaration(node: VariableDeclaration) {}

  private visitTypeAST(node: TypeAST) {}

  private visitParam(node: Param) {}

  private runBuiltInProc(curScope: ActivationRecord, node: ProcedureCall) {
    const procedure = curScope.builtInProcs.get(node.procName);
    const actualParam: any[] = [];
    for (const param of node.actualParams) {
      actualParam.push(this.visit(param));
    }
    const method = `this.visit${procedure}(${actualParam.join(",")})`;
    return eval(method);
  }

  private visitProcedureCall(node: ProcedureCall) {
    const curScope = this.callStack.peek()!;
    if (curScope.builtInProcs.has(node.procName)) {
      return this.runBuiltInProc(curScope, node);
    }

    const proc = curScope.getItem(node.procName) as ProcedureDeclaration;
    const newScope = new ActivationRecord(
      node.procName,
      ARType.PROCEDURE,
      curScope.level + 1,
      curScope
    );

    for (let i = 0; i < node.actualParams.length; i++) {
      newScope.setItem(
        proc.params[i].varNode.token.value!,
        this.visit(node.actualParams[i])
      );
    }

    this.callStack.push(newScope);
    const result = this.visit(proc.blockNode);
    this.callStack.pop();
    return result;
  }

  private visitReturn(node: Return) {
    return this.visit(node.result);
  }

  private visitPrint(value: any) {
    console.log(value);
  }

  private visitIf(node: If) {
    if (this.visit(node.expression) as boolean) {
      this.visit(node.ifBlock);
    } else {
      if (node.elseBlock) this.visit(node.elseBlock);
    }
  }

  private visitWhile(node: While) {
    while (this.visit(node.expression) as boolean) {
      this.visit(node.whileBlock);
    }
  }

  private visitProgramAST(node: ProgramAST) {
    const ar = new ActivationRecord(node.name, ARType.PROGRAM, 1);
    this.callStack.push(ar);
    this.visit(node.block);
    this.callStack.pop();
  }

  public interprete() {
    return this.visit(this.tree);
  }
}
