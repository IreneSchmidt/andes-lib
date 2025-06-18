import IRender from "../IRender";
import ParagraphRender from "./ParagraphRender";
import SectionRender from "./SectionRender";


export default class FileRender implements IRender
{
    private name: string;
    private elements: IRender[];

    public constructor(name: string, elements: IRender[] = [])
    {
        this.name = name;
        this.elements = elements;
    }

    public render(identationStartLevel: number = 0): string
    {
        let metaData = this.renderMetaData(identationStartLevel);
        let elementsData = this.elements.map(element => element.render(0));

        return `${metaData}\n${elementsData}`;
    }

    public addSimpleSection(title: string, paragraphText: string)
    {
        this.elements.push(new SectionRender(title, [new ParagraphRender(paragraphText)]));
    }

    private renderMetaData(identationLevel: number): string
    {
        return `---\ntitle: ${this.name}\nsidebar_position${identationLevel}\n---`;
    }
}

