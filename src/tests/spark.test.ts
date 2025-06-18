import {Model, Project, Module, EnumX, AttributeEnum, LocalEntity, Attribute} from "../model/models.ts";
import SparkFileRender from "../renders/spark/SparkFileRender.ts"
import { expect, describe, it } from 'vitest'


const project: Project = {
        id: "MyProject",
        purpose: "This is my project purpose.",
        name: "MyAwesomeProject",
        description: "This is a description of my awesome project.",
        architecture: "java",
        name_fragment: "Nome Do Projeto",
        miniworld: "This is a miniworld description.",
    };

const enum1Op1: AttributeEnum = {
    comment: "Test Comment",
    name: "Enum1Op1",
    fullName: "",
}

const enum1Op2: AttributeEnum = {
    comment: "Test Comment",
    name: "Enum1Op2",
    fullName: "",
}

const enum1: EnumX = {
    attributes: [enum1Op1, enum1Op2],
    comment: "Enum1 Comment",
    name: "Enum1"
}

const personAttrNome: Attribute = {
    blank: false,
    comment: "comment",
    fullName: "",
    max: 0,
    min: 1,
    name: "_name",
    type: "string",
    unique: true,
}

const localEntityPerson: LocalEntity = {
    attributes: [personAttrNome],
    comment: "Person Comment",
    is_abstract: false,
    name: "Person",
}

const module1: Module = {
    description: "descrição de teste",
    enumXs: [enum1],
    localEntityes: [localEntityPerson],
    name: "Module1",
}

const projectModules: Module[] = [module1];

const model: Model = {
    components: [],
    modules: projectModules,
    project: project,
}

describe("Generate Spark", ()=> {
    let sparkFR = new SparkFileRender(model.project, model.modules);
    let expectContent = `Configuration {
	software_name: "MyAwesomeProject"
	about: "This is a description of my awesome project."
	language: java
}

// descrição de teste
module Module1 { 
	// Person Comment
	entity Person {
		/*comment*/
		_name: string unique  max: 1 min: 1
	}

	// Enum1 Comment
	enum Enum1 {
		Enum1Op1 /* Test Comment */
		Enum1Op2 /* Test Comment */
	}
}`

    it("Generate Spark file content", () => {
        expect(sparkFR.render()).toBe(expectContent)
    })
});