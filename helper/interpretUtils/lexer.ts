import { LexerError } from "../errors/lexerError";
import Token, { TokenType } from "../token";

const END_CHAR = "@";

const isWhiteSpace = (char: string) => {
  return char === " " || char === "\t" || char === "\r";
};

const isBreakLine = (char: string) => {
  return char === "\n";
};

const isNumeric = (value: string) => {
  return /^-?\d+$/.test(value);
};

const isLetter = (char: string) => {
  return char.match(/[a-z]/i);
};

const isNumericOrLetter = (char: string) => {
  return isNumeric(char) || isLetter(char);
};

export default class Lexer {
  private text: string; // input code
  private pos: number; // current pos of code
  private currentChar: string;
  private lineno: number;
  private column: number;

  private static RESERVED_KEYWORDS: any;

  constructor(inputText: string) {
    this.text = inputText;
    this.pos = 0;
    if (inputText.length > 0) this.currentChar = inputText[0];
    else this.currentChar = END_CHAR;
    this.lineno = 1;
    this.column = 1;
  }

  public showError() {
    const message = `Lexer error on ${this.currentChar} line: ${this.lineno}, column: ${this.column}`;
    const error = new LexerError(message);
    error.showError();
  }

  public static initReservedKeywords() {
    Lexer.RESERVED_KEYWORDS = {
      var: new Token(TokenType.VAR, "VAR"),
      program: new Token(TokenType.PROGRAM, "PROGRAM"),
      int: new Token(TokenType.INTEGER, "INTEGER"),
      real: new Token(TokenType.REAL, "REAL"),
      string: new Token(TokenType.STRING, "STRING"),
      bool: new Token(TokenType.BOOL, "BOOL"),
      function: new Token(TokenType.PROCEDURE, "PROCEDURE"),
      return: new Token(TokenType.RETURN, "RETURN"),
      if: new Token(TokenType.IF, "IF"),
      else: new Token(TokenType.ELSE, "ELSE"),
      while: new Token(TokenType.WHILE, "WHILE"),
      true: new Token(TokenType.BOOL_CONST, "TRUE"),
      false: new Token(TokenType.BOOL_CONST, "FALSE"),
    };
  }

  private isEnd() {
    return this.currentChar === END_CHAR;
  }

  private advanceCurrentChar() {
    if (isBreakLine(this.currentChar)) {
      this.lineno += 1;
      this.column = 0;
    }
    this.pos++;

    if (this.pos > this.text.length - 1) {
      // end of file
      this.currentChar = END_CHAR;
      return;
    }

    this.currentChar = this.text[this.pos];
    this.column += 1;
  }

  private peek() {
    const peekPos = this.pos + 1;
    if (peekPos > this.text.length - 1) return END_CHAR;
    else return this.text[peekPos];
  }

  private skipWhiteSpace() {
    while (!this.isEnd() && isWhiteSpace(this.currentChar)) {
      this.advanceCurrentChar();
    }
  }

  private skipComment() {
    while (!isBreakLine(this.currentChar)) {
      this.advanceCurrentChar();
    }
    this.advanceCurrentChar();
  }

  private takeNumber(): Token {
    let value = "";
    const lineno = this.lineno;
    const column = this.column;

    while (!this.isEnd() && isNumeric(this.currentChar)) {
      value += this.currentChar;
      this.advanceCurrentChar();
    }

    if (this.currentChar === ".") {
      value += this.currentChar;
      this.advanceCurrentChar();

      while (!this.isEnd() && isNumeric(this.currentChar)) {
        value += this.currentChar;
        this.advanceCurrentChar();
      }

      return new Token(TokenType.REAL_CONST, value, lineno, column);
    } else return new Token(TokenType.INTEGER_CONST, value, lineno, column);
  }

  // (Reserved words & Identifiers)
  private takeId(): Token {
    const lineno = this.lineno;
    const column = this.column;
    let value = "";
    while (!this.isEnd() && isNumericOrLetter(this.currentChar)) {
      value += this.currentChar;
      this.advanceCurrentChar();
    }
    return Lexer.RESERVED_KEYWORDS[value]
      ? Lexer.RESERVED_KEYWORDS[value]
      : new Token(TokenType.ID, value, lineno, column);
  }

  private takeString(): Token {
    let value = "";
    const lineno = this.lineno;
    const column = this.column;
    this.advanceCurrentChar();
    while (!this.isEnd() && this.currentChar !== '"') {
      value += this.currentChar;
      this.advanceCurrentChar();
    }
    this.advanceCurrentChar();
    return new Token(TokenType.STRING_CONST, value, lineno, column);
  }

  private takeOperator(): Token {
    let type: TokenType;
    let value: string | null = this.currentChar;
    const lineno = this.lineno;
    const column = this.column;
    if (this.currentChar == "+") type = TokenType.PLUS;
    else if (this.currentChar == "-") type = TokenType.MINUS;
    else if (this.currentChar == "%") type = TokenType.INTEGER_MOD;
    else if (this.currentChar == "*") type = TokenType.MULTIPLE;
    else if (this.currentChar == "/") type = TokenType.DIVIDE;
    else if (this.currentChar == "(") type = TokenType.LPAREN;
    else if (this.currentChar == ")") type = TokenType.RPAREN;
    else {
      type = TokenType.UNDEFINED;
      value = null;
    }
    this.advanceCurrentChar();

    return new Token(type, value, lineno, column);
  }

  public getNextToken() {
    while (!this.isEnd()) {
      let type: TokenType;
      let value: string = this.currentChar;
      const lineno = this.lineno;
      const column = this.column;
      if (isWhiteSpace(this.currentChar)) {
        this.skipWhiteSpace();
        continue;
      } else if (this.currentChar == "/" && this.peek() == "/") {
        this.advanceCurrentChar();
        this.advanceCurrentChar();
        this.skipComment();
        continue;
      } else if (isBreakLine(this.currentChar)) {
        this.advanceCurrentChar();
        continue;
      } else if (isLetter(this.currentChar)) {
        return this.takeId();
      } else if (isNumeric(this.currentChar)) {
        return this.takeNumber();
      } else if (this.currentChar == '"') {
        return this.takeString();
      } else if (this.currentChar == "{") {
        this.advanceCurrentChar();
        type = TokenType.BEGIN;
      } else if (this.currentChar == "}") {
        this.advanceCurrentChar();
        type = TokenType.END;
      } else if (this.currentChar == "=" && this.peek() == "=") {
        this.advanceCurrentChar();
        this.advanceCurrentChar();
        type = TokenType.EQUAL;
        value = "==";
      } else if (this.currentChar == "!" && this.peek() == "=") {
        this.advanceCurrentChar();
        this.advanceCurrentChar();
        type = TokenType.NOT_EQUAL;
        value = "!=";
      } else if (this.currentChar == ">" && this.peek() == "=") {
        this.advanceCurrentChar();
        this.advanceCurrentChar();
        type = TokenType.GREATER_THAN_OR_EQUAL;
        value = ">=";
      } else if (this.currentChar == "<" && this.peek() == "=") {
        this.advanceCurrentChar();
        this.advanceCurrentChar();
        type = TokenType.LESS_THAN_OR_EQUAL;
        value = "<=";
      } else if (this.currentChar == ">") {
        this.advanceCurrentChar();
        type = TokenType.GREATER_THAN;
      } else if (this.currentChar == "<") {
        this.advanceCurrentChar();
        type = TokenType.LESS_THAN;
      } else if (this.currentChar == "=") {
        this.advanceCurrentChar();
        type = TokenType.ASSIGN;
      } else if (this.currentChar == ";") {
        this.advanceCurrentChar();
        type = TokenType.SEMI;
      } else if (this.currentChar == ".") {
        this.advanceCurrentChar();
        type = TokenType.DOT;
      } else if (this.currentChar == ":") {
        this.advanceCurrentChar();
        type = TokenType.COLON;
      } else if (this.currentChar == ",") {
        this.advanceCurrentChar();
        type = TokenType.COMMA;
      } else if (this.currentChar == "/" && this.peek() == "#") {
        this.advanceCurrentChar();
        this.advanceCurrentChar();
        type = TokenType.INTEGER_DIV;
        value = "/#";
      } else if (this.currentChar == "/") {
        this.advanceCurrentChar();
        type = TokenType.REAL_DIV;
      } else {
        return this.takeOperator();
      }
      return new Token(type, value, lineno, column);
    }

    return new Token(TokenType.EOF, null, this.lineno, this.column);
  }

  public getCurrentChar() {
    return this.currentChar;
  }
}
