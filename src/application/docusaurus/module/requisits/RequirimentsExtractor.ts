import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType, RequirimentAgregationType, RequirimentsBaseType } from "../../../../model/andes/RequirimentsTypes";

export interface RequirimentExtracted
{
    fr: FunctionalRequirimentType[];
    nfr: NonFunctionalRequirimentType[];
    br: BuisinessRuleType[]
}

export function compareRequiriments(a: RequirimentsBaseType, b: RequirimentsBaseType): number
{
    if(a.identifier > b.identifier)
        { return 1; }
    if(a.identifier < b.identifier)
        { return -1; }

    return 0;
}

export default class RequirimentExtractor
{
    static extract(requiriments: RequirimentAgregationType): RequirimentExtracted
    {
        const fr = requiriments.fr.sort(compareRequiriments);
        const nfr = requiriments.nfr.sort(compareRequiriments);
        const br = requiriments.br.sort(compareRequiriments);

        return { fr: fr, nfr: nfr, br: br };
    }
}

