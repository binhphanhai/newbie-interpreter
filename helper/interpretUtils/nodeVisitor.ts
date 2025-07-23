import AST from "../abstractSyntaxTree/ast";

export default class NodeVisitor {
  public visit(node: AST): any {
    const nodeType = node.getType();
    const methodName = `visit${nodeType}`;

    // Use bracket notation instead of eval for minification safety
    const method = (this as any)[methodName];

    if (typeof method === "function") {
      return method.call(this, node);
    } else {
      throw new Error(`No visitor method found for node type: ${nodeType}`);
    }
  }
}
