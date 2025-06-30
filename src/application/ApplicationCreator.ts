import { PathLike } from "fs"
import SparkFileRender from "../renders/spark/SparkFileRender";
import createFolderAndFile from "./IO";
import { DocusaurusProjectCreator } from "./DocusaurusCreator";
import { Project } from "../model/ProjectModels";
import { MadeProjectParser } from "./made/parsers/MadeProjectParser";
import { Module } from "../model/ProjectModels";
import MadeFileRender from "../renders/made/MadeFileRender";
import { Package } from "../model/sparkModels";


export default class ApplicationCreator
{
    private project: Project;
    private targetFolder: PathLike;

    public constructor(project: Project, targetFolder: PathLike)
    {
        this.project = project;
        this.targetFolder = targetFolder;
    }

    public create(): void
    {
        this.createSpark();
        this.createDocusaurus();
        this.createMade();
    }

    private createSpark(): void
    {
        const spark = new SparkFileRender(this.project.overview, this.modulesToPackages());
        createFolderAndFile(this.targetFolder, `${this.project.overview.name}.spark`, spark.render());
    }

    private modulesToPackages(): Package[]
    {
        return this.project.modules.map(
            module => { return {
                name: module.name,
                description: module.description,
                entityes: [],
                enums: [],
                identifier: module.identifier,
                subPackages: module.packages
            }
        }
        )
    }

    private createDocusaurus(): void
    {

        const docusaurus = new DocusaurusProjectCreator(this.project, `${this.targetFolder}/documentation`);

        docusaurus.create();
    }

    private createMade(): void
    {
        this.project.modules.forEach(module => this.createMadeModule(module));
    }

    private createMadeModule(module: Module): void
    {
        const madeData = MadeProjectParser.parse(module);
        const made = new MadeFileRender(madeData.project, madeData.teams, madeData.roadmaps, madeData.backlogs, madeData.sprints);

        createFolderAndFile(`${this.targetFolder}/made`, `${module.identifier}.made`, made.render());
    }
}

