import { Attributes, SparkEntity } from "../../model/SparkModels";
import { identate } from "../Identation";
import IRender from "../IRender";


export default class SparkAttribute implements IRender
{
    private name: string;
    private type: string;
    private max: number | undefined;
    private min: number | undefined;
    private blank: string;
    private unique: string;

    public constructor(attr: Attributes)
    {
        this.name = attr.name;
        if((attr._type as SparkEntity).name == undefined)
            { this.type = attr._type as string; }
        else
            { this.type = (attr._type as SparkEntity).name; }
        this.blank = attr.blank ? "blank" : "";
        this.max = attr.max;
        this.min = attr.min;
        this.unique = attr.unique ? "unique" : "";
    }

    public render(identationStartLevel: number = 0): string
    {
        let docs = this.renderDescription(identationStartLevel);
        let modifiers = this.defineModifiers();
        let nameAndType = this.renderNameAndType();

        return `${docs}${identate(identationStartLevel)}${nameAndType} ${modifiers}`;    
    }

    protected getName(): string
    {
        return this.name;
    }

    protected getType(): string
    {
        return this.type;
    }

    protected renderNameAndType(): string
    {
        return `${this.name}: ${this.type}`;
    }

    private renderDescription(identationLevel: number): string
    {
        // return this.comment ? `${identate(identationLevel)}/*${this.comment}*/\n` : "";
        return ""; // comments not implemented yet
    }

    private defineModifiers(): string
    {
        return `${this.unique} ${this.blank} ${this.defineMax()} ${this.defineMin()}`;
    }

    private defineMin(): string
    {
        return this.min == undefined ? "" : `min: ${this.min}`;
    }

    private defineMax(): string
    {
        return this.max == undefined ? "" : `max: ${this.max}`;
    }
}

