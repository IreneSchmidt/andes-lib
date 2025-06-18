import { Model } from "../model/models";

import { PathLike, writeFileSync, mkdirSync } from "fs"
import SparkFileRender from "../renders/spark/SparkFileRender";


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
    }

    private createSpark(): void
    {
        const spark = new SparkFileRender(this.model.project, this.model.modules);

        mkdirSync(this.targetFolder, {recursive: true});
        writeFileSync(`${this.targetFolder}/${this.model.project.name}.spark`, spark.render());
    }
}

