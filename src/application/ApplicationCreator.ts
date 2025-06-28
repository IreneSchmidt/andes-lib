import { PathLike } from "fs"
import SparkFileRender from "../renders/spark/SparkFileRender";
import createFolderAndFile from "./IO";
import { DocusaurusProjectCreator } from "./DocusaurusCreator";
import { Project } from "../model/ProjectModels";


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
    }

    private createSpark(): void
    {
        const spark = new SparkFileRender(this.project.overview, this.project.modules.map(_module => { return {name: _module.name, description: _module.description, entityes: [], enums: [], subPackages: _module.packages}; }));
        createFolderAndFile(this.targetFolder, `${this.project.overview.name}.spark`, spark.render());
    }

    private createDocusaurus(): void
    {

        const docusaurus = new DocusaurusProjectCreator(this.project, `${this.targetFolder}/documentation`);

        docusaurus.create();
    }

    private createMade(): void
    {
        const made = new MadeFileRender(this.model);

        mkdirSync(this.targetFolder, {recursive: true});
        writeFileSync(`${this.targetFolder}/${this.model.project.name}.made`, made.render());
    }
}

