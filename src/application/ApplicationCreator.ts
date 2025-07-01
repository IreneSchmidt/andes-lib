import { PathLike } from "fs"
import SparkFileRender from "../renders/spark/SparkFileRender";
import createFolderAndFile from "./IO";
import { DocusaurusProjectCreator } from "./DocusaurusCreator";
import { ProjectInterface } from "../model/ProjectModels";
import { MadeProjectParser } from "./made/parsers/MadeProjectParser";
import { ModuleInterface } from "../model/ProjectModels";
import MadeFileRender from "../renders/made/MadeFileRender";
import { Package } from "../model/sparkModels";


export default class ApplicationCreator
{
    private project: ProjectInterface;
    private targetFolder: PathLike;

    public constructor(project: ProjectInterface, targetFolder: PathLike)
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
        /*
        // Esse códio aqui é o certo. Quando o spark for corrijido, utilize ele.
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
        */

        return this.project.modules.map( module => { return module.packages } ).flat()
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

    private createMadeModule(module: ModuleInterface): void
    {
        const madeData = MadeProjectParser.parse(module);
        const made = new MadeFileRender(madeData.project, madeData.teams, madeData.roadmaps, madeData.backlogs, madeData.sprints);

        console.log(module);

        createFolderAndFile(`${this.targetFolder}`, `${module.identifier}.made`, made.render());
    }
}

