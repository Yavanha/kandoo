export class BoardNotFoundException extends Error {
  constructor(message: string = "No active board found") {
    super(message);
    this.name = "BoardNotFoundException";
    Object.setPrototypeOf(this, BoardNotFoundException.prototype);
  }
}
