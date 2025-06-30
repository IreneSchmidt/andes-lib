import { identate } from "../Identation";
import IRender from "../IRender";
import MadeMileStoneRender from "./MadeMilestoneRender";


export default class MadeRoadmapRender implements IRender
{
    private identifier: string;
    private name: string;
    private description: string;
    private milestone: MadeMileStoneRender;

    public constructor(identifier: string, name: string, description: string, milestone: MadeMileStoneRender)
    {
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.milestone = milestone;
    }

    public render(identationStartLevel: number = 0): string
    {
        const id = this.renderIdentifier(identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);
        const milestone = this.milestone.render(identationStartLevel+1);

        return `${id} {\n${name}${description}\n${milestone}\n${identate(identationStartLevel)}}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}roadmap ${this.identifier}`;
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
}

