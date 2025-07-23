export default class AST {
  public getType(): string {
    // Override this method in child classes to return a consistent type name
    // that won't be affected by minification
    return "AST";
  }
}
