import { FunctionalRequirement } from "../../../../model/RequirimentsModels";
import GraphRender from "../../../../renders/markdown/mermaid/flowchart/GraphRender";
import { ConnectionTypes } from "../../../../renders/markdown/mermaid/flowchart/MultiEdgeHandler";
import Node from "../../../../renders/markdown/mermaid/flowchart/Node";


export default class GraphParser
{
    static frToGraph(frs: FunctionalRequirement[]): GraphRender
    {
        const frNodes = GraphParser.frToNode(frs);

        return new GraphRender("Dependência Entre Requisitos Funcionais", frNodes, "Grafo esquematizado das dependências entre os requisitos funcionais");
    }

    private static frToNode(frs: FunctionalRequirement[]): Node[]
    {
        const nodes: Node[] = [];

        frs.forEach(fr => GraphParser.addFrAsNode(nodes, fr))

        return nodes;   
    }

    private static addFrAsNode(nodes: Node[], fr: FunctionalRequirement): Node
    {
        let foundedNode = GraphParser.findInNodes(nodes, fr.getReference());
        if(foundedNode == undefined)
        {
            const node = new Node(fr.getReference(), fr.getName());
            nodes.push(node);
            fr.getDependencies().forEach(dependencie =>
                {
                    let frAddNode = GraphParser.addFrAsNode(nodes, dependencie);
                    GraphParser.addDependencie(node, frAddNode);
                    return node;
                }
            )
        }

        // @ts-expect-error
        return foundedNode;
    }

    private static findInNodes(ns: Node[], label: string): Node | undefined
    {
        return ns.find(n => n.getIdentifier() == label);
    }

    private static addDependencie(n: Node, dp: Node)
    {
        n.addEdge(dp, ConnectionTypes.APPOINTS_TO, "depends");
    }
}

