import { PathLike } from "fs";
import { BuildModulePourpuse } from "./propourse/BuildMoudulePourpuse";
import BuildRequisites from "./requisits/BuildRequisites";
import MarkdownFileRender from "../../../renders/markdown/FileRender";
import createFolderAndFile from "../../IO";
import { ModuleInterface } from "../../../model/ProjectModels"
import BuildDomain from "./domain/BuildDomain";
import BuildUserCase from "./usercase/BuildUsercase";


export class ModuleCreator
{
    private module: ModuleInterface | null;
    private originalPath: PathLike;
    private targetFolder: PathLike;

    private modulePropourse: MarkdownFileRender| null = null;
    private moduleRequisites: MarkdownFileRender | null = null;
    private moduleUserCases: MarkdownFileRender | null = null;
    private moduleDomainModel: MarkdownFileRender | null = null;
    // private moduleStatesMachines: MarkdownFileRender | null = null;
    
    public constructor(module: ModuleInterface | null = null, targetFolder: PathLike = "")
    {
        this.module = module;
        this.originalPath = targetFolder;
        this.targetFolder = `${targetFolder}/${module ? module.name : ''}`;
    }

    public changeModule(newModule: ModuleInterface): ModuleCreator
    {
        this.module = newModule;
        this.targetFolder = `${this.originalPath}/${this.module.name}`;

        return this;
    }

    public create()
    {
        if(this.module == null)
            { return; }
        this.modulePropourse = BuildModulePourpuse.buildModuleProporse(this.module);
        this.moduleRequisites = BuildRequisites.buildModuleRequisites(this.module);
        this.moduleDomainModel = BuildDomain.buildDomainDiagram(this.module.packages[0]);
        this.moduleUserCases = this.buildModuleUserCase(this.module);
        // this.moduleStatesMachines = this.buildModuleStatesMachine();
        createFolderAndFile(this.targetFolder, `ModulePropourse.md`, this.modulePropourse.render(0));
        createFolderAndFile(this.targetFolder, `Requisites.md`, this.moduleRequisites.render(1));
        createFolderAndFile(this.targetFolder, `UserCase.md`, this.moduleUserCases.render(2));
        createFolderAndFile(this.targetFolder, `ModuleDomain.md`, this.moduleDomainModel.render(3));
        // createFolderAndFile(this.targetFolder, `ModuleStatesMachine.md`, this.moduleStatesMachines.render(4));
    }

    private buildModuleUserCase(module: ModuleInterface): MarkdownFileRender
    {
        return BuildUserCase.build(module.useCases, module.actors);
    }

    // private buildModuleStatesMachine(): MarkdownFileRender
    // {

    // }
}

