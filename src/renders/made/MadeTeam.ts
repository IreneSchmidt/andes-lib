import IRender from "../IRender";
import MadeActor from "./MadeActor";
import { identate } from "../Identation";

export default class MadeTeams implements IRender{
    private header: string;
    private nome: string;
    private descricao: string;
    private atores: MadeActor[];
    
    public constructor(header: string, nome: string, descricao: string, atores: MadeActor[]){
        this.header = header;
        this.nome = nome;
        this.descricao = descricao;
        this.atores = atores;
    }
    public render(identationStartLevel: number = 0): string {
        let declaration = `${identate(identationStartLevel)}${this.renderHeader()}`
        let name = `${identate(identationStartLevel)}${this.renderName()}`
        let description = `${identate(identationStartLevel)}${this.renderDescription()}`
        let actors = `${identate(identationStartLevel+1)}${this.renderActors}`
        
        return ` ${declaration} {
            ${name}
            ${description}
            ${actors}
        }`
    }

    private renderName():string{
        return `name: "${this.nome}"`;
    }

    private renderHeader():string{
        return `team ${this.header}`;
    }

    private renderDescription():string{
        return `description: "${this.descricao}"`;
    }

    private renderActors(identationLevel: number):string{
        return this.atores.map(actor => actor.render(identationLevel+1)).join('\n');
    }
}