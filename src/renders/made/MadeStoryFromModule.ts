import { identate } from "../Identation";
import IRender from "../IRender";
import MadeTask from "./MadeTask";

export default class MadeStoryFromModule implements IRender{
    private tasks: MadeTask[];
    private id: string;
    private nome: string;
    private descricao: string;

    public constructor(xtasks: MadeTask[] = [], id: string, nome: string, descricao: string){
        this.tasks=xtasks;
        this.id = id;
        this.nome = nome;
        this.descricao = descricao; 
    }

    public render(identationStartLevel: number = 0): string {
        let descricao = `${this.renderDescription(identationStartLevel+1)}`
        let tarefas = `${identate(identationStartLevel+1)}${this.renderTasks}`
        let nome = `${identate(identationStartLevel+1)}${this.renderName()}`
        let declaration = `${identate(identationStartLevel)}${this.renderDeclaration()}`
        return `${declaration}
        ${nome}
        ${descricao}
        ${tarefas}`
    }

    private renderTasks(identationLevel: number):string{
        return this.tasks.map(task => task.render(identationLevel+1)).join('\n');
    }

    private renderDeclaration():string{
        return `story ${this.id}`;
    }
    private renderName():string{
        return `name: "${this.nome}"`;
    }

    private renderDescription(identationLevel:number):string{
        return `\n ${identate(identationLevel)}description: "${this.descricao}"`;
    }
}

