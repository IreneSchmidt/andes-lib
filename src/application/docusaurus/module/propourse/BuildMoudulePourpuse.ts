import { Module } from "../../../../model/ProjectModels"
import FileRender from "../../../../renders/markdown/FileRender";


export class BuildModulePourpuse
{
    static buildModuleProporse(module: Module): FileRender
    {
        let porpourse = new FileRender("Proósito do Módulo");
        porpourse.addSimpleSection("Propósito", module.purpose);
        porpourse.addSimpleSection("Minimundo", module.miniwolrd);

        return porpourse;
    }
}

