import { Module } from "../../../../model/ProjectModels"
import MarkdownFileRender from "../../../../renders/markdown/FileRender";


export class BuildModulePourpuse
{
    static buildModuleProporse(module: Module): MarkdownFileRender
    {
        let porpourse = new MarkdownFileRender("Proósito do Módulo");
        porpourse.addSimpleSection("Propósito", module.purpose);
        porpourse.addSimpleSection("Minimundo", module.miniwolrd);

        return porpourse;
    }
}

