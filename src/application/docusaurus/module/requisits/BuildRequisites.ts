import { UseCaseClass } from "../../../../model/andes/AnalisysTypes";
import { ProjectModuleType } from "../../../../model/andes/ProjectTypes";
import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType } from "../../../../model/andes/RequirimentsClass";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import GraphRender from "../../../../renders/markdown/mermaid/flowchart/GraphRender";
import { ConnectionTypes } from "../../../../renders/markdown/mermaid/flowchart/MultiEdgeHandler";
import Node from "../../../../renders/markdown/mermaid/flowchart/Node";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";
import GraphParser from "./GraphParser";
import RequirimentExtractor, { RequirimentExtracted } from "./RequirimentsExtractor";
import TableParser from "./TableParser";
import UserCaseGraphParser from "./UseCaseGraphParser";


export default class BuildRequisites
{
    static buildModuleRequisites(module: ProjectModuleType): MarkdownFileRender
    {
        const requisites = new MarkdownFileRender("Requisitos do Módulo");
        const r = RequirimentExtractor.extract(module.requisites);

        BuildRequisites.buildFR(requisites, r.fr);
        BuildRequisites.buildNFR(requisites, r.nfr);
        BuildRequisites.buildBR(requisites, r.br);
        BuildRequisites.buildDependenciesSection(requisites, r);

        module.uc.forEach(uc => requisites.add(BuildRequisites.buildUsercaseSection(uc)));
        BuildRequisites.buildGraphSection(module.uc);

        requisites.add(BuildRequisites.buildEventDependencie(module))

        return requisites;
    }

    private static buildFR(rFile: MarkdownFileRender, fr: FunctionalRequirimentType[])
    {
        const frTable = TableParser.frToTable(fr);
        rFile.addSimpleTableSection("Requisitos Funcionais", frTable);
    }

    private static buildNFR(rFile: MarkdownFileRender, nfr: NonFunctionalRequirimentType[])
    {
        const nfrTable = TableParser.nfrToTalbe(nfr);
        rFile.addSimpleTableSection("Requisitos Não Funcionais", nfrTable);
    }

    private static buildBR(rFile: MarkdownFileRender, br: BuisinessRuleType[])
    {
        const brTable = TableParser.brToTalbe(br);
        rFile.addSimpleTableSection("Regras de Negócio", brTable);
    }

    private static buildDependenciesSection(rFile: MarkdownFileRender, r: RequirimentExtracted)
    {
        const frGraph = GraphParser.frToGraph(r.fr);
        const frCycleGraph = frGraph.generateCycleGraph();

        const dependenciaSection = new SectionRender("Grafo de Dependências", [frGraph]);
        if(frCycleGraph != null)
            { dependenciaSection.addSimpleSubsection("Ciclo entre dependências", frCycleGraph.map(cycle => cycle.render()).join("")); }

        rFile.add(dependenciaSection);
    }

    private static buildUsercaseSection(uc: UseCaseClass): SectionRender
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

    private static buildEventDependencie(module: ProjectModuleType): SectionRender
    {
        const allEvents = module.uc.map(uc => uc.event).flat().filter(obj => obj != undefined);

        const table = new TableRender(
            ["Evento", "Descrição", "Dependência", "Habilitados", "Atores"],
            allEvents.map(e  => [
                e.identifier,
                e.description??"",
                e.depends?.map(d => d.identifier).join(", ")??"",
                allEvents.filter(ev => ev.depends?.includes(e)??false).map(ev=>ev.identifier).join(", "),
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
}

