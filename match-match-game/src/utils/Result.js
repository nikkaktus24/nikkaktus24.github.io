export default class Result {
  constructor(...args) {
    this.username = args[0] + "_" + args[1];
    this.email = args[2];
    this.score = String(args[3]) + args[4];
  }
}
