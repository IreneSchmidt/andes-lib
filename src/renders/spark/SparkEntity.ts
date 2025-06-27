import { Entity } from "../../model/SparkModels";
import { identate } from "../Identation";
import IRender from "../IRender";
import SparkAttribute from "./SparkAttribute";
import SparkEnumAttribute from "./SparkEnumAttribute";


export default class SparkEntity implements IRender
{
    private description: string;
    private name: string;
    private attributes: SparkAttribute[];
    private enums: SparkEnumAttribute[];

    public constructor(entity: Entity)
    {
        this.description = ""; // Not implemented yet
        this.name = entity.name;
        this.attributes = entity.attributes.map(attr => new SparkAttribute(attr));
        this.enums = entity.enumAttributes.map(attr => new SparkEnumAttribute(attr));
    }

    public render(identationStartLevel: number = 0): string
    {
        let docs = this.renderDocs(identationStartLevel);
        let entity = this.renderName(identationStartLevel);
        let attributes = this.renderAttributes(identationStartLevel+1);
        let enumsattrs = this.renderEnumAttributes(identationStartLevel+1);
        return `\n${docs}${entity} {\n${attributes}\n${enumsattrs}\n${identate(identationStartLevel)}}`;
    }

    private renderDocs(identationLevel: number): string
    {
        return this.description ? `${identate(identationLevel)}// ${this.description}\n` : '';
    }

    private renderName(identationLevel: number): string
    {
        return `${identate(identationLevel)}entity ${this.name}`;
    }

    private renderAttributes(identationLevel: number): string
    {
        return this.attributes.map(attr => attr.render(identationLevel)).join("\n");
    }

    private renderEnumAttributes(identationLevel: number): string
    {
        return this.enums.map(attr => attr.render(identationLevel)).join("\n");
    }
}

