import { identate } from "../Identation";
import IRender from "../IRender";
import { MadeEpicRender } from "./MadeBacklogItems";


export default class MadeBacklogRender implements IRender
{
    private identifier: string;
    private name: string;
    private description: string;
    private items: MadeEpicRender[];

    public constructor(identifier: string, name: string, description: string = "", epics: MadeEpicRender[] = [])
    {
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.items = epics;
    }

    public addEpic(item: MadeEpicRender)
    {
        this.items.push(item);
    }

    public render(identationStartLevel: number = 0): string
    {
        const id = this.renderIdentifier(identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);
        const items = this.renderItems(identationStartLevel+1);

        return `${id} {\n${name}${description}\n${items}\n${identate(identationStartLevel)}}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}backlog ${this.identifier}`;
    }

    private renderName(identation: number = 0): string
    {
        return `${identate(identation)}name: "${this.name}"`;
    }

    private renderDescription(identation: number = 0): string
    {
        if(!this.description)
            { return ""; }
        return `\n${identate(identation)}description: "${this.description}"`;
    }
    
    private renderItems(identation: number = 0): string
    {
        return this.items.map(i => i.render(identation)).join("\n");
    }
}

