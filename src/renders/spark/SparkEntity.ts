import { Entity, LocalEntity } from "../../model/models";
import { identate } from "../Identation";
import IRender from "../IRender";
import SparkAttribute from "./SparkAttribute";


export default class SparkEntity implements IRender
{
    private description: string;
    private name: string;
    private attributes: SparkAttribute[];

    public constructor(baseEntity: LocalEntity)
    {
        this.description = baseEntity.comment;
        this.name = baseEntity.name;
        this.attributes = baseEntity.attributes.map(attr => new SparkAttribute(attr));
    }

    public render(identationStartLevel: number = 0): string
    {
        let docs = this.renderDocs(identationStartLevel);
        let entity = this.renderName();
        let attributes = this.renderAttributes(identationStartLevel+1);
        return `${docs}${entity} {${attributes}}`;
    }

    private renderDocs(identationLevel: number): string
    {
        return this.description ? `${identate(identationLevel)}// ${this.description}\n` : '';
    }

    private renderName(): string
    {
        return `entity ${this.name}`;
    }

    private renderAttributes(identationLevel: number): string
    {
        return this.attributes.map(attr => attr.render(identationLevel+1)).join("\n");
    }
}

