import IRender from "../IRender";
import { identate } from "../Identation";


export default class MadeTeamMemberRender implements IRender
{
    private identifier: string;
    private name: string;
    private email: string;
    private discord: string;
    
    public constructor(identifier: string, name: string, email: string = "", discord: string = "")
    {
        this.identifier = identifier;
        this.name = name;
        this.email = email;
        this.discord = discord;
    }

    public render(identationStartLevel: number = 0): string
    {
        const identifier = this.renderIdentifier();
        const name = this.renderName();
        const email = this.renderEmail();
        const discord = this.renderDiscord();

        return `${identate(identationStartLevel)}${identifier} {${name}${email}${discord}}`;
    }

    private renderIdentifier(): string
    {
        return `teammember ${this.identifier}`;
    }

    private renderName(): string
    {
        return `name: "${this.name}"`;
    }


    private renderEmail(): string
    {
        return this.email ? ` email: "${this.email}"` : "";
    }

    private renderDiscord(): string
    {
        return this.discord ? ` discord: "${this.discord}"` : "";
    }
}

