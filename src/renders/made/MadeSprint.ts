import IRender from "../IRender";
import { identate } from "../Identation";
import MadeSprintBacklog from "./MadeSprintBacklog";

export default class MadeSprint implements IRender{
    private header: string;
    private nome: string;
    private descricao: string;
    private startDate: string;
    private endDate: string;
    private status: string;
    private sprintBacklog: MadeSprintBacklog;

    public constructor(header: string, nome: string, descricao: string, status: string, startDate:string,endDate:string, sprintBacklog: MadeSprintBacklog){
        
        this.header = header;
        this.nome = nome;
        this.descricao = descricao;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.sprintBacklog = sprintBacklog;
    }

    public render(identationStartLevel: number = 0): string {
        let declaration = `${identate(identationStartLevel)}${this.renderHeader()}`
        let name = `${identate(identationStartLevel+1)}${this.renderName()}`
        let description = `${identate(identationStartLevel+1)}${this.renderDescription()}`
        let startDate = `${identate(identationStartLevel+1)}${this.renderStartDate()}`
        let endDate = `${identate(identationStartLevel+1)}${this.renderEndDate()}`
        let status = `${identate(identationStartLevel+1)}${this.renderStatus()}`
        let sprintBacklog = `${identate(identationStartLevel+1)}${this.renderSprintBacklog()}`
        

        return ` ${declaration} {
            ${name}
            ${description}
            ${startDate}
            ${endDate}
            ${status}

            ${sprintBacklog}
        }`
    }

    private renderHeader():string{
        return `sprint ${this.header}`;
    }

    private renderName():string{
        return `name: "${this.nome}"`;
    }

    private renderDescription():string{
        return `description: "${this.descricao}"`;
    }

    private renderStartDate():string{
        return `startDate: "${this.startDate}"`;
    }

    private renderEndDate():string{
        return `endDate: "${this.endDate}"`;
    }

    private renderStatus():string{
        return `status: ${this.status}`
    }

    private renderSprintBacklog():string{
        return `${this.sprintBacklog.render()}`
    }
}