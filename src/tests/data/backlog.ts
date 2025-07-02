import { Backlog, Epic, Process, Story, Task } from "../../model/madeModels";


export const task1: Task = {
    name: "Simple Task 1",
    identifier: "SimpleTask1",
    depends: [],
    deliverables: ["Deliverable1"],
}


export const task2: Task = {
    name: "Simple Task 2",
    identifier: "SimpleTask2",
    depends: [task1],
    deliverables: ["Deliverable1", "Deliverable 2"],
}


export const process: Process = {
    identifier: "SimpleProcess",
    name: "Simple Process",
    description: "Simple Process Description",
    tasks: [task1, task2],
}


export const story: Story = {
    identifier: "SimpleStory1",
    name: "Simple Story 1",
    observation: "Some Obs about SimpleStory1",
    criterions: ["Criterion 1", "Criterion 2"],
    tasks: [task1, task2],
}


export const epic: Epic = {
    identifier: "SimpleEpic",
    name: "Simple Epic",
    criterions: ["Simple Criterion 1", "Simple Criterion 2"],
    observation: "Some Obs about simple epic",
    process: process,
    stories: [story],
}


export const backlog: Backlog = {
    name: "Simple Backlog",
    identifier: "SimpleBacklog",
    description: "Simple Backlog Description",
    epics: [epic],
}

