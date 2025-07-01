import { UseCaseType } from "../../../model/madeModels";
import { ModuleInterface } from "../../../model/ProjectModels";
import { Package } from "../../../model/sparkModels";
import { MadeStoryRender, MadeTaskRender } from "../../../renders/made/MadeBacklogItems";
import { EventType } from "../../../model/madeModels";


export default class DefaultStories
{
    static buildDefaultStoryToPackage(pkg: Package, backlogName: string): MadeStoryRender
    {
        return new MadeStoryRender(
            `createmodule_${pkg.name}`,
            `Create database infrastruture to module ${pkg.name}`,
            "", [],
            DefaultStories.buildDefaultTasks(pkg, backlogName),
        )
    }

    private static buildDefaultTasks(pkg: Package, backlogName: string): MadeTaskRender[]
    {
        return [
            new MadeTaskRender("create_module", "Implements domain modules", []),
            new MadeTaskRender("create_repository", "Implements data repository", [], [`${backlogName}.domaindiagram.createmodule_${pkg.name}.create_module`]),
        ]
    }

    static buildDefaultStoryToEvent(event: EventType, index: number = 0): MadeStoryRender
    {
        return new MadeStoryRender(
            `${event.identifier}_${index}`,
            event.name,
            event.description,
            [],
            []
        )
    }
}

