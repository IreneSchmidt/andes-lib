import { Model, Project } from "../model/models";
import FileRender from "../renders/markdown/FileRender";
import ParagraphRender from "../renders/markdown/ParagraphRender";

export default class DocusaurusCreator
{
    private introduction: FileRender;
    public constructor(model: Model)
    {
        this.introduction = this.buildIntroduction(model.project);
    }

    private buildIntroduction(project: Project): FileRender
    {
        let introduction = new FileRender("Introdução");
        introduction.addSimpleSection("Propósito", project.purpose);
        introduction.addSimpleSection("Minimundo", project.miniworld);

        return introduction;
    }
}