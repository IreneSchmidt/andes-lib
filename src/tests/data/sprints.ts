import { Sprint, SprintBacklog, SprintBacklogItem } from "../../model/madeModels";


export const item1: SprintBacklogItem = {
    identifier: "Item1",
    dueDate: new Date(),
    status: "SomeStatus1",
    memberReference: "teamember.reference.1",
}


export const item2: SprintBacklogItem = {
    identifier: "Item2",
    dueDate: new Date(),
    status: "SomeStatus2",
    memberReference: "teamember.reference.2",
}


export const sprintBacklog: SprintBacklog = {
    identifier: "SimpleSprintBacklog",
    items: [item1, item2],
}


export const sprint: Sprint = {
    name: "Simple Sprint",
    identifier: "SimpleSprint",
    description: "Simple Description",
    endDate: new Date(),
    startDate: new Date(),
    status: "Status",
    backlogs: sprintBacklog,
}

