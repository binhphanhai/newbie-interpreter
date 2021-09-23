import Token from "../token";
import BaseError, { ErrorCode } from "./baseError";

export class SemanticError extends BaseError {
  constructor(errorCode: ErrorCode, token: Token, message: string) {
    super(message, "SemanticError", errorCode, token);
  }
}
