import { UseCaseClass } from "../../../../model/andes/AnalisysTypes";
import { ProjectModuleType, ProjectType } from "../../../../model/andes/ProjectTypes";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import GraphRender from "../../../../renders/markdown/mermaid/flowchart/GraphRender";
import { ConnectionTypes } from "../../../../renders/markdown/mermaid/flowchart/MultiEdgeHandler";
import Node from "../../../../renders/markdown/mermaid/flowchart/Node";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";
import UserCaseGraphParser from "./UseCaseGraphParser";

export default class BuildUserCase
{
    static build(module: ProjectModuleType, project: ProjectType): MarkdownFileRender
    {
        const uc = new MarkdownFileRender("Casos de Uso");

        const startSection = BuildUserCase.buildStartSection(module, project);
        uc.add(startSection);

        module.uc.forEach(_uc => uc.add(BuildUserCase.buildUsercaseBruteSection(_uc)));
        const s = BuildUserCase.buildGraphSection(module.uc);

        uc.add(s);
        uc.add(BuildUserCase.buildEventDependencie(module))

        module.uc.map(uc => startSection.addElement(BuildUserCase.buildUsercaseSection(uc)));
        return uc;
    }

    private static buildStartSection(module: ProjectModuleType, project: ProjectType): SectionRender
    {
        const startSection = new SectionRender("Casos de Uso");
        startSection.addSimpleParagraph(`O modelo de Casos de Uso captura e descreve as funcionalidades que o sistema provê a seus atores. No Módulo ${module.name} da plataforma ${project.overview.identifier} foi(ram) identificado(s) ${module.actors.length} ator(es) acessando ${module.uc.length} Casos de Uso, organizados em eventos.`);

        const actorsTable = new TableRender(["Ator", "Descrição"], module.actors.map(a => [a.identifier, a.description??""]), "Lista de Atores e suas Descrições");
        startSection.addElement(actorsTable);

        return startSection;
    }

    private static buildUsercaseSection(uc: UseCaseClass): SectionRender
    {
        const section = new SectionRender(`${uc.identifier}: ${uc.name}`);

        uc.event?.forEach((e, index) => section.addSimpleSubsection(`${e.identifier}.${index}: ${e.name}`, "").addEnumerablePart(e.action??[]))

        return section;
    }

    private static buildEventDependencie(module: ProjectModuleType): SectionRender
    {
        const allEvents = module.uc.map(uc => uc.event).flat().filter(obj => obj != undefined);

        console.log(allEvents);

        const table = new TableRender(
            ["Evento", "Descrição", "Dependência", "Habilitados", "Atores"],
            allEvents.map(e  => [
                e.identifier,
                e.description??"",
                e.depends?.map(d => d.identifier).join(", ")??"",
                // allEvents.map(ev => ev.depends?.filter(d => d.identifier==e.identifier).map(d=>d.identifier)).filter(_ => _? _.length>0:false).join(", "),
                allEvents.filter(ev => ev.depends?.includes(e)).map(ev => ev.identifier).join(","),
                e.performer?.map(a => a.identifier).join(', ') ?? ''
            ]),
            "Matrix de Dependência de Eventos"
        )



        const graph = new GraphRender("Grafo de dependência entre eventos", allEvents.map(e => {
            const n = new Node(e.identifier, e.name);

            e.depends?.forEach(d => n.addEdge(new Node(d.identifier, ""), ConnectionTypes.APPOINTS_TO, "Depends"));

            return n;
        }))

        const section = new SectionRender("Matriz de Dependência de eventos", [table, graph]);
        
        graph.generateCycleGraph()?.forEach(g => section.addElement(g));

        return section;
    }

    private static buildGraphSection(useCases: UseCaseClass[]): SectionRender
    {
        const section = new SectionRender("Grafos de Dependência");

        const ucGraph = UserCaseGraphParser.ucToGraph(useCases);
        section.addElement(ucGraph);

        const ucCycle = ucGraph.generateCycleGraph();
        if (ucCycle)
            section.addSimpleSubsection("Ciclos entre Casos de Uso", ucCycle.map(g => g.render()).join(""));

        const evGraph = UserCaseGraphParser.eventToGraph(useCases);
        section.addElement(evGraph);

        const evCycle = evGraph.generateCycleGraph();
        if (evCycle)
            section.addSimpleSubsection("Ciclos entre Eventos", evCycle.map(g => g.render()).join(""));

        return section;
    }

    private static buildUsercaseBruteSection(uc: UseCaseClass): SectionRender
    {
        const section = new SectionRender(`${uc.identifier}: ${uc.name}`);

        section.addSimpleParagraph(`Descrição: ${uc.description}`);

        if (uc.event? uc.event.length > 0 : false) {
            const headers = ["Evento", "Nome", "Descrição", "Ação", "Executor"];
            const rows: string[][] = uc.event?.map(e => [
                e.identifier,
                e.name,
                e.description??"",
                e.action?.join(", ")??"",
                e.performer?.map(a=>a.identifier).join(', ')??"",
            ])??[];

            const eventTable = new TableRender(headers, rows, "Eventos Associados ao Caso de Uso");
            section.addElement(eventTable);
        } else {
            section.addSimpleParagraph("_Nenhum evento registrado._");
        }

        return section;
    }
}
