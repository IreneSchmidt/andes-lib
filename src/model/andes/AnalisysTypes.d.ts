import { EntityType } from "../spark/EntityTypes";
import { BaseSuperType, DependableSuperType } from "../supertypes";
import { RequirimentsBaseType } from "./RequirimentsTypes";


export interface ActorType extends BaseSuperType
{
    targetType: EntityType;
}


export interface EventType extends DependableSuperType<EventType>
{
    action?: string;
    requiriments?: RequirimentsBaseType[];
    performer?: ActorType[];

    ucRef: UseCaseType;
}


export interface UseCaseType extends DependableSuperType<UseCaseType>
{
    requiriments?: RequirimentsBaseType[];
    performer?: ActorType[];
    event?: EventType[];
}

