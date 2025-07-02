import { UseCaseType } from "../../../../model/madeModels";
import { Actor } from "../../../../model/models";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import GraphRender from "../../../../renders/markdown/mermaid/flowchart/GraphRender";
import Node from "../../../../renders/markdown/mermaid/flowchart/Node";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";

export default class BuildUserCase
{
    static build(useCases: UseCaseType[], actors: Actor[]): MarkdownFileRender
    {
        const uc = new MarkdownFileRender("Casos de Uso");

        const startSection = BuildUserCase.buildStartSection(actors);
        // const depGraph = BuildUserCase.buildEventDependenceGraph(useCases);
        useCases.map(uc => startSection.addElement(BuildUserCase.buildUsercaseSection(uc)));

        uc.add(startSection);
        // uc.addSimpleSection("Grafo de dependencias ", depGraph.render())

        return uc;
    }

    private static buildStartSection(actors: Actor[]): SectionRender
    {
        const startSection = new SectionRender("Casos de Uso");

        startSection.addSimpleParagraph("Modelo de caso de uso...");

        const actorsTable = new TableRender(["Atores", "Descrição"], actors.map(a => [a.name, a.comment]), "Lista de Atores e suas Descrições");
        startSection.addElement(actorsTable);

        return startSection;
    }

    private static buildUsercaseSection(uc: UseCaseType): SectionRender
    {
        const section = new SectionRender(`${uc.identifier}: ${uc.name}`);

        uc.events.map(e => section.addSimpleSubsection(`${e.identifier}: ${e.name}`, `Descrição: ${e.description}\nTODO: Código gerado automaticamente`));

        return section;
    }

    // private static buildEventDependenceGraph(useCases: UseCaseType[]): SectionRender {
    //     const nodes = useCases.flatMap(uc => 
    //         uc.events.map(e => new Node(e.identifier, e.name))
    //     );


    //     const mygraph = new GraphRender("Grafo de dependências", nodes)
    //     nodes.forEach(node => node.addEdge(mygraph.))
    //     const section = new SectionRender(
    //         mygraph.render()
    //     );
    //     const cycleGraphs = mygraph.generateCycleGraph()
    //     if (cycleGraphs){
    //         section.addSimpleSubsection("Subgrafos envolvidos", cycleGraphs.map(graph => graph.render()).join(`\n`))
    //     }

    //     return section;
    //     }
}

