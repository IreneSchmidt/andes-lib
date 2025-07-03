import { PackageType } from "../../../../model/spark/PackageTypes";
import { EntityType } from "../../../../model/spark/EntityTypes";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import ClassDiagramRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassDiagramRender";
import ClassRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassRender";
import SectionRender from "../../../../renders/markdown/SectionRender";


export default class BuildDomain
{
    static buildDomainDiagram(_package: PackageType): MarkdownFileRender
    {
        const domain = new MarkdownFileRender("Domain");

        const classes = BuildDomain.packageToMermaid(_package);
        const diagram = new ClassDiagramRender(classes);

       domain.addSimpleSection("Diagrama de Domínio", diagram.render());
       domain.add(BuildDomain.classesDescription(_package)) 
       return domain;
    }

    private static packageToMermaid(pkg: PackageType): ClassRender[]
    {
        return pkg.entities.map(entity => new ClassRender(entity)
        );
    }

    private static classesDescription (pkg: PackageType): SectionRender{
        const section = new SectionRender(pkg.identifier)
        pkg.entities.forEach(e => section.addSimpleSubsection(e.identifier, BuildDomain.createEntityDescription(e)))
        return section;
    }
    
    private static createEntityDescription (e: EntityType): string {
        return `Entidade ${e.identifier} \n
        Descrição: ${e.description}`
        
    }
}   


