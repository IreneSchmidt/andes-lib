// ----------------- AST ------------------

export const Module = 'Module';

export function isModule(item: unknown): item is Module {
    // Verifica se é um objeto não nulo
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    // Verifica a propriedade $type
    if (!('$type' in item) || (item as any).$type !== Module) {
        return false;
    }

    // Verifica as propriedades obrigatórias
    if (!('$container' in item) || !('elements' in item)) {
        return false;
    }

    // Verifica o tipo dos elementos (verificação básica)
    const elements = (item as any).elements;
    if (!Array.isArray(elements)) {
        return false;
    }

    // Verificações adicionais podem ser adicionadas aqui conforme necessário
    // Por exemplo, verificar a estrutura de name se QualifiedName for conhecido

    return true;
}

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
    requirements: Array<Requirements>;
    events: Array<Event>; 
    
}

export type Event = {
    id: string;
    name: string;
    description: string;
    action: string;
    requirements: Array<Requirements>;
    depend: Array<Event>;
    performer: Actor;
}

export function isUseCase(item: unknown): item is UseCase {
    // Verificação básica de objeto
    if (typeof item !== 'object' || item === null) return false;

    const obj = item as Record<string, unknown>;

    // Verifica propriedades obrigatórias e seus tipos
    return (
        typeof obj.id === 'string' &&
        typeof obj.description === 'string' &&
        Array.isArray(obj.requirements) &&
        Array.isArray(obj.events)
    );
}

export function isRequirement(item: unknown): item is Requirements{
    // Verifica se é um objeto não nulo
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    // Verificação de propriedades
    const obj = item as Record<string, unknown>;
    if (
        typeof obj.id !== 'string' ||
        typeof obj.name !== 'string' ||
        typeof obj.description !== 'string' ||
        !Array.isArray(obj.requirement)
    ) 
    {
        return false;
    }

    return true;
}

export function isActor(item: unknown): item is Actor{
    // Verifica se é um objeto não nulo
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    // Verificação de propriedades
    const obj = item as Record<string, unknown>;
    if (typeof obj.name !== 'string') return false;
    

    return true;
}

export function isEvent(item: unknown): item is Event{
    // Verifica se é um objeto não nulo
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    // Verificação de propriedades
    const obj = item as Record<string, unknown>;
    if (
        typeof obj.id !== 'string' ||
        typeof obj.name !== 'string' ||
        typeof obj.description !== 'string' ||
        typeof obj.action !== 'string' ||
        !Array.isArray(obj.requirements) ||
        !Array.isArray(obj.depend) ||
        !isActor(obj.performer) 
    ) 
    {
        return false;
    }

    return true;
}
//--------------- ENTITIES ---------------

//----------------- AST ------------------


// TESTAR isEnumx e isLocalEntity PRESENTES NA PASTA SPARK
export function isEnumX(item: unknown): item is EnumX{

    const obj = item as Record<string, unknown>;
    if (
        !Array.isArray(obj.attributes) ||
        typeof obj.comment !== 'string' ||
        typeof obj.name !== 'string'
    ) 
    {
        return false
    }

    return true
}