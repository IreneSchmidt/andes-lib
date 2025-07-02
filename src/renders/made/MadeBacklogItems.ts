import { identate } from "../Identation";
import IRender from "../IRender";


export abstract class MadeBacklogItem implements IRender
{
    protected identifier: string;
    protected name: string;

    public constructor(identifier: string, name: string)
    {
        this.identifier = identifier;
        this.name = name;
    }

    public abstract render(identationStartLevel?: number): string;

    protected renderIdentifier(keyword: string, identation: number = 0): string
    {
        return `${identate(identation)}${keyword} ${this.identifier}`;
    }


    protected renderName(identation: number = 0): string
    {
        return `${identate(identation)}name: "${this.name}"`;
    }

    public accessIdentifier(): string
    {
        return this.identifier;
    }
}


export class MadeTaskRender extends MadeBacklogItem
{
    private deliverables: string[];
    private dependencie: string[]

    public constructor(identifier: string, name: string, deliverables: string[], dependencies: string[] = [])
    {
        super(identifier, name);
        this.deliverables = deliverables;
        this.dependencie = dependencies;
    }

    public addDeliverable(obj: string)
    {
        this.deliverables.push(obj);
    }

    public addDependencie(dpd: string)
    {
        this.dependencie.push(dpd);
    }

    public render(identationStartLevel: number = 0): string
    {
        const decl = this.renderIdentifier("task", identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const dependencies = this.renderDependencie(identationStartLevel+1);
        const deliverables = this.renderDeliverables(identationStartLevel+1);

        return `${decl} {\n${name}\n${dependencies}\n${deliverables}\n${identate(identationStartLevel)}}`;
    }

    private renderDependencie(identation: number = 0): string
    {
        return `${identate(identation)}depends: ${this.dependencie.join(',')}`;
    }

    private renderDeliverables(identation: number = 0): string
    {
        return `${identate(identation)}Deliverables: ${this.deliverables.map(d=>`"${d}"`).join(', ')}`;
    }

    public equalsTo(other: MadeTaskRender): boolean
    {
        return this.identifier == other.identifier;
    }
}


export class MadeStoryRender extends MadeBacklogItem
{
    private criterios: string[];
    private observation: string;
    protected items: IRender[];

    public constructor(identifier: string, name: string, obs: string = "", criteria: string[] = [], items: MadeTaskRender[])
    {
        super(identifier, name);
        this.observation = obs;
        this.criterios = criteria;
        this.items = items;
    }

    public render(identationStartLevel: number = 0): string
    {
        const decl = this.renderIdentifier("story", identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const criteria = this.renderCriterios(identationStartLevel+1);
        const obs = this.renderObs(identationStartLevel+1);
        const items = this.renderItems(identationStartLevel+1);

        return `${decl} {\n${name}${criteria}${obs}\n${items}}`;
    }

    public add(item: MadeTaskRender)
    {
        this.items.push(item);
    }

    protected renderCriterios(identation: number = 0): string
    {
        if(this.criterios.length == 0)
            { return ""; }
        return `\n${identate(identation)}Criterions: ${this.criterios.map(c=>`"${c}"`).join(', ')}`;
    }

    protected renderObs(identation: number = 0): string
    {
        if(!this.observation)
            { return ""; }
        return `\n${identate(identation)}observation: "${this.observation}"`;
    }

    protected renderItems(identation: number = 0): string
    {
        return this.items.map(i => i.render(identation)).join("\n");
    }

    public getItems(): IRender[]
    {
        return this.items;
    }
}


export class MadeEpicRender extends MadeStoryRender
{
    private description: string;

    public constructor(identifier: string, name: string, obs: string = "", criteria: string[] = [], items: MadeStoryRender[] = [], description: string = "")
    {
        super(identifier, name, obs, criteria, []);
        this.items = items;
        this.description = description;
    }

    override render(identationStartLevel: number = 0): string
    {
        const decl = this.renderIdentifier("epic", identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const criteria = this.renderCriterios(identationStartLevel+1);
        const obs = this.renderObs(identationStartLevel+1);
        const items = this.renderItems(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);

        return `${decl} {\n${name}${description}${criteria}${obs}\n${items}}`;
    }

    public addStory(story: MadeStoryRender)
    {
        this.items.push(story);
    }

    private renderDescription(identation: number = 0): string
    {
        if(!this.description)
            { return ""; }
        return `${identate(identation)}description: "${this.description}"`;
    }

    public findTaskReference(task: MadeTaskRender): string
    {
        for(let story of this.items)
        {
            if(story instanceof MadeStoryRender)
            {
                for(let _task of story.getItems())
                {
                    if(_task instanceof MadeTaskRender)
                    {
                        if(_task.equalsTo(task))
                        {
                            // Found the task
                            return `${this.identifier}.${story.accessIdentifier()}.${_task.accessIdentifier()}`;
                        }
                    }
                }
            }
        }

        return "";
    }
}

