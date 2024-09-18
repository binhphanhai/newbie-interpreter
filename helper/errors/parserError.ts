import Token from "../token";
import BaseError, { ErrorCode } from "./baseError";

export class ParserError extends BaseError {
  constructor(errorCode: ErrorCode, token: Token, message: string) {
    super(message, "Lỗi Parser", errorCode, token);
  }
}
