import AST from "../abstractSyntaxTree/ast";

export default class NodeVisitor {
  public Visit(node: AST): any {
    const nodeType = node.constructor.name;
    const method = `Visit${nodeType}(node)`;
    eval(method);
  }
}
