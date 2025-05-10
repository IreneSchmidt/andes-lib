import {  EnumX, LocalEntity, Model, isEnumX, isLocalEntity, isModule } from "../model/models"
import fs from "fs";
import path from 'path'
import { createPath } from "../util/generator-utils.js";
import {  expandWithNewLines } from "../util/expandToString";

export class SparkApplication {
    model: Model
    target_folder:string
    SPARK_PATH: string
   
    constructor (model: Model, target_folder:string){
        this.model = model
        this.target_folder = target_folder  
        
        fs.mkdirSync(this.target_folder, {recursive:true})        
        this.SPARK_PATH = createPath(this.target_folder,'spark') 
    }

    public create(){
        
        const project = this.model.project?.id.toLocaleLowerCase() ?? "file"
        fs.writeFileSync(path.join(this.SPARK_PATH , `${project}.spark`), this.createspark())
    
    }

    private createspark():string{
        const project = this.model.project
        const modules = this.model.components.filter(isModule)

        return expandWithNewLines`
        Configuration {
            software_name: "${project?.name_fragment?? "Name"}"
            about: "${project?.description}"
            language: ${project?.architecture?? "java"}
        }
        ${modules.map(module => `module ${module.name}
        {
        ${module.elements.filter(isLocalEntity).map(localEntity => this.createEntity(localEntity)).join(`\n`)}
        ${module.elements.filter(isEnumX).map(enumX => this.createEnum(enumX)).join(`\n`)}
        }`).join("\n")}
        `
    }

    private createEnum (enumx: EnumX):string {
        return expandWithNewLines`
        enum ${enumx.name}{
            ${enumx.attributes.map(value => `${value.name}`).join(`\n`)}
        }
        `
    }

    private createEntity (entity:LocalEntity):string {
        return expandToStringWithNL`
      ${entity.is_abstract? "abstract ": "" }entity ${entity.name} ${entity.superType? `extends ${entity.superType.ref?.name}`: ""}{
      ${entity.attributes.map(value => `${value.name}: ${value.type}`)} 
      ${entity.enumentityatributes.map(value => `${value.name} uses ${value.type.ref?.name}`)} 
      ${entity.functions.map(value => `fun ${value.name} (${value.paramters.map(param=>param.element).join(',')}): ${value.response}`)} 
      ${entity.relations.map(value => `${value.name} ${value.$type} ${value.type.ref?.name}`)} 
       
    }
        `
    }
}