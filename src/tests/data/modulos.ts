import { ProjectModuleType } from "../../model/andes/ProjectTypes"
import { actors1, actors2 } from "./actors"
import { package1 } from "./packages"
import { requiriments } from "./requisitos"
import { uc1, uc2 } from "./usecases"


export const module1: ProjectModuleType = {
    name: "Módulo 1",
    description: "Descrição do Módulo 1",
    miniwolrd: "Minimundo do módulo",
    purpose: "Propósito do Módulo",
    requisites: requiriments,
    packages: [package1],
    actors: [actors1, actors2],
    uc: [uc1, uc2],
    identifier: "Modulo1"
}

