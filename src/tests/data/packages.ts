import { AttributeType, EntityType, EnumAttributeType } from "../../model/spark/EntityTypes";
import { EnumEntityType } from "../../model/spark/EnumTypes";
import { PackageType } from "../../model/spark/PackageTypes";


export const nome: AttributeType = {
    identifier: "nome",
    blank: false,
    unique: false,
    type: "string",
}


export const codigo: AttributeType = {
    identifier: "codigo",
    type: "string",
    blank: false,
    unique: false,
}


export const escola: EntityType = {
    attributes: [nome],
    relationsAttr: [],
    enums: [],
    identifier: "Escola"
}


export const simpleEnum: EnumEntityType = {
    identifier: "Semestre",
    options: ["primeiro", "segundo"]
}


export const matricula: EntityType = {
    identifier: "Matricula",
    attributes: [codigo],
    enums: [],
    relationsAttr: [{identifier: "escola", relationType: "ManyToOne", targetObject: escola}],
}


export const aluno: EntityType = {
    identifier: "Aluno",
    attributes: [nome],
    enums: [{ identifier: "SemestreIngresso", type: simpleEnum }],
    relationsAttr: [{identifier: "matricula", relationType: "OneToOne", targetObject: matricula}],
}


export const package1: PackageType = {
    identifier: "Pacote1",
    description: "Descrição do Pacote 1",
    entities: [escola, matricula, aluno],
    enums: [simpleEnum],
} 

