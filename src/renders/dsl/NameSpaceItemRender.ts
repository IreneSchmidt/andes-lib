import { identate } from "../Identation";
import IRender from "../IRender";


export default abstract class NameSpaceItemRender implements IRender
{
    protected reference: string;

    public constructor(reference: string)
    {
        this.reference = reference;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `\n${identate(identationStartLevel)}${this.reference}: ${this.renderValue(identationStartLevel)}`;    
    }

    public abstract renderValue(identationStartLevel?: number): string
}


export class NameSpaceSimpleItemRender extends NameSpaceItemRender
{
    private value: string;

    public constructor(reference: string, value: string)
    {
        super(reference);
        this.value = value;
    }

    public renderValue(identationStartLevel: number = 0): string
    {
        return this.value;    
    }
}


export class NameSpaceSimpleStringItemRender extends NameSpaceSimpleItemRender
{
    override renderValue(identationStartLevel: number = 0): string
    {
        return `"${super.renderValue(identationStartLevel)}"`;    
    }
}

