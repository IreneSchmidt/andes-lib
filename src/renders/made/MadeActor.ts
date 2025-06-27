import IRender from "../IRender";
import { identate } from "../Identation";

export default class MadeActor implements IRender{
    private header: string;
    private nome: string;
    private contato: string;
    
    public constructor(header: string, nome: string, contato: string){
        this.header = header;
        this.nome = nome;
        this.contato = contato;
    }

    public render(identationStartLevel: number = 0): string {
            let declaration = `${identate(identationStartLevel)}${this.renderHeader()}`
            let name = `${identate(identationStartLevel+1)}${this.renderName()}`
            let contact = `${identate(identationStartLevel+1)}${this.renderEmail()}`
            return ` ${declaration} {
            ${name}
            ${contact}
            }`;
        }

    private renderHeader():string{
        return `teammember ${this.header}`;
    }

    private renderName():string{
        return `name: "${this.nome}"`;
    }


    private renderEmail():string{
        return `email: "${this.contato}"`;
    }
}