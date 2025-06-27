import { EnumAttribute } from "../../model/SparkModels";
import SparkAttribute from "./SparkAttribute";


export default class SparkEnumAttribute extends SparkAttribute
{
    public constructor(baseEnumAttribute: EnumAttribute)
    {
        super({
            _type: {name: baseEnumAttribute._type.name, attributes: [], relashionShips: [], enumAttributes: []},
            blank: false,
            max: undefined,
            min: undefined,
            name: baseEnumAttribute.name,
            unique: false,
        });
    }

    override renderNameAndType(): string
    {
        return `${this.getName()} uses ${this.getType()}`;
    }
}

