import IRender from "../IRender";
import { identate } from "../Identation";
import MadeBacklog from "./MadeBacklog";

export default class MadeEpic implements IRender{
    private backlog: MadeBacklog;
    private storys: IRender[];
    private header: string;
    private nome: string;
    private descricao: string;
    
    public render(identationStartLevel : number = 0): string {
        let story = `${this.renderStorys(identationStartLevel+1)}`
        let header = `${identate(identationStartLevel)}${this.renderHeader()}`
        let nome = `${identate(identationStartLevel+1)}${this.renderName()}`
        let descricao = `${this.renderDescription(identationStartLevel+1)}`

        return `${header}
        ${nome}
        ${descricao}
        ${story}
        `
    }
    
    public constructor(backlog: MadeBacklog, storys: IRender[] = [], header: string, nome: string, descricao: string){
            this.backlog = backlog;
            this.storys= storys;
            this.header = header;
            this.nome = nome;
            this.descricao = descricao; 
        }

    private renderStorys(identationLevel: number)
    {
        return this.storys.map(story => story.render(identationLevel)).join("\n ");
    }

    private renderHeader(): string {
        return `epic ${this.header}`;
    }

    private renderName(): string
    {
        return `name: ${this.nome}`;
    }

    private renderDescription(identationLevel:number):string{
        return `\n ${identate(identationLevel)}description: "${this.descricao}"`;
    }

    public getHeader(){
        return this.header;
    }
    public getBacklog(){
        return this.backlog;
    }
}