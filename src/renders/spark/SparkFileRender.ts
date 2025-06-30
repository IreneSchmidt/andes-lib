import { Module } from "../../model/models";
import { Overview, ProjectInterface } from "../../model/ProjectModels";
import { Package } from "../../model/sparkModels";
import IRender from "../IRender";
import SparkConfiguration from "./SparkConfiguration";
import SparkPackage from "./SparkPackage";


export default class SparkFileRender implements IRender
{
    private configuration: SparkConfiguration;
    private modules: SparkPackage[];

    public constructor(projectOverview: Overview, modules: Package[])
    {
        this.configuration = new SparkConfiguration(projectOverview.name, projectOverview.description, projectOverview.architecture);
        this.modules = modules.map(module => new SparkPackage(module));
    }

    public render(identationStartLevel: number = 0): string
    {
        let projectConfiguration = this.configuration.render(identationStartLevel);
        let projectClassDiagram = this.modules.map(module => module.render()).join('\n');
        
        return `${projectConfiguration}\n${projectClassDiagram}`;
    }
}

