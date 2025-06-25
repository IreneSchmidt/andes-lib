export type ProjectModule = {
    id: string;
    name: string;
    purpose: string;
    miniworld: string;
    requiriments: {
        functional: FunctionalRequirement[];
        nonFunctional: NonFunctionalRequirement[];
        buisinesRule: BuisinesRule[];
    }
}

export class Requirement
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
}


export class FunctionalRequirement extends Requirement
{
    private static numeration: number = 0;
    private dependencies: Requirement[];
    private priority: string;

    public constructor(name: string, priority: string, description: string = "", dependencies: Requirement[] = [])
    {
        super(name, FunctionalRequirement.numeration, "RF", description);
        FunctionalRequirement.numeration++;
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
}

export class NonFunctionalRequirement extends Requirement
{
    private static numeration: number = 0;

    public constructor(name: string, description: string = "")
    {
        super(name, NonFunctionalRequirement.numeration, "RNF", description);
        NonFunctionalRequirement.numeration++;
    }
}

export class BuisinesRule extends Requirement
{
    private static numeration: number = 0;

    public constructor(name: string, description: string = "")
    {
        super(name, BuisinesRule.numeration, "RN", description);
        BuisinesRule.numeration++;
    }
}

