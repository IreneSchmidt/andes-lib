import IRender from "../IRender";
import { identate } from "../Identation";


export default class MadeDiagramModel implements IRender
{
    private storys: IRender[];
        
    public render(identationStartLevel : number = 0): string {
        let story = `${this.renderStorys(identationStartLevel+1)}`
        let header = `${identate(identationStartLevel)}${this.renderHeader()}`
        let nome = `${identate(identationStartLevel+1)}${this.renderName()}`
        let descricao = `${this.renderDescription(identationStartLevel+1)}`
    
    return `${header} {
        ${nome}
        ${descricao}
        ${story}
        }
        `
    }
        
    public constructor(storys: IRender[] = [], header: string, nome: string, descricao: string){
        this.storys= storys;
    }
    
    private renderStorys(identationLevel: number)
    {
        return this.storys.map(story => story.render(identationLevel)).join("\n");
    }

    private renderHeader(): string {
        return `epic domaindiagram `;
    }

    private renderName(): string
    {
        return `name: "Create Problem Domain Modules"`;
    }

    private renderDescription(identationLevel:number):string{
        return `\n description: "Create Problem Domain Modules""`;
    }
}

