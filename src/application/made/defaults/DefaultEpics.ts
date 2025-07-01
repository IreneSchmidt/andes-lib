import { UseCaseType } from "../../../model/madeModels";
import { Package } from "../../../model/sparkModels";
import { MadeEpicRender, MadeStoryRender, MadeTaskRender } from "../../../renders/made/MadeBacklogItems";
import DefaultStories from "./DefaultStories";


export default class DefaultEpics
{
    static createDiagramModel(pkgs: Package[], backlogName: string): MadeEpicRender
    {
        return new MadeEpicRender(
            "domaindiagram",
            "Create Problem Domain Modules",
            "",
            [],
            pkgs.map(pkg => DefaultStories.buildDefaultStoryToPackage(pkg, backlogName)),
            "Create Problem Domain Modules"
        );
    }

    static defaultEpicFromUsecase(uc: UseCaseType): MadeEpicRender
    {
        return new MadeEpicRender(
            uc.identifier,
            uc.name,
            "",
            [],
            uc.events.map((e, i) => DefaultStories.buildDefaultStoryToEvent(e, i)),
            uc.description
        );
    }
}

