class Result {
  constructor(args) {
    this.fname = args[0];
    this.lname = args[1];
    this.email = args[2];
    this.min = args[3];
    this.sec = args[4];
    this.time = String(args[3]) + String(args[4]);
  }
}
