import {Actor, Model, Requirement, BussinesRule, FunctionalRequirement, UseCase, Event} from "../model/models.ts";
import {SparkApplication} from "../spark/application.ts";
import {MadeApplication} from "../made/application.ts";
import {DocumentationApplication} from "../documentation/application.ts";
import { test , expect } from 'vitest'
import fs from "fs"
import path from "path"


const myActor: Actor = {
    name: "Actor",
    comment: "This is an actor",
}

const myBusinessRule: BussinesRule = {
    id: "BR01",
    description: "Business rule description",
    priority:"High",
    depends: [],

}

const myFunctionalRequirement: FunctionalRequirement = {
    id: "FR01",
    description:"Functional requirement description",
    priority:"High",
    depends: [],
}

const myFunctionalRequirement2: FunctionalRequirement = {
    id: "FR02",
    description:"Functional requirement description",
    priority:"High",
    depends: [myFunctionalRequirement],
}

const myRequirement: Requirement = {
    id:"1",
    name:"Requirement 1",
    description: "This is a requirement",
    requirements: [myFunctionalRequirement,myBusinessRule,myFunctionalRequirement2]
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