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
    components: Array<AbstractElement | Actor | ModuleImport | Requirement | UseCase>;
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
    paramter?:Parameter;
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
    $container: Module;
    attributes: Array<Attribute>;
    comment?: string;
    enumentityatribute?: EnumEntityAtribute;
    enumentityatributes: Array<EnumEntityAtribute>;
    function?: FunctionEntity;
    functions: Array<FunctionEntity>;
    is_abstract: boolean;
    name: string;
    relation?: Relation;
    relations: Array<Relation>;
    superType?: Entity;
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
    name_fragment?: string;
    architecture?: 'python' | 'java' |'csharp-minimal-api'|'csharp-clean-architecture'|'charp-pipeline'
}

//-----------REQUIREMENT--------------
export type Requirements = FunctionalRequirement | NonFunctionalRequirement;

export type Requirement = {
    id: string;
    name: string;
    description: string;
    requirement?: BussinesRule | FunctionalRequirement | NonFunctionalRequirement
    requirements: Array<FunctionalRequirement|NonFunctionalRequirement|BussinesRule>
}

export type FunctionalRequirement ={
    id: string;
    description: string;
    priority: string;
    depend?: Requirements;
    depends: Array<Requirements>
}

export type NonFunctionalRequirement = {
    id: string;
    description: string;
    priority: string;
    depend?: Requirements;
    depends: Array<Requirements>
}

export type BussinesRule = {
    id: string;
    description: string;
    priority: string;
    depend?: Requirements;
    depends: Array<Requirements>;
}

// --------------- USE CASE -------------------
export type Actor = {
    comment?: string;
    entity?: Entity;
    name: QualifiedName;
    superType?: Actor;
}

export type UseCase = {
    actors: Array<Actor>;
    depend?: UseCase;
    depends: Array<UseCase>;
    description?: string;
    events: Array<Event>;
    id: string;
    name_fragment?: string;
    requirement?: Requirements;
    requirements: Array<Requirements>
}

export type Event = {
    id: string;
    name: string;
    name_fragment?: string;
    description: string;
    action: string;
    requirements: Array<Requirements>;
    depend?: Event;
    depends: Array<Event>;
    performer: Actor
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

export function isRequirement(item: unknown): item is Requirement{
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


// *************** TESTAR AS FUNÇÕES ABAIXO ***************

// DICA: DIGITE *** CTRL + ; *** PARA DESCOMENTAR OU COMENTAR COM FACILIDADE

// EM isEnumX, isLocalEntity e isImportedEntity
// comment É OPICIONAL ? SE SIM FICA:
//  (obj.comment !== undefined && typeof obj.comment !== 'string') ||
// SENÃO FICA:
// typeof obj.comment !== 'string' ||

export function isEnumX(item: unknown): item is EnumX{

    const obj = item as Record<string, unknown>;
    if (
        !Array.isArray(obj.attributes) ||
        (obj.comment !== undefined && typeof obj.comment !== 'string') ||
        typeof obj.name !== 'string'
    ) 
    {
        return false
    }

    return true
}

export function isLocalEntity(item: unknown): item is LocalEntity{
    const obj = item as Record<string, unknown>;
    if (
        !Array.isArray(obj.attributes) ||
        (obj.comment !== undefined && typeof obj.comment !== 'string') ||
        !Array.isArray(obj.enumentityatributes) ||
        !Array.isArray(obj.functions) ||
        typeof obj.is_abstract !== 'boolean' ||
        typeof obj.name !== 'string' ||
        !Array.isArray(obj.relations)    
    ) 
    {
        return false
    }

    return true
}

export function isImportedEntity(item: unknown): item is ImportedEntity{
    const obj = item as Record<string, unknown>;
    if (
        typeof obj !== 'object' ||
        obj === null ||
        typeof obj.name !== 'string' ||
        typeof obj.$type !== 'string' || 
        obj.$type !== 'ImportedEntity' ||
        typeof obj.$container !== 'object' || obj.$container === null
    ) {
        return false;
    }

    return true
}

// // EM isManyToMany, isManyToOne e isOneToOne
// // fullName E comment É OPICIONAL ? SE SIM FICA:
// //  (obj.comment !== undefined && typeof obj.comment !== 'string') ||
// //  (obj.fullName !== undefined && typeof obj.fullName !== 'string') ||
// // SENÃO FICA:
// //  typeof obj.comment !== 'string' ||
// //  typeof obj.fullName !== 'string' ||

export function isManyToMany(item: unknown): item is ManyToMany{
    const obj = item as Record<string, unknown>;
    if (
        (obj.comment !== undefined && typeof obj.comment !== 'string') ||
        (obj.fullName !== undefined && typeof obj.fullName !== 'string') ||
        typeof obj.name !== 'string' ||
        typeof obj.type !== 'object' || obj.type === null
    ) {
        return false;
    }

    return true
}

export function isManyToOne(item: unknown): item is ManyToOne{
    const obj = item as Record<string, unknown>;
    if (
        (obj.comment !== undefined && typeof obj.comment !== 'string') ||
        (obj.fullName !== undefined && typeof obj.fullName !== 'string') ||
        typeof obj.name !== 'string' ||
        typeof obj.type !== 'object' || obj.type === null
    ) {
        return false;
    }

    return true
}

export function isOneToOne(item: unknown): item is OneToOne{
    const obj = item as Record<string, unknown>;
    if (
        (obj.comment !== undefined && typeof obj.comment !== 'string') ||
        (obj.fullName !== undefined && typeof obj.fullName !== 'string') ||
        typeof obj.name !== 'string' ||
        typeof obj.type !== 'object' || obj.type === null
    ) {
        return false;
    }

    return true
}

// FUNÇÕES RELACIONADAS A REQUERIMENTS

export function isFunctionalRequirement(item: unknown): item is FunctionalRequirement{
    const obj = item as Record<string, unknown>;
    if (
        typeof obj.id !== 'string' ||
        typeof obj.description !== 'string' ||
        typeof obj.priority !== 'string' ||
        typeof obj.depend !== 'object' || obj.depend === null || !isRequirement(obj.depend)
    ) {
        return false;
    }

    return true
}

export function isNonFunctionalRequirement(item: unknown): item is NonFunctionalRequirement{
    const obj = item as Record<string, unknown>;
    if (
        typeof obj.id !== 'string' ||
        typeof obj.description !== 'string' ||
        typeof obj.priority !== 'string' ||
        typeof obj.depend !== 'object' || obj.depend === null || !isRequirement(obj.depend)
    ) {
        return false;
    }

    return true
}

export function isBussinesRule(item: unknown): item is BussinesRule{
    const obj = item as Record<string, unknown>;
    if (
        typeof obj.id !== 'string' ||
        typeof obj.description !== 'string' ||
        typeof obj.priority !== 'string' ||
        typeof obj.depend !== 'object' || obj.depend === null || !isRequirement(obj.depend)
    ) {
        return false;
    }

    return true
}

//SUGESTÃO DE MELHORIA -> OTIMIZAR isFunctionalRequirement, isNonFunctionalRequirement E isBussinesRule

function isRequirementBase(obj: unknown): obj is {
    id: string;
    description: string;
    priority: string;
    depend: Requirement;
} {
    const o = obj as Record<string, unknown>;
    return (
        typeof o.id === 'string' &&
        typeof o.description === 'string' &&
        typeof o.priority === 'string' &&
        typeof o.depend === 'object' &&
        o.depend !== null &&
        isRequirement(o.depend)
    );
}

// export function isFunctionalRequirement(item: unknown): item is FunctionalRequirement { return isRequirementBase(item); }

// export function isNonFunctionalRequirement(item: unknown): item is NonFunctionalRequirement { return isRequirementBase(item); }

// export function isBussinesRule(item: unknown): item is BussinesRule { return isRequirementBase(item); }