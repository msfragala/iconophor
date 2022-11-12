export class Exception extends Error {
  status: number;
  statusText: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.statusText = message;
  }
}
