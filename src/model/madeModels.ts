import { Actor, Requirements} from "./models";

export type TeamMember = {
    name: string;
    identifier: string;
    email: string;
    discord: string;
}

export type Team = {
    identifier: string;
    name: string;
    description: string;
    members: TeamMember[];
}

export type SprintBacklogItem = {
    identifier: string,
    memberReference: string,
    dueDate: Date,
    status: string,
}

export type SprintBacklog = {
    identifier: string,
    items: SprintBacklogItem[]
}

export type Sprint = {
    identifier: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
    backlogs: SprintBacklog;
}

export type UseCase = {
    actors: Array<Actor>;
    depends: Array<UseCase>;
    description: string;
    events: Array<Event>;
    id: string;
    name: string;
    requirements: Array<Requirements>
}

export type Event = {
    id: string;
    name: string;
    description: string;
    action: string;
    requirements: Array<Requirements>;
    depends: Array<Event>;
    performer: Actor
}

export type Task = {
    identifier: string;
    name: string;
    deliverables: string[];
    depends: Task[];
}

export type Process = {
    identifier: string;
    name: string;
    description: string;
    tasks: Task[];
}

export type Story = {
    identifier: string;
    name: string;
    criterions: string[];
    observation: string;
    tasks: Task[];
}

export type Epic = {
    identifier: string;
    name: string;
    process: Process;
    criterions: string[];
    observation: string;
    stories: Story[];
}

export type Backlog = {
    identifier: string;
    name: string;
    description: string;
    epics: Epic[];
}

export type Release = {
    identifier: string;
    description: string;
    item: Epic;
    status: string;
    startDate: Date;
    dueDate: Date;
    version: string;
}

export type Milestone = {
    identifier: string;
    name: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    status: string;
    relase: Release; 
}

export type Roadmap = {
    identifier: string;
    name: string;
    description: string;
    milestones: Milestone;
}

