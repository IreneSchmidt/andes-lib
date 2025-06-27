import { Entity, Package } from "../../../../model/SparkModels";
import FileRender from "../../../../renders/markdown/FileRender";
import AttributeRender from "../../../../renders/markdown/plantuml/classDiagram.ts/AttributeRender";
import ClassDiagramRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassDiagramRender";
import ClassRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassRender";


export default class BuildDomain
{
    static buildDomainDiagram(_package: Package): FileRender
    {
        const domain = new FileRender("Domain");

        const classes = BuildDomain.packageToMermaid(_package);
        const diagram = new ClassDiagramRender(classes);

       domain.addSimpleSection("Diagrama de Domínio", diagram.render());

       return domain;
    }

    private static packageToMermaid(pkg: Package): ClassRender[]
    {
        return pkg.entityes.map(entity => new ClassRender(
            entity.name,
            entity.attributes.map(attr => new AttributeRender(
                attr.name,
                (attr._type as Entity).name == undefined ? attr._type as string : (attr._type as Entity).name    
            )),
            [],
            [],
            []
        ));
    }
}

