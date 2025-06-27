import { identate } from "../../../Identation";
import IRender from "../../../IRender";
import AttributeRender from "./AttributeRender";
import MethodRender from "./MethodRender";
import RelationHandler from "./RelationHandler";


export default class ClassRender implements IRender
{
    private name: string;
    private attr: AttributeRender[];
    private methods: MethodRender[];
    private supertypes: ClassRender[];
    private relations: RelationHandler[];

    public constructor(name: string, attrs: AttributeRender[], methods: MethodRender[], supertypes: ClassRender[] = [], relations: RelationHandler[])
    {
        this.name = name;
        this.attr = attrs;
        this.methods = methods;
        this.supertypes = supertypes;
        this.relations = relations;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}class ${this.name} {\n${this.attr.map(attr => attr.render(identationStartLevel+1)).join('\n')}\n${this.methods.map(method => method.render(identationStartLevel+1)).join('\n')}\n${identate(identationStartLevel)}}`;
    }

    public renderHerance(identationLevel: number = 0): string
    {
        return `\n${identate(identationLevel)}${this.supertypes.map(supertype => `${supertype.name} <|-- ${this.name}`)}`;
    }

    public renderRelations(identationLevel: number): string 
    {
        return `${identate(identationLevel)}${this.relations.map(relation => `${this.renderRelation(relation)}`).join(`${identate(identationLevel)}\n`)}`;
    }

    private renderRelation(relation: RelationHandler): string
    {
        return `${relation.getTarget().name} "${relation.renderTargerNumeration()}" -- "${relation.renderSelfNumeration()}" ${this.name} ${relation.getRelationName() ? relation.getRelationName() : ''}`;
    }
}

