import ts from "typescript";
import { IPluginConfig } from "./IPluginConfig";

export interface IProject {
    program: ts.Program;
    compilerOptions: ts.CompilerOptions;
    checker: ts.TypeChecker;
    printer: ts.Printer;
    config: IPluginConfig;
}