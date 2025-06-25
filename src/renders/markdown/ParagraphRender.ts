import IRender from "../IRender";


type alignOptions = "left" | "right" | "center" | "justify" | "start" | "end" | "inherit" | "initial" | "unset";


export default class ParagraphRender implements IRender
{
    private content: string;
    private align: alignOptions;

    public constructor(content: string, align: alignOptions = "left")
    {
        this.content = content;
        this.align = align;
    }

    public render(identationStartLevel?: number): string
    {
        if(this.align == "left")
            { return this.content; }

        return `<div align="${this.align}">\n${this.content}\n</div>`;
    }
}

