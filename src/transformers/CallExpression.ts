import ts from "typescript";

import { ToEnumTransformer } from "./features/ToEnum";
import { IProject } from "./IProject";

export namespace CallExpressionTransformer {
    export function transform(
        project: IProject,
        expression: ts.CallExpression,
    ): ts.Expression {
        const declaration: ts.Declaration | undefined =
            project.checker.getResolvedSignature(expression)?.declaration;
        if (!declaration)
            return expression;

        const type = project.checker.getTypeAtLocation(declaration);
        if (!type || !type.symbol)
            return expression;

        const functor: (() => Task) | undefined = FUNCTORS[type.symbol.name];
        if (!functor) 
            return expression;

        return functor()(project, expression.expression, expression);
    }
}

type Task = (
    project: IProject,
    modulo: ts.LeftHandSideExpression,
    expression: ts.CallExpression,
) => ts.Expression;

const FUNCTORS: Record<string, () => Task> = {
    to_enum: () => ToEnumTransformer.transform,
};