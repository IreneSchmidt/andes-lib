import IRender from "../IRender";
import { identate } from "../Identation";

export default class MadeBacklog implements IRender{
    private epics: IRender[];
    private header: string;
    private nome: string;
    private descricao: string;

    public render(identationStartLevel : number = 0): string {
        let epic = `${this.renderEpics(identationStartLevel)}`
        let header = `${identate(identationStartLevel)}${this.renderHeader()}`
        let nome = `${identate(identationStartLevel)}${this.renderName()}`
        let descricao = `${this.renderDescription(identationStartLevel)}`
    
        
    return `${header} {
        ${nome}
        ${descricao}
        ${epic}
    }`
    }
        
    public constructor(epicos: IRender[] = [], header: string, nome: string, descricao: string){
        this.epics= epicos;
        this.header = header;
        this.nome = nome;
        this.descricao = descricao;
    }
    
    private renderEpics(identationLevel: number)
    {
        return `${this.epics.map(epic => epic.render(identationLevel)).join("")}`;
    }

    private renderHeader(): string {
        return `backlog ${this.header}`;
    }

    private renderName(): string
    {
        return `name: ${this.nome}`;
    }

    private renderDescription(identationLevel:number):string{
        return `description: ${this.descricao}"`;
    }
}