import Symbol from "./symbol";

export default class VarSymbol extends Symbol {
  constructor(name: string, type: Symbol) {
    super(name, type);
  }

  public getValue(): string {
    return `<${this.name}: ${this.type?.name}>`;
  }
}
