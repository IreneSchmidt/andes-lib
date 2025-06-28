import IRender from "../IRender";
import { identate } from "../Identation";

export default class MadeBacklog implements IRender{
    private header: string;
    private nome: string;
    private startdate: string;
    private duedate: string;
    private descricao: string;

    public render(identationStartLevel: number = 0): string {
        let startdate = `${identate(identationStartLevel+1)}${this.renderStartDate()}`
        let duedate = `${identate(identationStartLevel+1)}${this.renderDueDate()}`;
        let header = `${identate(identationStartLevel)}${this.renderHeader()}`
        let nome = `${identate(identationStartLevel+1)}${this.renderName()}`
        let descricao = `${identate(identationStartLevel+1)}${this.renderDescription()}`
    
        
    return `${header} {
        ${nome}
        ${descricao}
        ${startdate}
        ${duedate}
        }
        `
    }
        
    public constructor(startdate: Date, duedate:Date, header: string, nome: string, descricao: string){
        this.startdate= startdate.toDateString();
        this.duedate = duedate.toDateString();
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