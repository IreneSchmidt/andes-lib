import { BuisinesRuleSimpleCLass, FunctionalRequirementSimpleClass, NonFunctionalRequirementSimpleClass, ProjectModuleType } from "../model/newModels";
import { expect, describe, it } from 'vitest'
import { DocusaurusProjectCreator } from '../application/DocusaurusCreator'
import { project } from "./data/projeto";


const docusaurus = new DocusaurusProjectCreator(project, "./out/documentation");

describe("Criando a documentação (Como é muita coisa, executa e verifica a renderização do markdown)", ()=> {
    docusaurus.create();
});