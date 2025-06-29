import { identate } from "../Identation";
import IRender from "../IRender";
import MadeStoryFromModule from "./MadeStoryFromModule";

export default class MadeTask implements IRender
{
    private story:MadeStoryFromModule
    private name: string;
    private id: string;
    private depends: string;

    public constructor(story: MadeStoryFromModule,name: string, id: string, depends: string = ''){
        this.story = story;
        this.name = name;
        this.id = id;
        this.depends = depends;
    }
    public render(identationStartLevel: number = 0): string {
        let declaration = `${identate(identationStartLevel)}${this.renderDeclaration()}`
        let name = `${identate(identationStartLevel+1)}${this.renderName()}`
        let dependencies = `${this.renderDependencies(identationStartLevel+1)}`
        return ` ${declaration} {
        ${name}
        ${dependencies}
        }`;
    }

    private renderDeclaration() : string{
        return `task ${this.id}`;
    }

    private renderName(): string{
        return `name: "${this.name}"`;
    }

    private renderDependencies(identationLevel: number):string {
        return this.depends ? `\n${identate(identationLevel)}depends: domaindiagram.createmodule${this.name.toLocaleLowerCase()}.createmodule` : '';
    }

    getStory(): MadeStoryFromModule {
        return this.story;
    }
    getId(): string {
        return this.id;
    }
}