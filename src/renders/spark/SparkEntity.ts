import { SparkEntity } from "../../model/sparkModels";
import { identate } from "../Identation";
import IRender from "../IRender";
import SparkAttribute from "./SparkAttribute";
import SparkEnumAttribute from "./SparkEnumAttribute";


export class SparkRelationshipRender implements IRender
{
    private self: string;
    private destination: string;
    private relationType: string;

    public constructor(self: string, destination: SparkEntityRender | SparkEntity, relationType: string)
    {
        this.self = self;
        if(destination instanceof SparkEntityRender)
            { this.destination = destination.toString(); }
        else
            { this.destination = destination.name; }
        this.relationType = relationType;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `\n${identate(identationStartLevel)}${this.self} ${this.relationType} ${this.destination}`;
    }
}


export default class SparkEntityRender implements IRender
{
    private description: string;
    private name: string;
    private attributes: SparkAttribute[];
    private enums: SparkEnumAttribute[];
    private relations: SparkRelationshipRender[]

    public constructor(entity: SparkEntity)
    {
        this.description = ""; // Not implemented yet
        this.name = entity.name;
        this.attributes = entity.attributes.map(attr => new SparkAttribute(attr));
        this.enums = entity.enumAttributes.map(attr => new SparkEnumAttribute(attr));
        this.relations = entity.relashionShips.map(r => new SparkRelationshipRender(entity.name, r.relationDestination, r._relationType))
    }

    public render(identationStartLevel: number = 0): string
    {
        let docs = this.renderDocs(identationStartLevel);
        let entity = this.renderName(identationStartLevel);
        let attributes = this.renderAttributes(identationStartLevel+1);
        let enumsattrs = this.renderEnumAttributes(identationStartLevel+1);
        let relations = this.relations.map(r => r.render(identationStartLevel+1)).join('\n');

        return `\n${docs}${entity} {\n${attributes}\n${enumsattrs}\n${identate(identationStartLevel)}${relations}\n${identate(identationStartLevel)}}`;
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

    public toString(): string
    {
        return this.name;
    }
}

