import { identate } from "../Identation";
import IRender from "../IRender";
import MadeReleaseRender from "./MadeReleaseRender";


export default class MadeMileStoneRender implements IRender
{
    private identifier: string;
    private name: string;
    private description: string;
    private startDate: Date;
    private dueDate: Date;
    private status: string;
    private release: MadeReleaseRender

    public constructor(identifier: string, name: string, description: string, startDate: Date, dueDate: Date, status: string, release: MadeReleaseRender)
    {
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;
        this.release = release;
    }

    public render(identationStartLevel: number = 0): string
    {
        const id = this.renderIdentifier(identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);
        const dates = this.renderDates(identationStartLevel+1);
        const status = this.renderStatus(identationStartLevel+1);
        const release = this.release.render(identationStartLevel+1);

        return `${id} {\n${name}${description}\n${dates}\n${status}\n${release}\n${identate(identationStartLevel)}}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}milestone ${this.identifier}`;
    }

    private renderName(identation: number = 0): string
    {
        return `${identate(identation)}name: "${this.identifier}"`;
    }

    private renderDescription(identation: number = 0): string
    {
        if(!this.description)
            { return ""; }
        return `\n${identate(identation)}description: "${this.description}"`;
    }

        private renderStatus(identation: number = 0): string
    {
        return `${identate(identation)}status: ${this.status}`;
    }

    private renderDates(identation: number = 0): string
    {
        return `${identate(identation)}startDate: ${this.startDate.toISOString().split("T")[0]}\n${identate(identation)}dueDate: ${this.dueDate.toISOString().split("T")[0]}`;
    }
}

