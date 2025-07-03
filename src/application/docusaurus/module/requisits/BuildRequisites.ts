import { ProjectModuleType } from "../../../../model/andes/ProjectTypes";
import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType } from "../../../../model/andes/RequirimentsClass";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import SectionRender from "../../../../renders/markdown/SectionRender";
import GraphParser from "./GraphParser";
import RequirimentExtractor, { RequirimentExtracted } from "./RequirimentsExtractor";
import TableParser from "./TableParser";


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
}

