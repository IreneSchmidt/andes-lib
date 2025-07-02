import { Milestone, Release, Roadmap } from "../../model/madeModels";
import { epic } from "./backlog";


export const release: Release = {
    identifier: "SimpleRelease",
    description: "Simple Description to Release",
    dueDate: new Date(),
    startDate: new Date(),
    status: "Status",
    item: epic,
    version: "1.0",
}

export const milestone: Milestone = {
    identifier: "SimpleMilestone",
    name: "Simple Milestone",
    description: "Simple Description",
    startDate: new Date(),
    dueDate: new Date(),
    status: "Status",
    relase: release,
}


export const roadmap: Roadmap = {
    identifier: "SimpleRoadmap",
    name: "Simple Roadmap",
    description: "Description to Simple Rodmap",
    milestones: milestone,
}

