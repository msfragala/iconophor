export class Exception extends Error {
  statusCode: number;
  statusText: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = message;
  }
}
