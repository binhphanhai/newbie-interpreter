import Assign from "../abstractSyntaxTree/assign";
import BinOP from "../abstractSyntaxTree/binOP";
import Block from "../abstractSyntaxTree/block";
import Compound from "../abstractSyntaxTree/compound";
import If from "../abstractSyntaxTree/if";
import MyBool from "../abstractSyntaxTree/myBool";
import MyNumber from "../abstractSyntaxTree/myNumber";
import MyString from "../abstractSyntaxTree/myString";
import NoOP from "../abstractSyntaxTree/noOP";
import ProcedureCall from "../abstractSyntaxTree/procedureCall";
import ProcedureDeclaration from "../abstractSyntaxTree/procedureDeclaration";
import ProgramAST from "../abstractSyntaxTree/programAST";
import Return from "../abstractSyntaxTree/return";
import UnaryOP from "../abstractSyntaxTree/unaryOP";
import Var from "../abstractSyntaxTree/var";
import VariableDeclaration from "../abstractSyntaxTree/variableDeclaration";
import While from "../abstractSyntaxTree/while";
import { ErrorCode, MAP_ERROR_CODE } from "../errors/baseError";
import { SemanticError } from "../errors/semanticError";
import SymbolTable from "../symbolTable";
import ProcedureSymbol from "../symbolTable/procedureSymbol";
import VarSymbol from "../symbolTable/varSymbol";
import Token, { TokenType } from "../token";
import NodeVisitor from "./nodeVisitor";

export default class SemanticAnalyzer extends NodeVisitor {
  private currentScope: SymbolTable | null;

  constructor() {
    super();
    this.currentScope = null;
  }

  private showError(errorCode: ErrorCode, token: Token) {
    const message = `${MAP_ERROR_CODE[errorCode]} -> ${token.showToken()}`;
    const error = new SemanticError(errorCode, token, message);
    error.showError();
  }

  private visitProgramAST(node: ProgramAST) {
    const globalScope = new SymbolTable("global", 1, this.currentScope);
    this.currentScope = globalScope;
    this.visit(node.block);
    this.currentScope = this.currentScope.parentScope;
  }

  private visitBlock(node: Block) {
    for (const declaration of node.declarations) {
      this.visit(declaration);
    }
    this.visit(node.compoundStatement);
  }

  private visitBinOP(node: BinOP) {
    return [...this.visit(node.left), ...this.visit(node.right)];
  }

  private visitMyBool(node: MyBool) {
    return [node.token.type];
  }

  private visitMyNumber(node: MyNumber) {
    return [node.token.type];
  }

  private visitMyString(node: MyString) {
    return [node.token.type];
  }

  private visitNoOP(node: NoOP) {}

  private visitUnaryOP(node: UnaryOP) {
    return [...this.visit(node.expression)];
  }

  private visitCompound(node: Compound) {
    for (const child of node.children) {
      this.visit(child);
    }
  }

  private visitVariableDeclaration(node: VariableDeclaration) {
    const typeName = node.typeNode.value;
    const typeSymbol = this.currentScope?.lookup(typeName);

    if (!typeSymbol) {
      this.showError(ErrorCode.NOT_FOUND_TYPE, node.typeNode.token);
      return;
    }

    const varName = node.varNode.value;
    const varSymbol = new VarSymbol(varName, typeSymbol);

    if (this.currentScope?.lookup(varName, true)) {
      this.showError(ErrorCode.DUPLICATE_ID, node.varNode.token);
      return;
    }
    this.currentScope?.insert(varSymbol);
  }

  private visitProcedureDeclaration(node: ProcedureDeclaration) {
    const procName = node.procName;

    if (this.currentScope?.lookup(procName, true)) {
      this.showError(ErrorCode.DUPLICATE_PROCEDURE, node.token);
    }

    const procSymbol = new ProcedureSymbol(procName);
    this.currentScope?.insert(procSymbol);

    const procScope = new SymbolTable(
      procName,
      this.currentScope?.scopeLevel! + 1,
      this.currentScope
    );
    this.currentScope = procScope;

    for (const param of node.params) {
      const paramType = this.currentScope.lookup(param.typeNode.value);
      if (!paramType) {
        this.showError(ErrorCode.NOT_FOUND_TYPE, param.typeNode.token);
        return;
      }
      const paramName = param.varNode.value;
      const varSymbol = new VarSymbol(paramName, paramType);
      this.currentScope.insert(varSymbol);
      procSymbol.params.push(varSymbol);
    }

    this.visit(node.blockNode);
    this.currentScope = this.currentScope.parentScope;
  }

  private visitProcedureCall(node: ProcedureCall) {
    const procName = node.procName;
    if (this.currentScope && !this.currentScope.lookup(procName)) {
      this.showError(ErrorCode.PROCEDURE_NOT_FOUND, node.token);
    }
    for (const param of node.actualParams) {
      this.visit(param);
    }
    return [];
  }

  private visitVar(node: Var) {
    const value = this.currentScope?.lookup(node.value);
    if (!value) {
      this.showError(ErrorCode.ID_NOT_FOUND, node.token);
    }
    switch (value?.type?.name) {
      case "BOOL":
        return [TokenType.BOOL_CONST];
      case "INTEGER":
        return [TokenType.INTEGER_CONST];
      case "STRING":
        return [TokenType.STRING_CONST];
      case "REAL":
        return [TokenType.REAL_CONST];
      default:
        return [];
    }
  }

  private visitAssign(node: Assign) {
    const variable = node.left as Var;
    this.visit(variable);
    const type = this.currentScope?.lookup(variable.value)?.type;
    const valueType: TokenType[] = this.visit(node.right);

    if (valueType?.includes(TokenType.STRING_CONST)) {
      if (type?.name !== "STRING") {
        this.showError(ErrorCode.TYPE_MISMATCH, variable.token);
      }
    } else if (valueType?.includes(TokenType.REAL_CONST)) {
      if (type?.name !== "REAL") {
        this.showError(ErrorCode.TYPE_MISMATCH, variable.token);
      }
    } else if (valueType?.includes(TokenType.INTEGER_CONST)) {
      if (type?.name !== "INTEGER") {
        this.showError(ErrorCode.TYPE_MISMATCH, variable.token);
      }
    } else if (valueType?.includes(TokenType.BOOL_CONST)) {
      if (type?.name !== "BOOL") {
        this.showError(ErrorCode.TYPE_MISMATCH, variable.token);
      }
    }
  }

  private visitReturn(node: Return) {
    this.visit(node.result);
  }

  private visitIf(node: If) {
    this.visit(node.expression);
    this.visit(node.ifBlock);
    if (node.elseBlock) {
      this.visit(node.elseBlock);
    }
  }

  private visitWhile(node: While) {
    this.visit(node.expression);
    this.visit(node.whileBlock);
  }
}
