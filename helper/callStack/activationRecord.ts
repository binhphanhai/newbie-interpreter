export enum ARType {
  PROGRAM = 0,
  PROCEDURE = 1,
}

export default class ActivationRecord {
  name: string;
  type: ARType;
  level: number;
  parentScope: ActivationRecord | null;
  members: Map<string, any>;
  builtInProcs: Map<string, string>;

  constructor(
    name: string,
    type: ARType,
    level: number,
    parentScope: ActivationRecord | null = null
  ) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.parentScope = parentScope;
    this.members = new Map<string, any>();
    this.builtInProcs = new Map<string, string>();
    this.initBuiltInProcs();
  }

  private initBuiltInProcs() {
    this.members.set("print", "visitPrint");
    this.builtInProcs.set("print", "visitPrint");
  }

  public getItem(key: string): any {
    if (this.members.has(key)) return this.members.get(key);
    else if (this.parentScope !== null) return this.parentScope.getItem(key);
    else return null;
  }

  public setItem(key: string, value: any) {
    this.members.set(key, value);
  }
}
