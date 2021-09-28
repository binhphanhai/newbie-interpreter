import Token from "../token";

export enum ErrorCode {
  UNEXPECTED_TOKEN,
  ID_NOT_FOUND,
  DUPLICATE_ID,
  NOT_FOUND_TYPE,
  DUPLICATE_PROCEDURE,

  UNSIGNED = 99,
}

export const MAP_ERROR_CODE = {
  [ErrorCode.UNEXPECTED_TOKEN]: "UNEXPECTED_TOKEN",
  [ErrorCode.ID_NOT_FOUND]: "ID_NOT_FOUND",
  [ErrorCode.DUPLICATE_ID]: "DUPLICATE_ID",
  [ErrorCode.NOT_FOUND_TYPE]: "NOT_FOUND_TYPE",
  [ErrorCode.DUPLICATE_PROCEDURE]: "DUPLICATE_PROCEDURE",
  [ErrorCode.UNSIGNED]: "UNSIGNED",
};

export default class BaseError {
  errorCode: ErrorCode;
  token: Token | null;
  message: string;

  constructor(
    message: string = "",
    errorType: string = "Error",
    errorCode: ErrorCode = ErrorCode.UNSIGNED,
    token: Token | null = null
  ) {
    this.errorCode = errorCode;
    this.token = token;
    this.message = `${errorType}: ${message}`;
  }

  public showError() {
    throw new Error(this.message);
  }
}
