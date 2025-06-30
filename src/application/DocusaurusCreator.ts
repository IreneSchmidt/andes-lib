import { PathLike } from "fs";
import { ProjectInterface } from "../model/ProjectModels"
import { ModuleCreator } from "./docusaurus/module/ModuleCreator";


export class DocusaurusProjectCreator
{
    private projectReference: ProjectInterface;
    private targetFolder: PathLike;

    public constructor(projectReference: ProjectInterface, targetFolder: PathLike)
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

