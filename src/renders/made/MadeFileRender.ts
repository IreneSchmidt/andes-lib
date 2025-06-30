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
        const teams = this.teams.map(t => t.render()).join('\n');
        const roadmap = this.roadmaps.map(r => r.render()).join('\n');
        const backlog = this.backlogs.map(b => b.render()).join('\n');
        const sprint = this.sprints.map(s => s.render()).join('\n');

        return `${projct}\n\n${teams}\n\n${roadmap}\n\n${backlog}\n\n${sprint}`;
    }
}

