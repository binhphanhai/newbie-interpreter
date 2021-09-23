import ActivationRecord from "./activationRecord";

export default class CallStack {
  records: ActivationRecord[];

  constructor() {
    this.records = [];
  }

  public push(ar: ActivationRecord) {
    this.records.push(ar);
  }

  public pop(): ActivationRecord | undefined {
    return this.records.pop();
  }

  public peek(): ActivationRecord | undefined {
    return this.records.length > 0
      ? this.records[this.records.length - 1]
      : undefined;
  }
}
