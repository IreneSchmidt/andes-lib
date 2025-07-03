import { UseCaseClass } from "../../../../model/andes/AnalisysTypes";
import { ProjectModuleType, ProjectType } from "../../../../model/andes/ProjectTypes";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";

export default class BuildUserCase
{
    static build(module: ProjectModuleType, project: ProjectType): MarkdownFileRender
    {
        const uc = new MarkdownFileRender("Casos de Uso");

        const startSection = BuildUserCase.buildStartSection(module, project);
        module.uc.map(uc => startSection.addElement(BuildUserCase.buildUsercaseSection(uc)));
        uc.add(startSection);

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
}
