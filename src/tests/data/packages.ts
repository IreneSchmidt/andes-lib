import { Entity, Package, Attributes, Enumerate } from "../../model/sparkModels";


export const nome: Attributes = {
    name: "Nome",
    _type: "string",
    blank: false,
    unique: false,
}


export const codigo: Attributes = {
    name: "codigo",
    _type: "string",
    blank: false,
    unique: false,
}


export const escola: Entity = {
    name: "Escola",
    attributes: [nome],
    relashionShips: [],
    enumAttributes: []
}


export const simpleEnum: Enumerate = {
    name: "Semestre",
    options: ["primeiro", "segundo"]
}


export const matricula: Entity = {
    name: "Matricula",
    attributes: [codigo],
    enumAttributes: [],
    relashionShips: [{name: "escola", _relationType: "ManyToOne", relationDestination: escola}],
}


export const aluno: Entity = {
    name: "Aluno",
    attributes: [nome],
    enumAttributes: [{ name: "SemestreIngresso", _type: simpleEnum }],
    relashionShips: [{name: "Matrícula", _relationType: "OneToOne", relationDestination: matricula}],
}


export const package1: Package = {
    name: "Pacote1",
    description: "Descrição do Pacote 1",
    entityes: [escola, matricula, aluno],
    enums: [simpleEnum],
    subPackages: []
} 

