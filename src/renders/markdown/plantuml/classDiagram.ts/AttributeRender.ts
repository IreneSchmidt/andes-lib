import { identate } from "../../../Identation";
import IRender from "../../../IRender";
import { VisibilityOptions } from "./VisibilityOptions";


export default class AttributeRender implements IRender
{
    protected visibility: VisibilityOptions;
    protected name: string;
    protected _type: string;

    public constructor(name: string, _type: string = "", visibility: VisibilityOptions = VisibilityOptions.PUBLIC)
    {
        this.name = name;
        this._type = _type;
        this.visibility = visibility;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}${this.visibility}${this._type} ${this.name}`;
    }
}

