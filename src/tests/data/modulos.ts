import { Module } from "../../model/ProjectModels"
import { package1 } from "./packages"
import { requiriments } from "./requisitos"


export const module1: Module = {
    name: "Módulo 1",
    description: "Descrição do Módulo 1",
    miniwolrd: "Minimundo do módulo",
    purpose: "Propósito do Módulo",
    requisites: requiriments,
    packages: [package1],
}

