import { UseCase } from "../../model/madeModels";
import { isUseCase, Model } from "../../model/models";
import IRender from "../IRender";
import MadeBacklog from "./MadeBacklog";
import MadeProjectRender from "./MadeProjectRender";
import {Epic as UseCaseClass} from "./Epic";

export default class MadeFileRender implements IRender {
    private project: MadeProjectRender;
    private backlog: MadeBacklog;



    public constructor(model: Model) {
        this.project = new MadeProjectRender(model.project.startDate, model.project.dueDate,model.project.id, model.project.name, model.project.description);
        this.backlog = new MadeBacklog(this.parseUsecase(model.Usecases), model.project.id, model.project.name, model.project.description);
    }

    private parseUsecase(ucs: UseCase[]): UseCaseClass[]
    {
        return ucs.map(uc => new UseCaseClass(uc.actors, this.parseUsecase(uc.depends), uc.description, uc.events, uc.id, uc.name, uc.requirements))
    }

    
    public render(identationStartLevel: number = 0): string {
        let project = `${this.project.render(identationStartLevel)}`;
        let backlog = `${this.backlog.render(identationStartLevel)}`;

        return `${project}\n${backlog}`;
    }
}