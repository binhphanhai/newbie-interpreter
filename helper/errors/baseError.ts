import Token from "../token";

export enum ErrorCode {
  UNEXPECTED_TOKEN,
  ID_NOT_FOUND,
  PROCEDURE_NOT_FOUND,
  DUPLICATE_ID,
  NOT_FOUND_TYPE,
  DUPLICATE_PROCEDURE,

  UNSIGNED = 99,
}

export const MAP_ERROR_CODE = {
  [ErrorCode.UNEXPECTED_TOKEN]: "Cú pháp không đúng",
  [ErrorCode.ID_NOT_FOUND]: "Biến không tồn tại",
  [ErrorCode.PROCEDURE_NOT_FOUND]: "Hàm không tồn tại",
  [ErrorCode.DUPLICATE_ID]: "Biến đã được khai báo",
  [ErrorCode.DUPLICATE_PROCEDURE]: "Hàm đã được khai báo",
  [ErrorCode.NOT_FOUND_TYPE]: "Kiểu dữ liệu không đúng",
  [ErrorCode.UNSIGNED]: "Không xác định",
};

export default class BaseError {
  errorCode: ErrorCode;
  token: Token | null;
  message: string;

  constructor(
    message: string = "",
    errorType: string = "Lỗi",
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
