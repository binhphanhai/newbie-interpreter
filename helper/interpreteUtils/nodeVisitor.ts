import AST from "../abstractSyntaxTree/ast";

export default class NodeVisitor {
  public visit(node: AST): any {
    const nodeType = node.getType();
    const method = `this.visit${nodeType}(node)`;
    eval(method);
  }
}
