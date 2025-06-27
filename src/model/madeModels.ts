import { Actor, Requirements, Event} from "./models";

export type Sprint = {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
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