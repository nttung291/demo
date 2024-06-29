export class GenericError extends Error {
  private code: number;
  private errMessage: string;
  private extra?: { [key: string]: any };

  constructor(message: string, code: number, extra?: { [key: string]: any }) {
    super(message);
    this.code = code;
    this.extra = extra;
    this.errMessage = message;
  }
}