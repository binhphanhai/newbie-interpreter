import Token from "../token";

export enum ErrorCode {
  UNEXPECTED_TOKEN,
  ID_NOT_FOUND,
  DUPLICATE_ID,
  NOT_FOUND_TYPE,
  DUPLICATE_PROCEDURE,

  UNSIGNED = 99,
}

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
