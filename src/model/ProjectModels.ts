import { UseCase } from "./madeModels";
import { Actor } from "./models";
import { Requirements } from "./RequirimentsModels";
import { Package } from "./sparkModels";

export interface Overview
{
    name: string;
    description: string;
    purpose: string;
    miniwolrd: string;
    architecture: string;
}


export interface Module
{
    identifier: string;
    name: string;
    description: string;
    purpose: string;
    miniwolrd: string;
    packages: Package[];
    requisites: Requirements;
    useCases: UseCase[];
    actors: Actor[];
}


export interface Project
{
    overview: Overview;
    modules: Module[];
}

