export class RequirementClass
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

    public compareTo(other: RequirementClass): number
    {
        if(this.numeration > other.numeration)
            { return 1; }
        if(this.numeration < other.numeration)
            { return -1; }
        return 0;
    }
}


export class FunctionalRequirementClass extends RequirementClass
{
    private static numeration: number = 0;
    private dependencies: FunctionalRequirementClass[];
    private priority: string;

    public constructor(name: string, priority: string, description: string = "", dependencies: FunctionalRequirementClass[] = [])
    {
        super(name, FunctionalRequirementClass.numeration, "RF", description);
        FunctionalRequirementClass.numeration++;
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

    public getDependencies(): FunctionalRequirementClass[]
    {
        return this.dependencies;
    }

    public addDepedencie(depends: FunctionalRequirementClass)
    {
        this.dependencies.push(depends);
    }
}

export class NonFunctionalRequirementClass extends RequirementClass
{
    private static numeration: number = 0;

    public constructor(name: string, description: string = "")
    {
        super(name, NonFunctionalRequirementClass.numeration, "RNF", description);
        NonFunctionalRequirementClass.numeration++;
    }
}

export class BuisinesRuleClass extends RequirementClass
{
    private static numeration: number = 0;

    public constructor(name: string, description: string = "")
    {
        super(name, BuisinesRuleClass.numeration, "RN", description);
        BuisinesRuleClass.numeration++;
    }
}

export interface RequirementsInterface
{
    functionalRequiriment: FunctionalRequirementClass[];
    nonFunctionalRequiriment: NonFunctionalRequirementClass[];
    buiinesRule: BuisinesRuleClass[];
}