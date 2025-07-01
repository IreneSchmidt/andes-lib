import { NameSpacePertencer, NameSpaceStarter } from "../superclasses";
import { NameableSuperType, NameSpaceSuperType } from "../supertypes";
import { TaskClass } from "./TaskClass";


export class StoryClass extends NameSpacePertencer implements NameableSuperType
{
    name: string;
    tasks: TaskClass[];

    public constructor(identifier: string, name: string, namespaceRef: NameSpaceSuperType, description: string = "", tasks: TaskClass[] = [])
    {
        super(identifier, namespaceRef, description);
        this.name = name;
        this.tasks = tasks;
    }
}


export class EpicClass extends NameSpacePertencer implements NameableSuperType
{
    name: string;
    stories: StoryClass[];
    tastks: TaskClass[];

    public constructor(identifier: string, name: string, namespaceRef: NameSpaceSuperType, description: string = "", stories: StoryClass[] = [], tasks: TaskClass[] = [])
    {
        super(identifier, namespaceRef, description);
        this.name = name;
        this.stories = stories;
        this.tastks = tasks;
    }
}


export class BacklogClass extends NameSpaceStarter implements NameableSuperType
{
    name: string;
    stories?: StoryClass[];
    tasks?: TaskClass[];
    epics?: EpicClass[];

    public constructor(name: string, identifier: string, description: string = "", epics: EpicClass[] = [], stories: StoryClass[] = [], tasks: TaskClass[] = [])
    {
        super(identifier, description);
        this.name = name;
        this.epics = epics;
        this.stories = stories;
        this.tasks = tasks;
    }
}

