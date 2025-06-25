import { BuisinesRule, FunctionalRequirement, NonFunctionalRequirement, ProjectModule } from "../model/newModels";
import { DocusaurusModuleCreator } from "../application/DocusaurusCreator";
import { expect, describe, it } from 'vitest'


const aux = new FunctionalRequirement("Dependência", "Baixa", "Mais uma descrição");
const aux2 = new FunctionalRequirement("Outro Teste", "Média", "Outra descrição", [ aux ])
aux.addDepedencie(aux2);

const justTestIt: ProjectModule = {
    id: "Some ID",
    miniworld: "Module Mini Wolrd",
    name: "Module Test Name",
    purpose: "Module Propourse",
    requiriments: {
        buisinesRule: [
            new BuisinesRule("Test", "Não pode dar merda né!"),
        ],
        functional: [
            new FunctionalRequirement("TESTE", "ALTA", "Feito para Teste"),
            aux,
            aux2
        ],
        nonFunctional: [new NonFunctionalRequirement("Teste", "Mais um TESTE PQP")],
    }
};

const docusaurus = new DocusaurusModuleCreator(justTestIt, `./documentation`);

describe("Generate Spark", ()=> {
    docusaurus.create();
});

