import ts from "typescript";
import { IProject } from "../IProject";

export namespace ToEnumTransformer {
    export function transform(
        project: IProject,
        modulo: ts.LeftHandSideExpression,
        expression: ts.CallExpression,
    ): ts.Expression {
        if (expression.arguments.length !== 0)
            throw new Error(ErrorMessages.TOO_MANY_ARGUMENTS);

        if (!expression.typeArguments)
            throw new Error(ErrorMessages.NO_TYPE_ARGUMENTS);

        if (expression.typeArguments.length !== 1)
            throw new Error(ErrorMessages.TOO_MANY_TYPE_ARGUMENTS);

        const type: ts.Type =
            project.checker.getTypeFromTypeNode(expression.typeArguments[0]);

        if (type.isUnionOrIntersection())
            throw new Error(ErrorMessages.INVALID_TYPE);

        return ts.factory.createObjectLiteralExpression(
            type.getProperties().map((property) => {
                const name = property.getName();
                const value: ts.Expression = ts.factory.createArrowFunction(
                    undefined,
                    undefined,
                    [ts.factory.createParameterDeclaration(
                        undefined,
                        undefined,
                        undefined,
                        "arg",
                        undefined,
                        undefined,
                        undefined,
                    )],
                    undefined,
                    undefined,
                    ts.factory.createBlock(
                        [ts.factory.createReturnStatement(
                            ts.factory.createObjectLiteralExpression(
                                [ts.factory.createPropertyAssignment(
                                    name,
                                    ts.factory.createIdentifier("arg"),
                                )],
                            ),
                        )],
                    ),
                );
                return ts.factory.createPropertyAssignment(name, value);
            }),
            true,
        );
    }
}

const enum ErrorMessages {
    TOO_MANY_ARGUMENTS = "Error on to_enum<T>(): Too many arguments",
    NO_TYPE_ARGUMENTS = "Error on to_enum<T>(): No type arguments",
    TOO_MANY_TYPE_ARGUMENTS = "Error on to_enum<T>(): Too many type arguments",
    INVALID_TYPE = "Error on to_enum<T>(): Invalid type",
}