import { ModuleInterface } from "../../../model/ProjectModels";
import MadeBacklogRender from "../../../renders/made/MadeBacklogRender";
import DefaultEpics from "./DefaultEpics";

export default class DefaultBacklog
{
    static create(module: ModuleInterface): MadeBacklogRender
    {
        const epics = module.useCases.map(uc => DefaultEpics.defaultEpicFromUsecase(uc));
        epics.push(DefaultEpics.createDiagramModel(module.packages));

        return new MadeBacklogRender(
            module.identifier,
            module.name,
            module.description,
            epics
        )
    }
}

