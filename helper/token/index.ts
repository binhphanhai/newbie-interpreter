export enum TokenType {
  // Constant Number
  INTEGER_CONST = 10,
  REAL_CONST = 11,
  STRING_CONST = 12,
  BOOL_CONST = 13,
  // Types
  INTEGER = 20,
  REAL = 21,
  STRING = 22,
  BOOL = 23,
  // Compare
  EQUAL = 31,
  NOT_EQUAL = 32,
  GREATER_THAN = 33,
  LESS_THAN = 34,
  GREATER_THAN_OR_EQUAL = 35,
  LESS_THAN_OR_EQUAL = 36,
  // Operators
  PLUS = 61,
  MINUS = 62,
  MULTIPLE = 63,
  DIVIDE = 64,
  LPAREN = 65,
  RPAREN = 66,
  INTEGER_DIV = 67,
  REAL_DIV = 68,
  INTEGER_MOD = 69,
  // Reserved Keywords
  BEGIN = 71,
  END = 72,
  PROGRAM = 73,
  VAR = 74,
  COMMA = 75,
  COLON = 76,
  PROCEDURE = 77,
  RETURN = 78,
  IF = 79,
  ELSE = 80,
  WHILE = 81,
  // Others
  ID = 91,
  ASSIGN = 92,
  SEMI = 93,
  DOT = 94,

  UNDEFINED = 198,
  EOF = 199,
}

const MAP_TOKEN_TYPE: any = {};

for (const enumMember in TokenType) {
  const isValueProperty = parseInt(enumMember, 10) >= 0;
  if (isValueProperty) {
    MAP_TOKEN_TYPE[enumMember] = TokenType[enumMember];
  }
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
    return `Token: ${MAP_TOKEN_TYPE[this.type]}, value = ${
      this.value
    }, position = ${this.lineno}:${this.column}`;
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
