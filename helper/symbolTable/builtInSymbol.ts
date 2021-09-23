import Symbol from "./symbol";

export default class BuiltInTypeSymbol extends Symbol {
  constructor(name: string) {
    super(name);
  }

  public getName(): string {
    return this.name;
  }
}
