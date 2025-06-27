import IRender from "../IRender";
import { identate } from "../Identation";

export default class MadeUserStory implements IRender{
    private header: string;
    private nome: string;
    private descricao: string;
    private dependencia: string;
    
    public constructor(header: string, nome: string, descricao: string, dependencia: string){
        this.header = header;
        this.nome = nome;
        this.descricao = descricao;
        this.dependencia = dependencia;
    }

    public render(identationStartLevel: number): string {
        let declaration = `${identate(identationStartLevel)}${this.renderHeader()}`
        let name = `${identate(identationStartLevel+1)}${this.renderName()}`
        let dependencies = `${identate(identationStartLevel+1)}${this.renderDependency(identationStartLevel)}`
        let description = `${identate(identationStartLevel+1)}${this.renderDescription(identationStartLevel)}`
        return ` ${declaration} {
            ${name}
            ${description}
            ${dependencies}
             }`;
    }

    private renderName():string{
        return `name: "${this.nome}"`;
    }

    private renderHeader():string{
        return `story ${this.header}`;
    }

    private renderDescription(identationLevel:number):string{
        return `description: "${this.descricao}"`;
    }
    
    private renderDependency(identationLevel:number):string{
        return `dependency: "${this.dependencia}"`;
    }
}