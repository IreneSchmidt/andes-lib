// ----------------- AST ------------------


//CONTEUDO NOVO:
export type QualifiedName = string;


export type ImportedEntity = {
    readonly $container: ModuleImport;
    readonly $type: 'ImportedEntity';
    name: string;
}

export type EnumEntityAtribute = {
    comment?: string;
    name: string;
    type: EnumX;
}

export type Entity = ImportedEntity | LocalEntity;


export type EnumX = {
    attributes: Array<AttributeEnum>;
    comment?: string;
    name: string;
}

export type AttributeEnum ={
    comment?: string;
    fullName?: string;
    name: string;
}

export type Model = {
    components: Array<AbstractElement | Actor | ModuleImport | Requirements | UseCase>;
    project?: Project;
}

export type ModuleImport = {
    entities: Array<ImportedEntity>;
    library: string;
    name: string;
    package_path: string;
}

export type Module = {
    readonly $container: Model | Module;
    readonly $type: 'Module';
    description?: string;
    elements: Array<AbstractElement | LocalEntity>;
    name?: QualifiedName;
}

export type AbstractElement = EnumX | Module;


export type DATATYPE = 'boolean' | 'cnpj' | 'cpf' | 'currency' | 'date' | 'datetime' | 'decimal' | 'email' | 'file' | 'integer' | 'mobilePhoneNumber' | 'phoneNumber' | 'string' | 'uuid' | 'void' | 'zipcode';

export type Element = {
    name: string;
    type: DATATYPE;
}

export type Parameter = {
    element: Array<Element> | Element;
}

export type FunctionEntity = {
    comment?: string;
    name: string;
    paramters: Array<Parameter>;
    response: DATATYPE;
}

// Relations
export type ManyToMany = {
    by?: LocalEntity;
    comment?: string;
    fullName?: string;
    name: string;
    type: Entity;
}
export type ManyToOne = {
    comment?: string;
    fullName?: string;
    name: string;
    type: Entity;
}

export type OneToMany = {
    comment?: string;
    fullName?: string;
    name: string;
    type: Entity;
}

export type OneToOne = {
    comment?: string;
    fullName?: string;
    name: string;
    type: Entity;
}


export type Relation = ManyToMany | ManyToOne | OneToMany | OneToOne;

export type LocalEntity = {
    attributes: Array<Attribute>;
    comment?: string;
    enumentityatributes: Array<EnumEntityAtribute>;
    functions: Array<FunctionEntity>;
    is_abstract: boolean;
    name: string;
    relations: Array<Relation>;
}

export type Attribute = {
    blank: boolean;
    comment?: string;
    fullName?: string;
    max?: number;
    min?: number;
    name: string;
    type: DATATYPE;
    unique: boolean;
}
// ---------------------------

export type Project = {
    id: string;
    name: string;
    description?: string;
    purpose?: string;
    miniworld?: string;
    name_fragment?: string// Oque é isso??
    architecture?: 'python' | 'java' |'csharp-minimal-api'|'csharp-clean-architecture'|'charp-pipeline'
}

//-----------REQUIREMENT--------------
export type Requirements = {
    id: string;
    name: string;
    description: string;
    requirement: Array<FunctionalRequirement|NonFunctionalRequirement|BussinesRule>
}

export type FunctionalRequirement ={
    id: string;
    description: string;
    priority: string;
    depend: Requirements;
}

export type NonFunctionalRequirement = {
    id: string;
    description: string;
    priority: string;
    depend: Requirements; //como adicionar
}

export type BussinesRule = {
    id: string;
    description: string;
    priority: string;
    depend: Requirements;
}

// --------------- USE CASE -------------------
export type Actor = {
    name: string;
}

export type UseCase = {
    id: string;
    description: string;
    requirements: Requirements;
    events: Event; //como adicionar listagem
    
}

export type Event = {
    id: string;
    name: string;
    description: string;
    action: string;
    requirements: Requirements;
    depend: Event;
    performer: Actor;
}

//--------------- ENTITIES ---------------

//----------------- AST ------------------

