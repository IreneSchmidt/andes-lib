import { identate } from "../Identation";
import IRender from "../IRender";


export default class SectionRender implements IRender
{
    private title: string;
    private elements: IRender[];

    public constructor(title: string, elements: IRender[] = [])
    {
        this.title = title;
        this.elements = elements;
    }

    public render(identationStartLevel: number = 0): string
    {
        let title = this.renderTitle(identationStartLevel);
        let elements = this.elements.map(element => element.render(identationStartLevel+1)).join('\n');
        
        return `${title}\n${elements}`;
    }

    private renderTitle(identationLevel: number)
    {
        return `${identate(identationLevel)}${'#'.repeat(identationLevel)} ${this.title}`;
    }
}

