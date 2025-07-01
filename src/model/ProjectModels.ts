import { UseCaseType } from "./madeModels";
import { Actor } from "./models";
import { RequirementsInterface } from "./RequirimentsModels";
import { Package } from "./SparkModels";

export interface Overview
{
    name: string;
    description: string;
    purpose: string;
    miniwolrd: string;
    architecture: string;
}


export interface ModuleInterface
{
    identifier: string;
    name: string;
    description: string;
    purpose: string;
    miniwolrd: string;
    packages: Package[];
    requisites: RequirementsInterface;
    useCases: UseCaseType[];
    actors: Actor[];
}


export interface ProjectInterface
{
    overview: Overview;
    modules: ModuleInterface[];
}

