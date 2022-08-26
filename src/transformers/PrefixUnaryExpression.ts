import ts from "typescript";

import { IProject } from "./IProject";
import { PrefixUnaryOperatorTransformer } from "./features/PrefixUnaryOperator";

export namespace PrefixUnaryExpressionTransformer {
    export function transform(
        project: IProject,
        expression: ts.PrefixUnaryExpression,
    ): ts.Expression {
        return PrefixUnaryOperatorTransformer.transform(project, expression);
    }
}