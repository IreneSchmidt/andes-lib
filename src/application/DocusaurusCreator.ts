import { PathLike } from "fs";
import { Project } from "../model/ProjectModels"
import { ModuleCreator } from "./docusaurus/module/ModuleCreator";


export class DocusaurusProjectCreator
{
    private projectReference: Project;
    private targetFolder: PathLike;

    public constructor(projectReference: Project, targetFolder: PathLike)
    {
        this.projectReference = projectReference;
        this.targetFolder = `${targetFolder}`;
    }

    public create()
    {
        this.buildModules();
    }

    private buildModules(): void
    {
        const module = new ModuleCreator(null, this.targetFolder);
        this.projectReference.modules.forEach(m => module.changeModule(m).create())
    }
}

