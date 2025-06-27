export interface Relashioship
{
    name: string;
    _relationType: string;
    relationDestination: Entity;
}

export interface Attributes
{
    name: string;
    _type: Entity | string;
    max?: number;
    min?: number;
    unique: boolean;
    blank: boolean;
}

export interface EnumAttribute
{
    name: string;
    _type: Enumerate;
}

export interface Entity
{
    name: string;
    attributes: Attributes[];
    enumAttributes: EnumAttribute[];
    relashionShips: Relashioship[];
}

export interface Enumerate
{
    name: string;
    options: string[];
}


export interface Package
{
    name: string;
    description: string;
    entityes: Entity[];
    enums: Enumerate[];
    subPackages: Package[];
}

