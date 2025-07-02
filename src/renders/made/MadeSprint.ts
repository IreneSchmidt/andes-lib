import { identate } from "../Identation";
import IRender from "../IRender";


export class MadeSprintItemRender implements IRender
{
    private reference: string;
    private memberDo: string;
    private doDate: Date;
    private status: string;

    public constructor(reference: string, memberDo: string, doDate: Date, status: string)
    {
        this.reference = reference;
        this.memberDo = memberDo;
        this.doDate = doDate;
        this.status = status;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}item ${this.reference} {assignee: ${this.memberDo} dueDate: ${this.doDate} status: ${this.status}}`;
    }
}


export class MadeSprintBacklogRender implements IRender
{
    private name: string;
    private items: MadeSprintItemRender[];

    public constructor(name: string, items: MadeSprintItemRender[] = [])
    {
        this.name = name;
        this.items = items;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}sprintbacklog ${this.name} {\n${this.items.map(i=>i.render(identationStartLevel+1)).join('\n')}\n${identate(identationStartLevel)}}`
    }
}


export default class MadeSprintRender implements IRender
{
    private identifier: string;
    private name: string;
    private description: string; 
    private startDate: Date;
    private endDate: Date;
    private status: string;
    private backlogs: MadeSprintBacklogRender[];

    public constructor(identifier: string, name: string, description: string,  startDate: Date, endDate: Date, status: string, backlog: MadeSprintBacklogRender[] = [])
    {
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;

        this.backlogs = backlog;
    }

    public render(identationStartLevel: number = 0): string
    {
        const id = this.renderIdentifier(identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);
        const status = this.renderStatus(identationStartLevel+1);
        const dates = this.renderDates(identationStartLevel+1);
        const items = this.renderItems(identationStartLevel+1);

        return `${id} {\n${name}${description}\n${status}\n${dates}\n${items}\n${identate(identationStartLevel)}}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}sprint ${this.identifier}`;
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

    private renderStatus(identation: number = 0): string
    {
        return `${identate(identation)}status: ${this.status}`;
    }

    private renderDates(identation: number = 0): string
    {
        return `${identate(identation)}startDate: ${this.startDate.toISOString()}\n${identate(identation)}dueDate: ${this.endDate.toISOString()}`;
    }

    private renderItems(identation: number = 0): string
    {
        return `${this.backlogs.map(b=>b.render(identation)).join('\n')}`;
    }
}

