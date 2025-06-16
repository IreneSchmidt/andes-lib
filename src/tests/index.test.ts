import {Actor, Model, Requirement, UseCase, Event, createBusinessRule, createFunctionalRequirement, createNonFunctionalRequirement, isRequirement, isBusinessRule, isFunctionalRequirement, isNonFunctionalRequirement} from "../model/models.ts";
import {SparkApplication} from "../spark/application.ts";
import {MadeApplication} from "../made/application.ts";
import {DocumentationApplication} from "../documentation/application.ts";
import { test , expect, describe, it } from 'vitest'
import fs from "fs"
import path from "path"


const myActor: Actor = {
    name: "Actor",
    comment: "This is an actor",
}

const myBusinessRule1 = createBusinessRule("BR01", "Business rule description", "High");

const myFunctionalRequirement = createFunctionalRequirement("FR01", "Functional requirement description", "High");

const myFunctionalRequirement2 = createFunctionalRequirement(
    "FR02",
    "Another functional requirement",
    "High",
    [myFunctionalRequirement]
);

const myNonFunctionRequirement1 = createNonFunctionalRequirement('NFR1', 'Non Func Req 1', 'Low');
const myNonFunctionRequirement2 = createNonFunctionalRequirement('NFR2', 'Non Func Req 1', 'Low', [myNonFunctionRequirement1]);



const myRequirement: Requirement = {
    id:"1",
    name:"Requirement 1",
    description: "This is a requirement",
    requirements: [myFunctionalRequirement,myBusinessRule1,myFunctionalRequirement2, myNonFunctionRequirement1, myNonFunctionRequirement2],
}

const myEvent: Event = {
    id: "Event01",
    name: "Nome do meu evento",
    description: "This is my event description",
    action: "This is my event action",
    requirements:[myFunctionalRequirement],
    depends: [],
    performer: myActor,

}

const myUseCase: UseCase = {
    actors: [myActor],
    depends:[],
    events:[myEvent],
    id: "UC01",
    name: "My Use Case",
    description: "This is my use case description",
    requirements:[myFunctionalRequirement],

}

const myModel: Model = {
    project: {
        id: "MyProject",
        purpose: "This is my project purpose.",
        name: "My Awesome Project",
        description: "This is a description of my awesome project.",
        architecture: "java",
        name_fragment: "Nome Do Projeto",
        miniworld: "This is a miniworld description.",
    },
    components: [
        myRequirement,
        myActor,
        myUseCase
    ]
};

//Aqui ele ta definindo o caminho onde o arquivo .spark será gerado
const myTargetFolder: string = "./src/tests/generated-files"; 

test("SparkApplication Test", ()=>{const sparkApp = new SparkApplication
    (myModel, myTargetFolder);
    sparkApp.create();

    const expectedFile = path.join(myTargetFolder, "./spark/myproject.spark"); 
    expect(fs.existsSync(expectedFile)).toBe(true); // <--- Verifica se realmente a pasta foi criada, se ela existe após execução feita
 });

test("MadeApplication Test", ()=>{const madeApp = new MadeApplication
    (myModel, myTargetFolder);
    madeApp.create();

    const expectedFile = path.join(myTargetFolder, "./made/myproject.made"); 
    expect(fs.existsSync(expectedFile)).toBe(true); 
});

test("DocumentationAplication Test", ()=>{const DocsApp = new DocumentationApplication
    (myModel, myTargetFolder);
    DocsApp.create();
});

describe('Filtragem de tipos de Requirement', () => {
    
    it('Deve filtrar corretamente FunctionalRequirements', () => {
        // Mock de Requirements dentro de um Requirement
        const fr1 = myFunctionalRequirement;
        const fr2 = myFunctionalRequirement2;

        const functionalRequirements = myModel.components
            .filter(isRequirement)
            .flatMap(requirements => requirements.requirements?.filter(isFunctionalRequirement))
            .filter(requirement => requirement != undefined);

        console.log("Functional Requirements: ", functionalRequirements);

        expect(functionalRequirements).toHaveLength(2);
        expect(functionalRequirements.map(fr => fr.id)).toEqual(['FR01', 'FR02']);
    });

    it('Deve filtrar corretamente NonFunctionalRequirements', () => {
        const nfr1 = myNonFunctionRequirement1;
        const nfr2 = myNonFunctionRequirement2;

        const nonFunctionalRequirements = myModel.components
            .filter(isRequirement)
            .flatMap(requirements => requirements.requirements?.filter(isNonFunctionalRequirement))

        console.log("Non Functional Requirements: ", nonFunctionalRequirements);

        expect(nonFunctionalRequirements).toHaveLength(2);
        expect(nonFunctionalRequirements.map(nfr => nfr.id)).toEqual(['NFR1', 'NFR2']);
    });

    it('Deve filtrar corretamente BusinessRules', () => {
        const br1 = myBusinessRule1;

        const businessRules = myModel.components
            .filter(isRequirement)
            .flatMap(requirements => requirements.requirements?.filter(isBusinessRule))
            .filter(requirement => requirement != undefined);

        console.log("Business Rules: ", businessRules);

        expect(businessRules).toHaveLength(1);
        expect(businessRules[0].id).toBe('BR01');
    });
});

 