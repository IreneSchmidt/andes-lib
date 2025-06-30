import { UseCase } from "../../../../model/madeModels";
import { Actor } from "../../../../model/models";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";

export default class BuildUserCase
{
    static build(useCases: UseCase[], actors: Actor[]): MarkdownFileRender
    {
        const uc = new MarkdownFileRender("Casos de Uso");

        const startSection = BuildUserCase.buildStartSection(actors);

        useCases.map(uc => startSection.addElement(BuildUserCase.buildUsercaseSection(uc)));

        uc.add(startSection);

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

    private static buildUsercaseSection(uc: UseCase): SectionRender
    {
        const section = new SectionRender(`${uc.identifier}: ${uc.name}`);

        uc.events.map(e => section.addSimpleSubsection(`${e.identifier}: ${e.name}`, `Descrição: ${e.description}\nTODO: Código gerado automaticamente`));

        return section;
    }
}

