import { start } from "repl";
import IRender from "../IRender";
import { identate } from "../Identation";

export default class MadeBacklog implements IRender{
    private header: string;
    private nome: string;
    private startdate: string;
    private duedate: string;
    private descricao: string;

    public render(identationStartLevel : number = 1): string {
        let startdate = `${identate(identationStartLevel)}${this.renderStartDate()}`
        let duedate = `${identate(identationStartLevel)}${this.renderDueDate()}`;
        let header = `${identate(identationStartLevel)}${this.renderHeader()}`
        let nome = `${identate(identationStartLevel)}${this.renderName()}`
        let descricao = `${identate(identationStartLevel)}${this.renderDescription()}`
    
        
    return `${header} {
        ${nome}
        ${descricao}
        ${startdate}
        ${duedate}
        }
        `
    }
        
    public constructor(startdate: string, duedate:string, header: string, nome: string, descricao: string){
        this.startdate= startdate;
        this.duedate = duedate;
        this.header = header;
        this.nome = nome;
        this.descricao = descricao;
    }
    
    private renderStartDate()
    {
        return `startDate: ${this.startdate}`;
    }

    private renderHeader(): string {
        return `project ${this.header}`;
    }

    private renderDueDate(): string {
        return `duedate: ${this.duedate}`;
    }

    private renderName(): string
    {
        return `name: ${this.nome}`;
    }

    private renderDescription():string{
        return `description: ${this.descricao}"`;
    }

}