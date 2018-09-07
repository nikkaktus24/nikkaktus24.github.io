export default class Result {
  constructor(...args) {
    this.nickname = args[0];
    this.roundNumber = args[1];
    this.cash = args[2];
    this.min = args[3];
    this.sec = args[4];
    this.time = String(args[3]) + args[4];
  }
}
