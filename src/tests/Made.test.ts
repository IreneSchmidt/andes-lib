/*
import {Actor, Event, Model, UseCase} from "../model/models";

const myUsecase: UseCase = {
    actors: [],
    depends: [],
    description: 'Exemplo de caso de uso',
    events: [],
    id: 'UC01',
    name: 'Exemplo de Caso de Uso',
    requirements: []
}

const myActor: Actor = {
    name: "Ator de Exemplo",
    comment: "gbnecrtiucghu",
}

const myEvent : Event = {
    id: 'EV01',
    name: 'Evento de Exemplo',
    description: 'Descrição do evento de exemplo',
    action: 'Ação do evento de exemplo',
    requirements: [],
    depends: [],
    performer: myActor
    
}

const myUsecase2: UseCase = {
    actors: [myActor],
    depends: [myUsecase],
    description: 'Exemplo de caso de uso 2',
    events: [myEvent],
    id: 'UC02',
    name: 'Caso de Uso 2',
    requirements: []
}

const exampleModel: Model = {
    modules: [],
    Usecases: [
        myUsecase, myUsecase2
    ],
    components: [],
    project: {
        id: 'PRJ001',
        name: 'Sistema de Gestão de Usuários',
        description: 'Projeto responsável pela gestão de contas de usuários',
        startDate: '2025-01-01',
        dueDate: '2025-12-31',
        purpose: 'Gerenciar autenticação e cadastro de usuários',
        miniworld: 'Gerencia usuários, autenticação e permissões',
        name_fragment: 'user-management',
        architecture: 'python'
    }
};
import ApplicationCreator from "../application/ApplicationCreator";

describe("ApplicationCreator", () => {
    it("should create a valid application structure", () => {
        const targetFolder = "./test-output";
        const creator = new ApplicationCreator(exampleModel, targetFolder);
        
        expect(() => creator.create()).not.toThrow();
        
        // Check if the files were created
        const fs = require('fs');
        expect(fs.existsSync(`${targetFolder}/${exampleModel.project.name}.spark`)).toBe(true);
        expect(fs.existsSync(`${targetFolder}/${exampleModel.project.name}.made`)).toBe(true);
    });
});
*/

import { describe, it } from "node:test";

import { team } from "./data/times"
import { roadmap } from "./data/roadmap"
import { backlog } from "./data/backlog";
import { MadeEpicRender, MadeStoryRender, MadeTaskRender } from "../renders/made/MadeBacklogItems";
import { Task } from "../model/madeModels";
import { sprint } from "./data/sprints";

import MadeSprintRender, { MadeSprintBacklogRender, MadeSprintItemRender } from "../renders/made/MadeSprint";
import MadeTeamMemberRender from "../renders/made/MadeTeamMemberRender";
import MadeRoadmapRender from "../renders/made/MadeRoadmapRender";
import MadeMileStoneRender from "../renders/made/MadeMilestoneRender";
import MadeReleaseRender from "../renders/made/MadeReleaseRender";
import MadeBacklogRender from "../renders/made/MadeBacklogRender";
import MadeFileRender from "../renders/made/MadeFileRender"
import MadeProjectRender from "../renders/made/MadeProjectRender";
import MadeTeamRender from "../renders/made/MadeTeamRender";
import { mkdirSync, writeFileSync } from "fs";


const project = new MadeProjectRender(new Date(), new Date(), "Project Name", "Some Module Name", "Description");
const teams = [new MadeTeamRender(team.identifier, team.name, team.description, team.members.map(m => new MadeTeamMemberRender(m.identifier, m.name, m.email, m.discord)))]

function taskToMadeRenderObj(t: Task): MadeTaskRender
{
    return new MadeTaskRender(t.identifier, t.name, t.deliverables, t.depends.map(d => `SimpleBacklog.SimpleEpic.${d.identifier}`));
}

const backlogs = [new MadeBacklogRender(backlog.identifier, backlog.name, backlog.description, backlog.epics.map(e=>new MadeEpicRender(e.identifier, e.name, e.observation, e.criterions, e.stories.map(s => new MadeStoryRender(s.identifier, s.name, s.observation, s.criterions, s.tasks.map(t => taskToMadeRenderObj(t)))))))]

const roadmaps = [new MadeRoadmapRender(roadmap.identifier, roadmap.name, roadmap.description,
    new MadeMileStoneRender(roadmap.milestones.identifier, roadmap.milestones.name, roadmap.milestones.description, roadmap.milestones.startDate, roadmap.milestones.dueDate, roadmap.milestones.status,
        new MadeReleaseRender(roadmap.milestones.relase.identifier, roadmap.milestones.relase.description, roadmap.milestones.relase.status, roadmap.milestones.relase.startDate, roadmap.milestones.relase.dueDate, roadmap.milestones.relase.version, ["SimpleBacklog.SimpleEpic"])
    ))
]

const sprints = [new MadeSprintRender(sprint.identifier, sprint.name, sprint.description, sprint.startDate, sprint.endDate, sprint.status, [new MadeSprintBacklogRender(
        sprint.backlogs.identifier,
        sprint.backlogs.items.map( i => new MadeSprintItemRender(i.identifier, i.memberReference, i.dueDate, i.status) )
    )]
)]

describe("Test Made Generator", ()=>{
    it("Shoud create some .made file", ()=>{
        const targetFolder = "./out/made/";
        const creator = new MadeFileRender(project, teams, roadmaps, backlogs, sprints);

        mkdirSync(targetFolder, {recursive: true});
        writeFileSync(`${targetFolder}test.made`, creator.render());
    })
})

