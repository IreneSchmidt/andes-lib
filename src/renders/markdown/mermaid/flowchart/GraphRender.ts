import { identate } from "../../../Identation";
import IRender from "../../../IRender";
import ParagraphRender from "../../ParagraphRender";
import Node from "./Node";


export default class GraphRender implements IRender
{
    private static numeration: number = 0;

    private name: string;
    private description: string;
    private author: string;
    private numeration: number;
    private nodes: Node[];

    public constructor(name: string, nodes: Node[], description: string = "", author: string = "Autoria Própria")
    {
        this.name = name;
        this.description = description;
        this.author = author;
        this.nodes = nodes;
        this.numeration = GraphRender.numeration;

        GraphRender.numeration++;
    }

    public render(identationStartLevel: number = 0): string
    {
        let description = (new ParagraphRender(`Grafo de Fluxo ${this.numeration}: ${this.description}`, "center")).render();
        let title = `--- title: ${this.name} ---`;
        let body = `flowchart LR\n${this.renderNodesName(1)}\n${this.renderNodeConnection(1)}`;
        let author = (new ParagraphRender(`Fonte: ${this.author}`)).render();

        return `${description}\n${title}\n${body}\n${author}`;    
    }

    public cycleGraph(): GraphRender | null
    {
        return null;
    }

    public addNode(node: Node)
    {
        this.nodes.push(node);
    }

    private renderNodesName(identationLevel: number = 0): string
    {
        return this.nodes.map(node => node.renderName(identationLevel)).join('\n');
    }

    private renderNodeConnection(identationLevel: number = 0): string
    {
        return this.nodes.map(node => node.renderConnections(identationLevel)).join('\n');
    }
}

