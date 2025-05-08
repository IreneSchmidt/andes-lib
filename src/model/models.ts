export type Project = {
    id: string;
    name: string;
    description: string;
    purpose: string;
    miniworld: string;
    architecture: 'python' | 'java' |'csharp-minimal-api'|'csharp-clean-architecture'|'charp-pipeline'
}

//-----------REQUIREMENT--------------
export type Requirements = {
    id: string;
    name: string;
    description: string;
    requirement: FunctionalRequirement|NonFunctionalRequirement|BussinesRule
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