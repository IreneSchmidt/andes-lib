import { EntityType } from "../spark/EntityTypes";
import { NameSpaceStarter } from "../superclasses";
import { BaseSuperType, DependableSuperType, NameableSuperType } from "../supertypes";
import { RequirimentsBaseType } from "./RequirimentsTypes";


export interface ActorType extends BaseSuperType
{
    targetType?: EntityType;
}


export interface EventType extends DependableSuperType<EventType>
{
    action?: string;
    requiriments?: RequirimentsBaseType[];
    performer?: ActorType[];

    ucRef: UseCaseClass;
}


export class UseCaseClass extends NameSpaceStarter implements DependableSuperType<UseCaseClass>, NameableSuperType
{
    name: string;
    requiriments?: RequirimentsBaseType[];
    performer?: ActorType[];
    event?: EventType[];

    public constructor(identifier: string, name: string, description: string = "", requiriments: RequirimentsBaseType[] = [], actors: ActorType = [], events: EventType[] = [])
    {
        super(identifier, description);
        this.name = name;
        this.requiriments = requiriments;
        this.performer = actors;
        this.event = events;
    }
}

