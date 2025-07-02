import IRender from "../IRender";
import { identate } from "../Identation";


export default class MadeProjectRender implements IRender{
    private identifier: string;
    private nome: string;
    private startdate: string;
    private duedate: string;
    private descricao: string;

    public constructor(startdate: Date, duedate:Date, header: string, nome: string, descricao: string)
    {
        this.startdate= startdate.toISOString();
        this.duedate = duedate.toISOString();
        this.identifier = header;
        this.nome = nome;
        this.descricao = descricao;
    }

    public render(identationStartLevel: number = 0): string
    {
        const identifier = this.renderIdentifier(identationStartLevel);
        const name = this.renderName(identationStartLevel+1);
        const description = this.renderDescription(identationStartLevel+1);
        const startdate = this.renderStartDate(identationStartLevel+1);
        const duedate = this.renderDueDate(identationStartLevel+1);
        
        return `${identifier} {\n${name}${description}\n${startdate}\n${duedate}\n${identate(identationStartLevel)}}`;
    }
    
    private renderStartDate(identation: number = 0)
    {
        return `${identate(identation)}startDate: ${this.startdate}`;
    }

    private renderIdentifier(identation: number = 0): string
    {
        return `${identate(identation)}project ${this.identifier}`;
    }

    private renderDueDate(identation: number = 0): string
    {
        return `${identate(identation)}duedate: ${this.duedate}`;
    }

    private renderName(identation: number = 0): string
    {
        return `${identate(identation)}name: "${this.nome}"`;
    }

    private renderDescription(identation: number = 0): string
    {
        if(!this.descricao)
            { return ""; }
        return `\n${identate(identation)}description: "${this.descricao}"`;
    }
}

