import ts from "typescript";

import { IProject } from "./transformers/IProject";
import { IPluginConfig } from "./transformers/IPluginConfig";
import { FileTransformer } from "./transformers/FileTransformer";

export default function transform(
    program: ts.Program,
    config: IPluginConfig,
): ts.TransformerFactory<ts.SourceFile> {
    const project: IProject = {
        program,
        compilerOptions: program.getCompilerOptions(),
        checker: program.getTypeChecker(),
        printer: ts.createPrinter(),
        config,
    };

    return (context) => (file) => {
        const source = FileTransformer.transform(project, context, file);
        return source;
    }
}