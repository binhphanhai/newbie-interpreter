import AST from "../abstractSyntaxTree/ast";

export default class NodeVisitor {
  public visit(node: AST): any {
    const nodeType = node.constructor.name;
    const method = `this.visit${nodeType}(node)`;
    eval(method);
  }
}
