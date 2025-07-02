import { NameableSuperType } from "../supertypes";


export interface RequirimentsBaseType extends NameableSuperType 
{
    priority: string;
    depends: string[];

    // Use Somente se souber oq tá fazendo
    ref: RequirimentAgregationType;
}

/**
 * 
 * Atention: Per Base in Andes, FR, NFR and BR are absoluty the same thing
 */
export interface FunctionalRequirimentType extends RequirimentsBaseType
{

}

export interface NonFunctionalRequirimentType extends RequirimentsBaseType
{

}

export interface BuisinessRuleType extends RequirimentsBaseType
{

}


export interface RequirimentAgregationType extends NameableSuperType
{
    fr: FunctionalRequirimentType[]
    nfr: NonFunctionalRequirimentType[]
    br: BuisinessRuleType[]
}

