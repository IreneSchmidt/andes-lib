import { normalize } from "path";
import MadeProjectRender from "../../../renders/made/MadeProjectRender";
import MadeTeamRender from "../../../renders/made/MadeTeamRender";
import MadeRoadmapRender from "../../../renders/made/MadeRoadmapRender";
import MadeSprintRender from "../../../renders/made/MadeSprint";
import DefaultBacklog from "../defaults/DefaultBacklog";
import { ProjectModuleType } from "../../../model/andes/ProjectTypes";
import MadeBacklogRender from "../../../renders/dsl/made/MadeBacklogRender";


export interface MadeCompleteData
{
    project: MadeProjectRender;
    teams: MadeTeamRender[];
    roadmaps: MadeRoadmapRender[];
    backlogs: MadeBacklogRender[];
    sprints: MadeSprintRender[];
}


export class MadeProjectParser
{
    static parse(module: ProjectModuleType): MadeCompleteData
    {
        return {
            project: MadeProjectParser.toMadeProject(module),
            backlogs: [DefaultBacklog.create(module)],
            roadmaps: [], // TODO: not implemented yet
            sprints: [], // TODO: not implemented yet
            teams: [], // TODO: not implemented yet
        }
    }

    private static toMadeProject(module: ProjectModuleType): MadeProjectRender
    {
        return new MadeProjectRender(
            new Date(),
            new Date(),
            normalize(module.name),
            module.name,
            module.description??"",
        );
    }
}

