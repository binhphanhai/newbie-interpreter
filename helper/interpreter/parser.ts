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
import Token, { TokenType } from "../token";
import Lexer from "./lexer";

export default class Parse {
  private lexer: Lexer;
  private currentToken: Token;

  constructor(inputLexer: Lexer) {
    this.lexer = inputLexer;
    this.currentToken = this.lexer.getNextToken();
  }

  private showError() {
    // TO DO
  }

  private eat(type: TokenType) {
    if (this.currentToken.type === type) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      // TO DO
      this.showError();
    }
  }

  private getBlock(): Block {
    // a single Block has multiple Declarations & single Compound statement
    this.eat(TokenType.BEGIN);
    const declarationNodes = this.getDeclarations();
    const compoundStatementNode = this.getCompoundStatement();
    this.eat(TokenType.END);
    return new Block(declarationNodes, compoundStatementNode);
  }

  private getDeclarations(): AST[] {
    // include varible declarations function declarations
    const declarations: AST[] = [];
    while (true) {
      // var declarations
      if (this.currentToken.type === TokenType.VAR) {
        this.eat(TokenType.VAR);
        if ((this.currentToken.type as TokenType) === TokenType.ID) {
          const varDeclarations = this.getVariableDeclaration();
          declarations.concat(varDeclarations);
          this.eat(TokenType.SEMI);
        }
      }
      // function declarations
      else if (this.currentToken.type === TokenType.PROCEDURE) {
        const procedureDeclaration = this.getProcedureDeclaration();
        declarations.push(procedureDeclaration);
      } else break;
    }
    return declarations;
  }

  private getProcedureDeclaration(): ProcedureDeclaration {
    // get function's name
    this.eat(TokenType.PROCEDURE);
    const procName = this.currentToken.value!;
    this.eat(TokenType.ID);

    // get params
    this.eat(TokenType.LPAREN);
    const params = this.getFormalParameterList();
    this.eat(TokenType.RPAREN);

    // get block
    const blockNode = this.getBlock();

    return new ProcedureDeclaration(procName, params, blockNode);
  }

  private getFormalParameterList(): Param[] {
    // function(a, b: int; c, d: real)
    if (this.currentToken.type !== TokenType.ID) return [];

    const paramList = this.getFormalParameter();

    while ((this.currentToken.type as TokenType) === TokenType.SEMI) {
      this.eat(TokenType.SEMI);
      paramList.concat(this.getFormalParameter());
    }
    return paramList;
  }

  private getFormalParameter(): Param[] {
    // a, b: int
    const varList: Token[] = [];

    varList.push(this.currentToken);
    this.eat(TokenType.ID);

    while (this.currentToken.type === TokenType.COMMA) {
      this.eat(TokenType.COMMA);
      varList.push(this.currentToken);
      this.eat(TokenType.ID);
    }

    this.eat(TokenType.COLON);
    const varType = this.getVarType();
    return varList.map((variable) => new Param(new Var(variable), varType));
  }

  private getVarType(): TypeAST {
    const token = this.currentToken;
    switch (token.type) {
      case TokenType.INTEGER:
        this.eat(TokenType.INTEGER);
        break;
      case TokenType.REAL:
        this.eat(TokenType.REAL);
        break;
      case TokenType.STRING:
        this.eat(TokenType.STRING);
        break;
      case TokenType.BOOL:
        this.eat(TokenType.BOOL);
        break;
    }
    return new TypeAST(token);
  }

  private getVariableDeclaration(): VariableDeclaration[] {
    const varList: Token[] = [];
    varList.push(this.currentToken);
    this.eat(TokenType.ID);

    while (this.currentToken.type === TokenType.COMMA) {
      this.eat(TokenType.COMMA);
      varList.push(this.currentToken);
      this.eat(TokenType.ID);
    }
    this.eat(TokenType.COLON);

    const varType = this.getVarType();
    return varList.map(
      (variable) => new VariableDeclaration(new Var(variable), varType)
    );
  }

  private getCompareExpression(): BinOP {
    const leftExpression = this.getExpression();
    const op = this.currentToken;
    if (op.isCompareOperator()) {
      this.eat(this.currentToken.type);
    }
    const rightExpression = this.getExpression();
    return new BinOP(leftExpression, op, rightExpression);
  }

  private getExpression(): AST {
    // each expression can have multiple terms, operator between 2 terms is plus | minus
    let result = this.getTermExpression();
    while (
      this.currentToken.type === TokenType.PLUS ||
      this.currentToken.type === TokenType.MINUS
    ) {
      const token = this.currentToken;
      this.eat(token.type);
      result = new BinOP(result, token, this.getTermExpression());
    }
    return result;
  }

  private getTermExpression(): AST {
    // each term can have multiple factors, operator between 2 factors is multiple | division | mod
    let result = this.getFactor();
    while (
      this.currentToken.type === TokenType.INTEGER_DIV ||
      this.currentToken.type === TokenType.MULTIPLE ||
      this.currentToken.type === TokenType.REAL_DIV ||
      this.currentToken.type === TokenType.INTEGER_MOD
    ) {
      const token = this.currentToken;
      this.eat(token.type);
      result = new BinOP(result, token, this.getFactor());
    }
    return result;
  }
  private getFactor(): AST {
    // each factor can be operator | constant | variable | expression | proc call
    const token = this.currentToken;
    switch (token.type) {
      case TokenType.PLUS:
        this.eat(TokenType.PLUS);
        return new UnaryOP(token, this.getFactor());
      case TokenType.MINUS:
        this.eat(TokenType.MINUS);
        return new UnaryOP(token, this.getFactor());
      case TokenType.INTEGER_CONST:
        this.eat(TokenType.INTEGER_CONST);
        return new MyNumber(token);
      case TokenType.REAL_CONST:
        this.eat(TokenType.REAL_CONST);
        return new MyNumber(token);
      case TokenType.STRING_CONST:
        this.eat(TokenType.STRING_CONST);
        return new MyString(token);
      case TokenType.BOOL_CONST:
        this.eat(TokenType.BOOL_CONST);
        return new MyBool(token);
      case TokenType.LPAREN:
        this.eat(TokenType.LPAREN);
        var node = this.getExpression();
        this.eat(TokenType.RPAREN);
        return node;
      case TokenType.ID:
        if (this.lexer.getCurrentChar() === "(") {
          return this.getProcCallStatement();
        } else {
          return this.getVariable();
        }
      default:
        return this.getVariable();
    }
  }

  private getCompoundStatement(): Compound {
    const root = new Compound();
    root.children = this.getStatementList();
    return root;
  }

  private getStatementList(): AST[] {
    const statementList: AST[] = [];
    statementList.push(this.getStatement());
    while (this.currentToken.type === TokenType.SEMI) {
      this.eat(TokenType.SEMI);
      statementList.push(this.getStatement());
    }

    if (this.currentToken.type === TokenType.ID) {
      // TO DO
      this.showError();
    }
    return statementList;
  }

  private getStatement(): AST {
    // statement can be one of:
    // compound
    if (this.currentToken.type === TokenType.BEGIN) {
      return this.getCompoundStatement();
    }
    // proc call
    else if (
      this.currentToken.type === TokenType.ID &&
      this.lexer.getCurrentChar() === "("
    ) {
      return this.getProcCallStatement();
    }
    // assign
    else if (this.currentToken.type === TokenType.ID) {
      return this.getAssignmentStatement();
    }
    // return
    else if (this.currentToken.type === TokenType.RETURN) {
      this.eat(TokenType.RETURN);
      return new Return(this.currentToken, this.getExpression());
    }
    // if statement
    else if (this.currentToken.type === TokenType.IF) {
      this.eat(TokenType.IF);
      return this.getIfStatement();
    }
    // while statement
    else if (this.currentToken.type === TokenType.WHILE) {
      this.eat(TokenType.WHILE);
      return this.getWhileStatement();
    } else return this.getEmpty();
  }

  private getEmpty(): NoOP {
    return new NoOP();
  }

  private getWhileStatement(): While {
    this.eat(TokenType.LPAREN);
    const expression = this.getCompareExpression();
    this.eat(TokenType.RPAREN);

    const whileBlock = this.getBlock();
    return new While(expression, whileBlock);
  }

  private getIfStatement(): If {
    this.eat(TokenType.LPAREN);
    const expression = this.getCompareExpression();
    this.eat(TokenType.RPAREN);

    const ifBlock = this.getBlock();
    let elseBlock: Block | null = null;
    if (this.currentToken.type === TokenType.ELSE) {
      this.eat(TokenType.ELSE);
      elseBlock = this.getBlock();
    }

    return new If(expression, ifBlock, elseBlock);
  }

  private getAssignmentStatement(): Assign {
    const left = this.getVariable();
    const token = this.currentToken;
    this.eat(TokenType.ASSIGN);
    const right = this.getExpression();
    return new Assign(left, token, right);
  }

  private getProcCallStatement(): ProcedureCall {
    const token = this.currentToken;
    const procName = token.value!;
    this.eat(TokenType.ID);
    this.eat(TokenType.LPAREN);

    const actualParams: AST[] = [];
    if (this.currentToken.type !== TokenType.RPAREN) {
      actualParams.push(this.getExpression());
      while ((this.currentToken.type as TokenType) === TokenType.COMMA) {
        this.eat(TokenType.COMMA);
        actualParams.push(this.getExpression());
      }
    }
    this.eat(TokenType.RPAREN);

    return new ProcedureCall(procName, actualParams, token);
  }

  private getVariable(): Var {
    const result = new Var(this.currentToken);
    this.eat(TokenType.ID);
    return result;
  }

  private getProgram(): ProgramAST {
    this.eat(TokenType.PROGRAM);
    const programName = (this.getVariable() as Var).value;
    const block = this.getBlock();
    return new ProgramAST(programName, block);
  }

  public parse(): ProgramAST {
    const program = this.getProgram();
    if (this.currentToken.type !== TokenType.EOF) {
      // TO DO: show unexpected token error
    }
    return program;
  }
}
