import IRender from "../IRender";


export default class ParagraphRender implements IRender
{
    private content: string;

    public constructor(content: string)
    {
        this.content = content;
    }

    public render(identationStartLevel?: number): string
    {
        return this.content;    
    }
}

