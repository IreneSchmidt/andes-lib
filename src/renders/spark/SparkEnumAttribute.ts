import { EnumEntityAtribute } from "../../model/models";
import SparkAttribute from "./SparkAttribute";


export default class SparkEnumAttribute extends SparkAttribute
{
    public constructor(baseEnumAttribute: EnumEntityAtribute)
    {
        super({
            name: baseEnumAttribute.name,
            blank: false,
            comment: baseEnumAttribute.comment,
            fullName: "",
            max: 0,
            min: 0,
            //@ts-expect-error
            type: baseEnumAttribute.type,
            unique: false,
        });
    }

    override renderNameAndType(): string
    {
        return `${this.getName()} uses ${this.getType()}`;
    }
}

