import { ModuleInterface } from "../../model/ProjectModels"
import { actors1, actors2 } from "./actors"
import { package1 } from "./packages"
import { requiriments } from "./requisitos"
import { uc1 } from "./usecases"


export const module1: ModuleInterface = {
    name: "Módulo 1",
    identifier: "M01",
    description: "Descrição do Módulo 1",
    miniwolrd: "Minimundo do módulo",
    purpose: "Propósito do Módulo",
    requisites: requiriments,
    packages: [package1],
    actors: [actors1, actors2],
    useCases: [uc1]
}

