export default class Symbol {
  name: string;
  type: Symbol | null;

  constructor(name: string, type: Symbol | null = null) {
    this.name = name;
    this.type = type;
  }
}
