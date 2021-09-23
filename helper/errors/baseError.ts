import Token from "../token";

export enum ErrorCode {
  UNEXPECTED_TOKEN = 0,
  ID_NOT_FOUND = 1,
  DUPLICATE_ID = 2,

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
