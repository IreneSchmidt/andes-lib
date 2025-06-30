import { normalize } from "path";
import { Module } from "../../../model/ProjectModels";
import MadeProjectRender from "../../../renders/made/MadeProjectRender";
import { MadeEpicRender } from "../../../renders/made/MadeBacklogItems";
import { UseCase } from "../../../model/madeModels";
import DefaultStories from "../defaults/DefaultStories";
import MadeTeamRender from "../../../renders/made/MadeTeamRender";
import MadeRoadmapRender from "../../../renders/made/MadeRoadmapRender";
import MadeBacklogRender from "../../../renders/made/MadeBacklogRender";
import MadeSprintRender from "../../../renders/made/MadeSprint";
import DefaultEpics from "../defaults/DefaultEpics";
import DefaultBacklog from "../defaults/DefaultBacklog";


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
    static parse(module: Module): MadeCompleteData
    {
        return {
            project: MadeProjectParser.toMadeProject(module),
            backlogs: [DefaultBacklog.create(module)],
            roadmaps: [], // TODO: not implemented yet
            sprints: [], // TODO: not implemented yet
            teams: [], // TODO: not implemented yet
        }
    }

    private static toMadeProject(module: Module): MadeProjectRender
    {
        return new MadeProjectRender(
            new Date(),
            new Date(),
            normalize(module.name),
            module.name,
            module.description,
        );
    }
}

