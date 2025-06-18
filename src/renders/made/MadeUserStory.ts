import IRender from "../IRender";

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
    public render(identationStartLevel?: number): string {
        throw new Error("Method not implemented.");
    }

    private renderName():string{
        return `name: "${this.nome}"`;
    }

    private renderHeader():string{
        return `story ${this.header}`;
    }
}