import { Module } from "../../model/models";
import { identate } from "../Identation";
import IRender from "../IRender";
import SparkEntity from "./SparkEntity";
import SparkEnumEntity from "./SparkEnumEntity";


export default class SparkModule implements IRender
{
    private name: string;
    private description: string;
    private entityes: (SparkEntity | SparkEnumEntity)[];
    private modules: SparkModule[];

    public constructor(baseModule: Module)
    {
        this.name = baseModule.name;
        this.description = baseModule.description;
        this.entityes = [];
        this.modules = baseModule.modules ? baseModule.modules.map(module => new SparkModule(module)) : [];

        baseModule.localEntityes.forEach(entity => this.entityes.push(new SparkEntity(entity)));
        baseModule.enumXs.forEach(enumX => this.entityes.push(new SparkEnumEntity(enumX)));
    }

    public render(identationStartLevel: number = 0): string
    {
        let declaration = `${identate(identationStartLevel)}module ${this.name}`;
        let docs = this.renderDocs(identationStartLevel);
        let elements = this.renderElements(identationStartLevel+1);

        return `\n${docs}${declaration} {${elements}\n${identate(identationStartLevel)}}`;
    }

    private renderDocs(identationLevel: number): string
    {
        return this.description ? `${identate(identationLevel)}// ${this.description}\n` : '';
    }

    private renderElements(identationLevel: number): string
    {
        let entityes = this.entityes.map(entity => entity.render(identationLevel)).join('\n');
        let subModules = this.modules.map(subModule => subModule.render(identationLevel)).join('\n');

        return `${subModules} ${entityes}`;
    }
}

