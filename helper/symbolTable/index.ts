import BuiltInTypeSymbol from "./builtInTypeSymbol";
import Symbol from "./symbol";

export default class SymbolTable {
  symbols: Map<string, Symbol>;
  scopeName: string;
  scopeLevel: number;
  parentScope: SymbolTable | null;

  constructor(
    scopeName: string,
    scopeLevel: number,
    parentScope: SymbolTable | null = null
  ) {
    this.scopeName = scopeName;
    this.scopeLevel = scopeLevel;
    this.symbols = new Map<string, Symbol>();
    this.parentScope = parentScope;
    this.initBuiltInSymbol();
  }

  private initBuiltInSymbol() {
    this.insert(new BuiltInTypeSymbol("INTEGER"));
    this.insert(new BuiltInTypeSymbol("REAL"));
    this.insert(new BuiltInTypeSymbol("STRING"));
    this.insert(new BuiltInTypeSymbol("BOOL"));
  }

  public insert(symbol: Symbol) {
    this.symbols.set(symbol.name, symbol);
  }

  public lookup(
    name: string,
    isOnlyCurrentScope: boolean = false
  ): Symbol | undefined {
    if (this.symbols.has(name)) return this.symbols.get(name);
    else if (!isOnlyCurrentScope && this.parentScope !== null)
      return this.parentScope.lookup(name);
    else return undefined;
  }
}
