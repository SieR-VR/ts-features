import ts from "typescript";

import { IProject } from "./IProject";
import { CallExpressionTransformer } from "./CallExpression";

export namespace NodeTransformer {
    export function transform(project: IProject, expression: ts.Node): ts.Node {
        if (ts.isCallExpression(expression)) {
            return CallExpressionTransformer.transform(project, expression);
        }

        return expression;
    }
}