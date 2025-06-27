import { Module } from "../../../../model/ProjectModels"
import { BuisinesRule, FunctionalRequirement, NonFunctionalRequirement } from "../../../../model/RequirimentsModels";
import FileRender from "../../../../renders/markdown/FileRender";
import SectionRender from "../../../../renders/markdown/SectionRender";
import GraphParser from "./GraphParser";
import RequirimentExtractor, { RequirimentExtracted } from "./RequirimentsExtractor";
import TableParser from "./TableParser";


export default class BuildRequisites
{
    static buildModuleRequisites(module: Module): FileRender
    {
        const requisites = new FileRender("Requisitos do Módulo");
        const r = RequirimentExtractor.extract(module.requisites);

        BuildRequisites.buildFR(requisites, r.fr);
        BuildRequisites.buildNFR(requisites, r.nfr);
        BuildRequisites.buildBR(requisites, r.br);
        BuildRequisites.buildDependenciesSection(requisites, r);

        return requisites;
    }

    private static buildFR(rFile: FileRender, fr: FunctionalRequirement[])
    {
        const frTable = TableParser.frToTable(fr);
        rFile.addSimpleTableSection("Requisitos Funcionais", frTable);
    }

    private static buildNFR(rFile: FileRender, nfr: NonFunctionalRequirement[])
    {
        const nfrTable = TableParser.nfrToTalbe(nfr);
        rFile.addSimpleTableSection("Requisitos Não Funcionais", nfrTable);
    }

    private static buildBR(rFile: FileRender, br: BuisinesRule[])
    {
        const brTable = TableParser.brToTalbe(br);
        rFile.addSimpleTableSection("Regras de Negócio", brTable);
    }

    private static buildDependenciesSection(rFile: FileRender, r: RequirimentExtracted)
    {
        const frGraph = GraphParser.frToGraph(r.fr);
        const frCycleGraph = frGraph.generateCycleGraph();

        const dependenciaSection = new SectionRender("Grafo de Dependências", [frGraph]);
        if(frCycleGraph != null)
            { dependenciaSection.addSimpleSubsection("Ciclo entre dependências", frCycleGraph.map(cycle => cycle.render()).join("")); }

        rFile.add(dependenciaSection);
    }
}

