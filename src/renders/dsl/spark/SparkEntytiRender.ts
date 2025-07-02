import { AttributeType, EntityType, EnumAttributeType, RelationType } from "../../../model/spark/EntityTypes";
import { identate } from "../../Identation";
import IRender from "../../IRender";
import NameSpaceItemRender, { NameSpaceSimpleItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export class SparkRelashionshipAttributeRender extends NameSpaceSimpleItemRender
{
    private relationType: string;

    public constructor(reference: string, target: string, relationType: string)
    {
        super(reference, target);
        this.relationType = relationType;
    }

    override render(identationStartLevel?: number): string
    {
        return `\n${identate(identationStartLevel)}${this.reference} ${this.relationType} ${this.renderValue(identationStartLevel)}`;
    }
}

export class SparkSimpleAttributeRender extends NameSpaceSimpleItemRender
{
    public constructor(attr: AttributeType)
    {
        super(attr.identifier, `${attr.type}${SparkSimpleAttributeRender.modifiers(attr)}`);
    }

    private static modifiers(attr: AttributeType): string
    {
        const unique = attr.unique ? " unique " : '';
        const blank = attr.blank ? " blank " : '';
        const max = attr.max ? ` max: ${attr.max}` : '';
        const min = attr.min ? ` min: ${attr.min}` : '';

        return `${max}${min}${unique}${blank}`;
    }
}


export default class SparkEntityRender extends NameSpaceRender
{
    private enums: NameSpaceItemRender[];
    private relashionships: NameSpaceItemRender[];

    public constructor(entity: EntityType)
    {
        super("entity", entity.identifier, []);
        this.enums = [];
        this.relashionships = [];

        entity.attributes?.forEach(a => this.addAttribute(a));
        entity.enums?.forEach(e => this.addEnum(e));
        entity.relationsAttr?.forEach(r => this.addRelashionShip(r));
    }

    public addAttribute(attr: AttributeType)
    {
        this.items.push(new SparkSimpleAttributeRender(attr));
    }

    public addEnum(e: EnumAttributeType)
    {
        this.enums.push(new SparkRelashionshipAttributeRender(e.identifier, e.type.identifier, "uses"));
    }

    public addRelashionShip(e: RelationType)
    {
        this.relashionships.push(new SparkRelashionshipAttributeRender(e.identifier, e.targetObject.identifier, e.relationType));
    }

    protected override listAll(): IRender[]
    {
        return [...this.items, ...this.enums, ...this.relashionships];    
    }
}

