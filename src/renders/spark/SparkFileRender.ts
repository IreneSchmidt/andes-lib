import { Module, Project } from "../../model/models";
import IRender from "../IRender";
import SparkConfiguration from "./SparkConfiguration";
import SparkModule from "./SparkModule";


export default class SparkFileRender implements IRender
{
    private configuration: SparkConfiguration;
    private modules: SparkModule[];

    public constructor(project: Project, modules: Module[])
    {
        this.configuration = new SparkConfiguration(project);
        this.modules = modules.map(module => new SparkModule(module));
    }

    public render(identationStartLevel: number = 0): string
    {
        let projectConfiguration = this.configuration.render(identationStartLevel);
        let projectClassDiagram = this.modules.map(module => module.render()).join('\n');
        
        return `${projectConfiguration}\n${projectClassDiagram}`;
    }
}

