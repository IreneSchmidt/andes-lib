import { Model } from "../model/models";

import { PathLike, writeFileSync, mkdirSync, write } from "fs"
import SparkFileRender from "../renders/spark/SparkFileRender";
import MadeFileRender from "../renders/made/MadeFileRender";

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
        this.createMade();
    }

    private createSpark(): void
    {
        const spark = new SparkFileRender(this.model.project, this.model.modules);

        mkdirSync(this.targetFolder, {recursive: true});
        writeFileSync(`${this.targetFolder}/${this.model.project.name}.spark`, spark.render());
    }

    private createMade(): void{
        const made = new MadeFileRender(this.model);

        mkdirSync(this.targetFolder, {recursive: true});
        writeFileSync(`${this.targetFolder}/${this.model.project.name}.made`, made.render());
    }
}

