import BaseError from "./baseError";

export class LexerError extends BaseError {
  constructor(message: string) {
    super(message, "LexerError");
  }
}
