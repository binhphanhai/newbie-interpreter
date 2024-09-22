export enum TokenType {
  // Constant Number
  INTEGER_CONST = "INTEGER_CONST",
  REAL_CONST = "REAL_CONST",
  STRING_CONST = "STRING_CONST",
  BOOL_CONST = "BOOL_CONST",
  // Types
  INTEGER = "INTEGER",
  REAL = "REAL",
  STRING = "STRING",
  BOOL = "BOOL",
  // Compare
  EQUAL = "EQUAL",
  NOT_EQUAL = "NOT_EQUAL",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
  // Operators
  PLUS = "PLUS",
  MINUS = "MINUS",
  MULTIPLE = "MULTIPLE",
  DIVIDE = "DIVIDE",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  INTEGER_DIV = "INTEGER_DIV",
  REAL_DIV = "REAL_DIV",
  INTEGER_MOD = "INTEGER_MOD",
  // Reserved Keywords
  BEGIN = "BEGIN",
  END = "END",
  PROGRAM = "PROGRAM",
  VAR = "VAR",
  COMMA = "COMMA",
  COLON = "COLON",
  PROCEDURE = "PROCEDURE",
  RETURN = "RETURN",
  IF = "IF",
  ELSE = "ELSE",
  WHILE = "WHILE",
  // Others
  ID = "ID",
  ASSIGN = "ASSIGN",
  SEMI = "SEMI",
  DOT = "DOT",

  UNDEFINED = "UNDEFINED",
  EOF = "EOF",
}

/// Used to store tokens (type, value, position)
export class Token {
  private static listCompareOperator: TokenType[] = [];
  type: TokenType;
  value: string | null;
  lineno: number;
  column: number;

  constructor(
    type: TokenType,
    value: string | null,
    lineno: number = -1,
    column: number = -1
  ) {
    this.type = type;
    this.value = value;
    this.lineno = lineno;
    this.column = column;
  }

  showToken() {
    return `Token: ${this.type}, giá trị = ${this.value
      }, vị trí = ${this.lineno}:${this.column}`;
  }

  static addSampleCompareOperator() {
    Token.listCompareOperator.push(TokenType.EQUAL);
    Token.listCompareOperator.push(TokenType.NOT_EQUAL);
    Token.listCompareOperator.push(TokenType.GREATER_THAN);
    Token.listCompareOperator.push(TokenType.LESS_THAN);
    Token.listCompareOperator.push(TokenType.GREATER_THAN_OR_EQUAL);
    Token.listCompareOperator.push(TokenType.LESS_THAN_OR_EQUAL);
  }

  isCompareOperator() {
    return Token.listCompareOperator.includes(this.type);
  }
}

export default Token;
