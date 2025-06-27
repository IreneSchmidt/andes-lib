import IRender from "../IRender";
import { identate } from "../Identation";

export default class MadeItem implements IRender{
    private header: string;
    private assignee: string;
    private startDate: string;
    private dueDate: string;
    private completedDate: string;
    private status: string;

    public constructor(header: string,  assignee: string, startDate: string, dueDate: string, completedDate: string, status: string){
        this.header = header;
        this.assignee = assignee;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.completedDate = completedDate;
        this.status = status;

    }

    public render(identationStartLevel: number = 0): string {
        let declaration = `${identate(identationStartLevel)}${this.renderHeader()}`
        let assignee = `${identate(identationStartLevel+1)}${this.renderAssignee()}`
        let startDate = `${identate(identationStartLevel+1)}${this.renderStartDate()}`
        let dueDate = `${identate(identationStartLevel+1)}${this.renderDueDate()}`
        let completedDate = `${identate(identationStartLevel+1)}${this.renderCompletedDate()}`
        let status = `${identate(identationStartLevel+1)}${this.renderStatus()}`
        

        return `${declaration} {
            ${assignee}
            ${startDate}
            ${dueDate}
            ${completedDate}
            ${status}
        }`
    }

    private renderHeader():string{
        return `item ${this.header}`;
    }

    private renderAssignee():string{
        return `assignee: "${this.assignee}"`;
    }

    private renderStartDate():string{
        return `startDate: "${this.startDate}"`;
    }

    private renderDueDate():string {
        return `dueDate: "${this.dueDate}"`;
    }

    private renderCompletedDate():string {
        return `completedDate: "${this.completedDate}"`;
    }

    private renderStatus():string{
        return `status: ${this.status}`
    }
}