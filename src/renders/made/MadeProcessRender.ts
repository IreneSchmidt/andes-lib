import { identate } from "../Identation";
import IRender from "../IRender";
import { MadeTaskRender } from "./MadeBacklogItems";



export class MadeActivityRender implements IRender
{
    private identifier: string;
    private name: string;
    private description: string;
    private tasks: MadeTaskRender[];

    public constructor(identifier: string, name: string, description: string, tasks: MadeTaskRender[] = [])
    {
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.tasks = tasks;
    }

    public render(identationStartLevel: number = 0): string
    {
        const id = this.renderIdentifier(identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);
        const tasks = this.renderTasks(identationStartLevel+1);

        return `${id} {\n${name}${description}\n${tasks}\n${identate(identationStartLevel)}}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}activity ${this.identifier}`;
    }

    private renderName(identation: number = 0): string
    {
        return `${identate(identation)}name ${this.name}`;
    }

    private renderDescription(identation: number = 0): string
    {
        if(!this.description)
            { return ''; }
        return `\n${identate(identation)}description ${this.description}`;
    }

    private renderTasks(identation: number = 0)
    {
        return `${this.tasks.map(t => t.render(identation)).join('\n')}`;
    }
}


export default class MadeProcessRender implements IRender
{
    private identifier: string;
    private name: string;
    private description: string;
    private activities: MadeActivityRender[];

    public constructor(identifier: string, name: string, descrition: string, activities: MadeActivityRender[] = [])
    {
        this.identifier = identifier;
        this.name = name;
        this.description = descrition;
        this.activities = activities;
    }

    public render(identationStartLevel: number = 0): string
    {
        const id = this.renderIdentifier(identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);
        const activties = this.renderActivities(identationStartLevel+1);

        return `${id} {\n${name}${description}\n${activties}\n${identate(identationStartLevel)}}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}process ${this.identifier}`;
    }

    private renderName(identation: number = 0): string
    {
        return `${identate(identation)}name ${this.name}`;
    }

    private renderDescription(identation: number = 0): string
    {
        if(!this.description)
            { return ''; }
        return `\n${identate(identation)}description ${this.description}`;
    }

    private renderActivities(identation: number = 0): string
    {
        return `${this.activities.map(a => a.render(identation)).join('\n')}`;
    }
}

