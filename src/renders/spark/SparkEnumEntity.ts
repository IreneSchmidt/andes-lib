import { AttributeEnum, EnumX} from "../../model/models";
import { identate } from "../Identation";
import IRender from "../IRender";


class SparkEnumOption implements IRender
{
    private name: string;
    private description: string;


    public constructor(baseOption: AttributeEnum)
    {
        this.name = baseOption.name;
        this.description = baseOption.comment;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${this.renderDescrption(identationStartLevel)}${identate(identationStartLevel)}${this.name}`;
    }

    private renderDescrption(identationLevel: number): string
    {
        return this.description ? `${identate(identationLevel)}/* ${this.description} */` : '';
    }
}


export default class SparkEnumEntity implements IRender
{
    private description: string;
    private name: string;
    private options: SparkEnumOption[];


    public constructor(baseEnum: EnumX)
    {
        this.description = baseEnum.comment;
        this.name = baseEnum.name;
        this.options = baseEnum.attributes.map(attr => new SparkEnumOption(attr));
    }

    public render(identationStartLevel: number = 0): string
    {
        let docs = this.renderDocs(identationStartLevel);
        let entity = this.renderName();
        let attributes = this.renderOptions(identationStartLevel+1);
        return `${docs}${entity} {${attributes}}`;
    }

    private renderDocs(identationLevel: number): string
    {
        return this.description ? `${identate(identationLevel)}// ${this.description}\n` : '';
    }

    private renderName(): string
    {
        return `enum ${this.name}`;
    }

    private renderOptions(identationLevel: number): string
    {
        return this.options.map(opt => opt.render(identationLevel+1)).join("\n");
    }
}

