import { identate } from "../Identation";
import IRender from "../IRender";
import MadeTeamMemberRender from "./MadeTeamMemberRender";


export default class MadeTeamRender implements IRender
{
    private identifier: string;
    private name: string;
    private description: string;
    private members: MadeTeamMemberRender[];
    
    public constructor(identifier: string, name: string, description: string = "", members: MadeTeamMemberRender[] = [])
    {
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.members = members;
    }

    public render(identationStartLevel: number = 0): string
    {
        const identifier = this.renderIdentifier(identationStartLevel);
        const descrip = this.renderDescription(identationStartLevel+1);
        const name = this.renderName(identationStartLevel+1);
        const members = this.renderTeamsMembers(identationStartLevel+1);

        return `${identifier}{\n${name}\n${descrip}\n${members}}`;
    }

    private renderIdentifier(identation: number): string
    {
        return `${identate(identation)}team ${this.identifier}`;
    }

    private renderName(identation: number): string
    {
        return `${identate(identation)}name: ${this.name}`;
    }

    private renderDescription(identation: number): string
    {
        return `${identate(identation)}description: ${this.description}`;
    }

    private renderTeamsMembers(identation: number): string
    {
        return `${identate(identation)}${this.members.map(m => m.render(identation)).join(`\n${identate(identation)}`)}`;
    }
}

