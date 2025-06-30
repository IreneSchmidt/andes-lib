import { SparkEntity, Package } from "../../../../model/sparkModels";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import AttributeRender from "../../../../renders/markdown/plantuml/classDiagram.ts/AttributeRender";
import ClassDiagramRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassDiagramRender";
import ClassRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassRender";
import SectionRender from "../../../../renders/markdown/SectionRender";


export default class BuildDomain
{
    static buildDomainDiagram(_package: Package): MarkdownFileRender
    {
        const domain = new MarkdownFileRender("Domain");

        const classes = BuildDomain.packageToMermaid(_package);
        const diagram = new ClassDiagramRender(classes);

       domain.addSimpleSection("Diagrama de Domínio", diagram.render());
       domain.add(BuildDomain.classesDescription(_package)) 
       return domain;
    }

    private static packageToMermaid(pkg: Package): ClassRender[]
    {
        return pkg.entityes.map(entity => new ClassRender(
            entity.name,
            entity.attributes.map(attr => new AttributeRender(
                attr.name,
                (attr._type as SparkEntity).name == undefined ? attr._type as string : (attr._type as SparkEntity).name    
            )),
            [],
            [],
            []
        ));
    }

    private static classesDescription (pkg: Package): SectionRender{
        const section = new SectionRender(pkg.name)
        pkg.entityes.forEach(e => section.addSimpleSubsection(e.name, BuildDomain.createEntityDescription(e)))
        return section;
    }
    
    private static createEntityDescription (e: SparkEntity): string {
        if (!BuildDomain.hasNoRelation(e)){
            const descrpt = `Entidade ${e.name}, possuí relação com ${e.relashionShips.map(r => `${r.name}`).join(', ').toUpperCase()}`
            return descrpt  
        }
        return `Entidade ${e.name}, não possui relações.`
        
    }

    private static hasNoRelation (e: SparkEntity): boolean{
        return e.relashionShips == null || e.relashionShips.length == 0;
    }
}   


