import { BuisinesRuleClass, FunctionalRequirementClass, NonFunctionalRequirementClass, RequirementsInterface } from "../../../../model/RequirimentsModels";

export interface RequirimentExtracted
{
    fr: FunctionalRequirementClass[];
    nfr: NonFunctionalRequirementClass[];
    br: BuisinesRuleClass[]
}

export default class RequirimentExtractor
{
    static extract(requiriments: RequirementsInterface): RequirimentExtracted
    {
        const fr = requiriments.functionalRequiriment.sort((a, b) => a.compareTo(b));
        const nfr = requiriments.nonFunctionalRequiriment.sort((a, b) => a.compareTo(b));
        const br = requiriments.buiinesRule.sort((a, b) => a.compareTo(b));

        return { fr: fr, nfr: nfr, br: br };
    }
}

