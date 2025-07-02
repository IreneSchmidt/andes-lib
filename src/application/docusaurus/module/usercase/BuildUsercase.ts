import { UseCaseType } from "../../../../model/madeModels";
import { Actor } from "../../../../model/models";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";
import UserCaseGraphParser from "./UseCaseGraphParser"; // ⬅️ importado

export default class BuildUserCase
{
    static build(useCases: UseCaseType[], actors: Actor[]): MarkdownFileRender
    {
        const uc = new MarkdownFileRender("Casos de Uso");

        const startSection = BuildUserCase.buildStartSection(actors);
        useCases.map(uc => startSection.addElement(BuildUserCase.buildUsercaseSection(uc)));
        uc.add(startSection);

        // 🔽 Adicionando os grafos
        const dependencySection = BuildUserCase.buildGraphSection(useCases);
        uc.add(dependencySection);

        return uc;
    }

    private static buildStartSection(actors: Actor[]): SectionRender
    {
        const startSection = new SectionRender("Casos de Uso: ");
        startSection.addSimpleParagraph("Modelo de caso de uso...");

        const actorsTable = new TableRender(["Atores", "Descrição"], actors.map(a => [a.name, a.comment]), "Lista de Atores e suas Descrições");
        startSection.addElement(actorsTable);

        return startSection;
    }

    private static buildUsercaseSection(uc: UseCaseType): SectionRender {
    const section = new SectionRender(`${uc.identifier}: ${uc.name}`);

    section.addSimpleParagraph(`Descrição: ${uc.description}`);

    if (uc.events.length > 0) {
        const headers = ["Evento", "Nome", "Descrição", "Ação", "Executor"];
        const rows: string[][] = uc.events.map(e => [
            e.identifier,
            e.name,
            e.description,
            e.action,
            e.performer?.name || "-"
        ]);

        const eventTable = new TableRender(headers, rows, "Eventos Associados ao Caso de Uso");
        section.addElement(eventTable);
    } else {
        section.addSimpleParagraph("_Nenhum evento registrado._");
    }

    return section;
}


    private static buildGraphSection(useCases: UseCaseType[]): SectionRender {
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
}
