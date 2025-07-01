import { AttributeEnum } from "../../model/models";
import { Enumerate } from "../../model/SparkModels";
import { identate } from "../Identation";
import IRender from "../IRender";


class SparkEnumOption implements IRender
{
    private name: string;
    private description: string;


    public constructor(baseOption: string)
    {
        this.name = baseOption;
        this.description = ""; // not implemented yet baseOption.comment;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}${this.name} ${this.renderDescription()}`;
    }

    private renderDescription(): string
    {
        return this.description ? `/* ${this.description} */` : '';
    }
}


export default class SparkEnumEntity implements IRender
{
    private description: string;
    private name: string;
    private options: SparkEnumOption[];


    public constructor(baseEnum: Enumerate)
    {
        this.description = ""; // comment not implemented yet baseEnum.comment;
        this.name = baseEnum.name;
        this.options = baseEnum.options.map(attr => new SparkEnumOption(attr));
    }

    public render(identationStartLevel: number = 0): string
    {
        let docs = this.renderDocs(identationStartLevel);
        let entity = this.renderName(identationStartLevel);
        let attributes = this.renderOptions(identationStartLevel+1);
        return `\n${docs}${entity} {\n${attributes}\n${identate(identationStartLevel)}}`;
    }

    private renderDocs(identationLevel: number): string
    {
        return this.description ? `${identate(identationLevel)}// ${this.description}\n` : '';
    }

    private renderName(identationLevel: number): string
    {
        return `${identate(identationLevel)}enum ${this.name}`;
    }

    private renderOptions(identationLevel: number): string
    {
        return this.options.map(opt => opt.render(identationLevel).toUpperCase()).join("\n");
    }
}

