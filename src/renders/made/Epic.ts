import { Actor, Requirements } from "../../model/models";
import { Event } from "../../model/madeModels";
import { identate } from "../Identation";
import IRender from "../IRender";
import MadeUserStory from "./MadeUserStory";


export class Epic implements IRender
{
    private depends: Array<Epic>;
    private description: string;
    private storys: IRender[];
    private id: string;
    private name: string;

    public constructor(actors: Array<Actor>, depends: Array<Epic>, description: string, events: Array<Event>, id: string, name: string, requirements: Array<Requirements>)
    {
        this.depends = depends;
        this.description = description;
        this.storys = events.map(event =>new MadeUserStory(event.identifier,event.name,event.description,event.depends.map(dep => dep.identifier).join(', '))
);

        this.id = id;
        this.name = name;
    }

    public render(identationStartLevel: number = 0): string
    {
        let declaration = `${identate(identationStartLevel)}epic ${this.id}`;
        let name = `${identate(identationStartLevel + 1)}${this.name}`;
        let description = `${this.renderDescription(identationStartLevel + 1)}`;
        let dependencies = `${this.renderDependency(identationStartLevel + 1)}`;
        let events = `${this.renderEvents(identationStartLevel+1)}`

        return `${declaration} {
        ${name}
        ${description}
        ${dependencies}
        ${events}
        }
        `;
    }

    private renderDescription(identationLevel: number): string
    {
        return `${identate(identationLevel)}description: "${this.description}"`;
    }

    private renderDependency(identationLevel: number): string
{
    if (!this.depends.length) {
        return `${identate(identationLevel)}depends: []`;
    }

    const ids = this.depends.map(dep => dep.id).join(', ');
    return `${identate(identationLevel)}depends: [${ids}]`;
}


    private renderEvents(identationLevel: number): string{
        return this.storys.map(storys => storys.render(identationLevel)).join("");
    }
}

