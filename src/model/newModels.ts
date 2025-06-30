export type ProjectModuleType = {
    id: string;
    name: string;
    purpose: string;
    miniworld: string;
    requiriments: {
        functional: FunctionalRequirementSimpleClass[];
        nonFunctional: NonFunctionalRequirementSimpleClass[];
        buisinesRule: BuisinesRuleSimpleCLass[];
    }
}

export class RequirementSimpleClass
{
    private name: string;
    private descritpion: string;
    private numeration: number;
    private abreviation: string;

    public constructor(name: string, numeration: number, abrev: string, description: string = "")
    {
        this.name = name;
        this.descritpion = description;
        this.numeration = numeration;
        this.abreviation = abrev;
    }

    public getName(): string
    {
        return this.name;
    }

    public getDescription(): string
    {
        return this.descritpion;
    }

    public getReference(): string
    {
        return `${this.abreviation}${this.numeration}`;
    }

    public toString(): string
    {
        return `${this.getReference()}: ${this.name}`;
    }

    public compareTo(other: RequirementSimpleClass): number
    {
        if(this.numeration > other.numeration)
            { return 1; }
        if(this.numeration < other.numeration)
            { return -1; }
        return 0;
    }
}


export class FunctionalRequirementSimpleClass extends RequirementSimpleClass
{
    private static numeration: number = 0;
    private dependencies: RequirementSimpleClass[];
    private priority: string;

    public constructor(name: string, priority: string, description: string = "", dependencies: RequirementSimpleClass[] = [])
    {
        super(name, FunctionalRequirementSimpleClass.numeration, "RF", description);
        FunctionalRequirementSimpleClass.numeration++;
        this.dependencies = dependencies;
        this.priority = priority;
    }

    public getPriority(): string
    {
        return this.priority;
    }

    public listDependencies(): string[]
    {
        return this.dependencies.map(dependencie => dependencie.getReference());
    }

    public addDepedencie(depends: RequirementSimpleClass)
    {
        this.dependencies.push(depends);
    }
}

export class NonFunctionalRequirementSimpleClass extends RequirementSimpleClass
{
    private static numeration: number = 0;

    public constructor(name: string, description: string = "")
    {
        super(name, NonFunctionalRequirementSimpleClass.numeration, "RNF", description);
        NonFunctionalRequirementSimpleClass.numeration++;
    }
}

export class BuisinesRuleSimpleCLass extends RequirementSimpleClass
{
    private static numeration: number = 0;

    public constructor(name: string, description: string = "")
    {
        super(name, BuisinesRuleSimpleCLass.numeration, "RN", description);
        BuisinesRuleSimpleCLass.numeration++;
    }
}

