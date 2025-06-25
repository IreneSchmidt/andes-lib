import { Model } from "../model/models";

import { PathLike, writeFileSync, mkdirSync } from "fs"
import SparkFileRender from "../renders/spark/SparkFileRender";
import FileRender from "../renders/markdown/FileRender";
import createFolderAndFile from "./IO";
import { DocusaurusModuleCreator } from "./DocusaurusCreator";
import { BuisinesRule, FunctionalRequirement, NonFunctionalRequirement, ProjectModule } from "../model/newModels";


export default class ApplicationCreator
{
    private model: Model;
    private targetFolder: PathLike;

    public constructor(model: Model, targetFolder: PathLike)
    {
        this.model = model;
        this.targetFolder = targetFolder;
    }

    public create(): void
    {
        this.createSpark();
        this.createDocusaurus();
    }

    private createSpark(): void
    {
        const spark = new SparkFileRender(this.model.project, this.model.modules);
        createFolderAndFile(this.targetFolder, `${this.model.project.name}.spark`, spark.render());
    }

    private createDocusaurus(): void
    {
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
                    new FunctionalRequirement("Outro Teste", "Média", "Outra descrição", [
                        new FunctionalRequirement("Dependência", "Baixa", "Mais uma descrição")
                    ])
                ],
                nonFunctional: [new NonFunctionalRequirement("Teste", "Mais um TESTE PQP")],
            }
        };

        const docusaurus = new DocusaurusModuleCreator(justTestIt, `${this.targetFolder}/documentation`);

        docusaurus.create();
    }
}

