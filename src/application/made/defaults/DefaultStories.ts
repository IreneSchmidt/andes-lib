import { UseCase } from "../../../model/madeModels";
import { Module } from "../../../model/ProjectModels";
import { Package } from "../../../model/sparkModels";
import { MadeStoryRender, MadeTaskRender } from "../../../renders/made/MadeBacklogItems";
import { Event } from "../../../model/madeModels";


export default class DefaultStories
{
    static buildDefaultStoryToPackage(pkg: Package): MadeStoryRender
    {
        return new MadeStoryRender(
            `createmodule_${pkg.name}`,
            `Create database infrastruture to module ${pkg.name}`,
            "", [],
            DefaultStories.buildDefaultTasks(pkg),
        )
    }

    private static buildDefaultTasks(pkg: Package): MadeTaskRender[]
    {
        return [
            new MadeTaskRender("create_module", "Implements domain modules", []),
            new MadeTaskRender("create_repository", "Implements data repository", [], [`domaindiagram.createmodule_${pkg.name}.create_module`]),
        ]
    }

    static buildDefaultStoryToEvent(event: Event, index: number = 0): MadeStoryRender
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

