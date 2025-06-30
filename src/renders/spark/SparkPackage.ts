import { Module } from "../../model/models";
import { Package } from "../../model/SparkModels";
import { identate } from "../Identation";
import IRender from "../IRender";
import SparkEntityRender from "./SparkEntity";
import SparkEnumEntity from "./SparkEnumEntity";


export default class SparkPackage implements IRender
{
    private name: string;
    private description: string;
    private entityes: (SparkEntityRender | SparkEnumEntity)[];
    private modules: SparkPackage[];

    public constructor(_package: Package)
    {
        this.name = _package.name;
        this.description = _package.description;
        this.entityes = [];
        this.modules = _package.subPackages.map(module => new SparkPackage(module));

        _package.entityes.forEach(entity => this.entityes.push(new SparkEntityRender(entity)));
        _package.enums.forEach(enumX => this.entityes.push(new SparkEnumEntity(enumX)));
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

