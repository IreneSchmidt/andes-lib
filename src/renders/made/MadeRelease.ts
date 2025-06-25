import IRender from "../IRender";
import { identate } from "../Identation";
import MadeEpic from "./MadeEpic";

export default class MadeRelease implements IRender{
    private header: string;
    private descricao: string;
    private item: MadeEpic[];
    private status: string;
    private dueDate: string;
    private version: string;
    
    public constructor(header: string, descricao: string, item: MadeEpic[], status: string, dueDate:string,version:string){
        this.header = header;
        this.descricao = descricao;
        this.item = item;
        this.status = status;
        this.dueDate = dueDate;
        this.version = version;
    }

    public render(identationStartLevel: number = 0): string {
        let declaration = `${identate(identationStartLevel)}${this.renderHeader()}`
        let description = `${identate(identationStartLevel)}${this.renderDescription()}`
        let items = `${identate(identationStartLevel+1)}${this.renderItems()}`
        let status = `${identate(identationStartLevel)}${this.renderStatus()}`
        let dueDate = `${identate(identationStartLevel)}${this.renderDueDate()}`
        let version = `${identate(identationStartLevel)}${this.renderVersion()}`

        return ` ${declaration} {
            ${description}
            ${items}
            ${status}
            ${dueDate}
            ${version}
        }`
    }

    private renderHeader():string{
        return `team ${this.header}`;
    }

    private renderDescription():string{
        return `description: "${this.descricao}"`;
    }

    private renderItems():string{
        const items = this.item
        .map(epic => `${epic.getBacklog()}.${epic.getHeader()}`)
        .join(',');

        return `item: ${items}`;
    }

    private renderStatus():string{
        return `status: ${this.status}`
    }

    private renderDueDate():string {
        return `dueDate: ${this.dueDate}`
    }

    private renderVersion():string{
        return `version: ${this.version}`
    }
}