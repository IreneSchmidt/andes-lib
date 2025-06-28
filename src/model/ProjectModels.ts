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
    name: string;
    description: string;
    purpose: string;
    miniwolrd: string;
    packages: Package[];
    requisites: Requirements;
}


export interface Project
{
    overview: Overview;
    modules: Module[];
}

