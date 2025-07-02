import { identate } from "../Identation";
import IRender from "../IRender";


export default class MadeReleaseRender implements IRender 
{
    private identifier: string;
    private description: string;
    private status: string;
    private startDate: Date;
    private dueDate: Date;
    private version: string;
    private items: string[];

    public constructor(identifier: string, description: string, status: string, startDate: Date, dueDate: Date, version: string, items: string[] = [])
    {
        this.identifier = identifier;
        this.description = description;
        this.status = status;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.version = version
        this.items = items;
    }

    public render(identationStartLevel: number = 0): string
    {
        const id = this.renderIdentifier(identationStartLevel);
        const description = this.renderDescription(identationStartLevel+1);
        const items = this.renderItem(identationStartLevel+1);
        const status = this.renderStatus(identationStartLevel+1);
        const dates = this.renderDates(identationStartLevel+1);
        const version = this.renderVersion(identationStartLevel+1);
        
        return `${id}{\n${description}\n${items}\n${status}\n${dates}\n${version}\n${identate(identationStartLevel)}}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}release ${this.identifier}`;
    }

    private renderDescription(identation: number = 0): string
    {
        return `${identate(identation)}description: "${this.description}"`;
    }

    private renderItem(identation: number = 0): string
    {
        return `${identate(identation)}item: ${this.items.join(', ')}`;
    }

    private renderStatus(identation: number = 0): string
    {
        return `${identate(identation)}status: ${this.status}`;
    }

    private renderDates(identation: number = 0): string
    {
        return `${identate(identation)}startDate: ${this.startDate.toISOString()}\n${identate(identation)}dueDate: ${this.dueDate.toISOString()}`;
    }

    private renderVersion(identation: number = 0): string
    {
        return `${identate(identation)}version: "${this.version}"`;
    }
}

