import { BuisinesRule, FunctionalRequirement, NonFunctionalRequirement, Requirements } from "../../../../model/RequirimentsModels";

export interface RequirimentExtracted
{
    fr: FunctionalRequirement[];
    nfr: NonFunctionalRequirement[];
    br: BuisinesRule[]
}

export default class RequirimentExtractor
{
    static extract(requiriments: Requirements): RequirimentExtracted
    {
        const fr = requiriments.functionalRequiriment.sort((a, b) => a.compareTo(b));
        const nfr = requiriments.nonFunctionalRequiriment.sort((a, b) => a.compareTo(b));
        const br = requiriments.buiinesRule.sort((a, b) => a.compareTo(b));

        return { fr: fr, nfr: nfr, br: br };
    }
}

