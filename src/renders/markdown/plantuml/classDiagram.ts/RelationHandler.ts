import { identate } from "../../../Identation";
import IRender from "../../../IRender";
import ClassRender from "./ClassRender";

export enum NumberOptions
{
    One,
    Many,
    OneOrMore,
    ZeroOrMore,
}


function renderNumeration(num: NumberOptions): string
{
    switch(num)
    {
        case NumberOptions.Many: return "*";
        case NumberOptions.One: return "1";
        case NumberOptions.OneOrMore: return "1..*";
        case NumberOptions.ZeroOrMore: return "0..*";
    }
}


export default class RelationHandler
{
    private target: ClassRender;
    private targetNumeration: NumberOptions;
    private selfNumeration: NumberOptions;
    private relationName: string;

    public constructor(target: ClassRender, selfNumeration: NumberOptions, targetNumeration: NumberOptions, relationName: string)
    {
        this.target = target;
        this.selfNumeration= selfNumeration;
        this.targetNumeration = targetNumeration;
        this.relationName = relationName;
    }

    public renderTargerNumeration(): string
    {
        return renderNumeration(this.targetNumeration);
    }

    public renderSelfNumeration(): string
    {
        return renderNumeration(this.selfNumeration);
    }

    public getTarget(): ClassRender
    {
        return this.target;
    }

    public getRelationName(): string
    {
        return this.relationName;
    }
}

