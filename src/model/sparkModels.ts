export interface Relashioship
{
    name: string;
    _relationType: string;
    relationDestination: SparkEntity;
}

export interface Attributes
{
    name: string;
    _type: SparkEntity | string;
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

export interface SparkEntity
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
    identifier: string;
    name: string;
    description: string;
    entityes: SparkEntity[];
    enums: Enumerate[];
    subPackages: Package[];
}

