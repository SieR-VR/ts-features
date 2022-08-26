import ts from "typescript";

import { IProject } from "./IProject";
import { BinaryOperatorTransformer } from "./features/BinaryOperator";

export namespace BinaryExpressionTransformer {
    export function transform(
        project: IProject,
        expression: ts.BinaryExpression,
    ): ts.Expression {
        return BinaryOperatorTransformer.transform(project, expression);
    }
}