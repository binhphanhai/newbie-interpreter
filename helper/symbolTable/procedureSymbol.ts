import Symbol from "./symbol";
import VarSymbol from "./varSymbol";

export default class ProcedureSymbol extends Symbol {
  params: VarSymbol[];
  constructor(name: string, params: VarSymbol[] | null = null) {
    super(name);
    this.params = params !== null ? params : [];
  }

  public getName(): string {
    return this.name;
  }
}
