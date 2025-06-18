import { Attribute } from "../../model/models";
import { identate } from "../Identation";
import IRender from "../IRender";


export default class SparkAttribute implements IRender
{
    private name: string;
    private type: string;
    private blank: string;
    private comment: string;
    private max: number;
    private min: number;
    private unique: string;

    public constructor(baseAttribute: Attribute)
    {
        this.name = baseAttribute.name;
        this.type = baseAttribute.type;
        this.blank = baseAttribute.blank ? "blank" : "";
        this.comment = baseAttribute.comment;
        this.max = baseAttribute.max;
        this.min = baseAttribute.min;
        this.unique = baseAttribute.unique ? "unique" : "";
    }

    public render(identationStartLevel: number = 0): string
    {
        let docs = this.renderDescription(identationStartLevel);
        let modifiers = this.defineModifiers();
        let nameAndType = this.renderNameAndType();

        return `${docs}${identate(identationStartLevel)}${modifiers} ${nameAndType}`;    
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
        return this.comment ? `${identate(identationLevel)}/*${this.comment}*/\n` : "";
    }

    private defineModifiers(): string
    {
        return `${this.unique} ${this.blank} ${this.defineMin()} ${this.defineMax()}`;
    }

    private defineMin(): string
    {
        let valueAsStr = this.min.toString();

        return isNaN(Number(valueAsStr)) ? "" : `min: ${this.min}`;
    }

    private defineMax(): string
    {
        let valueAsStr = this.max.toString();

        return isNaN(Number(valueAsStr)) ? "" : `max: ${this.min}`;
    }
}

