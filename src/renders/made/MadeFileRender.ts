import IRender from "../IRender";
import MadeProjectRender from "./MadeProjectRender";
import MadeTeamRender from "./MadeTeamRender";
import MadeRoadmapRender from "./MadeRoadmapRender";
import MadeBacklogRender from "./MadeBacklogRender";
import MadeSprintRender from "./MadeSprint";


export default class MadeFileRender implements IRender
{
    private project: MadeProjectRender;
    private teams: MadeTeamRender[];
    private roadmaps: MadeRoadmapRender[];
    private backlogs: MadeBacklogRender[];
    private sprints: MadeSprintRender[];



    public constructor(project: MadeProjectRender, teams: MadeTeamRender[], roadmaps: MadeRoadmapRender[], backlogs: MadeBacklogRender[], sprints: MadeSprintRender[])
    {
        this.project = project;
        this.teams = teams;
        this.roadmaps = roadmaps;
        this.backlogs = backlogs;
        this.sprints = sprints;
    }
    
    public render(identationStartLevel: number = 0): string
    {
        const projct = this.project.render();
        const teams = this.renderArray(this.teams);
        const roadmap = this.renderArray(this.roadmaps);
        const backlog = this.renderArray(this.backlogs);
        const sprint = this.renderArray(this.sprints);

        return `${projct}${teams}${roadmap}${backlog}${sprint}`;
    }

    private renderArray(array: IRender[]): string
    {
        if (array.length == 0)
            { return ""; }
        return `\n\n${array.map(item => item.render()).join('\n')}`;
    }
}

