import { NameSpacePertencer } from "../superclasses";
import { DependableSuperType, NameSpaceSuperType } from "../supertypes";


export class TaskClass extends NameSpacePertencer implements DependableSuperType<TaskClass>
{
    depends: TaskClass[];
    name: string;

    public constructor(identifier: string, name: string, nameSpaceRef: NameSpaceSuperType, description: string = "", depends: TaskClass[] = [])
    {
        super(identifier, nameSpaceRef, description);
        this.name = name;
        this.depends = depends;
    }
}

