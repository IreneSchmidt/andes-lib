import { expandWithNewLines } from "../../util/expandToString";
import { Event, Model, UseCase, isEvent, isFunctionalRequirement, isNonFunctionalRequirement, isBussinesRule, isRequirement, isUseCase} from "../../model/models"; //Verificar se todos realmente vão pra models
import { createPath } from "../../util/generator-utils";
import fs from "fs";
import path from 'path'
import { Dependency, Graph, Node, ActorRelation } from "../../graph/graph.js";
import { DiagramGeneratorService } from "../docsaurus/ClassDiagram.js";
import { UseCaseGeneratorService } from "../docsaurus/ModelUseCases.js";

export class DocksaurusService {
    
    model: Model
    target_folder:string
    DOC_PATH:string
    ANALYSIS_PATH:string
    
    constructor (model: Model, target_folder:string){        
        this.model = model
        this.target_folder = target_folder
        
        fs.mkdirSync(this.target_folder, {recursive:true})        
        this.DOC_PATH = createPath(this.target_folder,'doc')        
        this.ANALYSIS_PATH = this.DOC_PATH
        
    }

    public create(){
        this.createAnalysFolder()
        this.createIntroduction()
        this.createRequirements()
        this.createUSecaseDescription()
        this.CreateDiagrams()
        
    }

    private createRequirements(){
        
        const project = this.model.project
        const module_name = project?.id.toLocaleLowerCase() ?? `module_name`
        const module_path = createPath( this.ANALYSIS_PATH, module_name)        
        fs.writeFileSync(path.join(module_path , `requirements.md`), this.createRequirementContain())
    }

    private createRequirementContain(){
        
        return expandWithNewLines`
        ---
        title: Requisitos
        sidebar_position: 2
        ---        
        ${this.createFunctionalRequirements()}
        ${this.createNonFunctionalRequirements()}
        ${this.createBusinessRules()}
        ${this.createRequirementsAnalysis()}
        ${this.createRequirementsEvents()}
        `
    }

    private createRequirementsEvents(){
       
        const events = this.model.components.filter(isUseCase).flatMap(usecase => usecase.events.filter(isEvent))

        const graph = new Graph();        
        const dependencies: Dependency[] = []
        const nodes: Node[] = []

        events.forEach(event=>{
            
            nodes.push({node:event.id.toUpperCase(),description:`${event.name_fragment}`})
            
            if (event.depend){
                dependencies.push({from: event.id.toUpperCase(),to:event.depend.id.toUpperCase()?? ""})                
            }
            if (event.depends){
                event.depends.map(itemDepended=> dependencies.push({from: event.id.toUpperCase(),to:itemDepended.id.toUpperCase()?? ""}))
            }
        });

        const {containsCycle, topologicalSort, table} = graph.createAnalysis(dependencies,nodes)
        return expandWithNewLines`
        ## Matrix de Dependencia dos Eventos
        ${table}

        ### Ciclos
        Caso exista ciclo, será apresentado abaixo:
        ${containsCycle != null? `\`\`\`mermaid` : ""}
        
        ${containsCycle != null? containsCycle : ""}

        ${containsCycle != null? `\`\`\`` : ""}
        
        ### Grafo de Dependencia
        \`\`\`mermaid
        ${topologicalSort}
        \`\`\`
        `

    }

    private createRequirementsAnalysis(){
        const graph = new Graph();        
        const dependencies: Dependency[] = []
        const actorRelations: ActorRelation[] = [];
        const nodes: Node[] = []

        const useCases = this.model.components.filter(isUseCase)
        useCases.map(usecase => {

            nodes.push({node: usecase.id.toUpperCase(),description:`${usecase.name_fragment}`, actors:usecase.actors.map(actor=>actor.name ??'')})
            
            if (usecase.depend){
                dependencies.push({from: usecase.id.toUpperCase(),to:usecase.depend.id.toUpperCase()?? ""})                
            }
            if (usecase.depends){
                usecase.depends.map(itemDepended=> dependencies.push({from: usecase.id.toUpperCase(),to:itemDepended.id.toUpperCase()?? ""}))
            }
            if (usecase.actors){
                usecase.actors.map(itemActor=> actorRelations.push({from: usecase.id.toUpperCase(),to:itemActor.name ?? ""}))
            }
        })
           

        const {containsCycle, topologicalSort, table} = graph.createAnalysis(dependencies,nodes)
        return expandWithNewLines`

        ## Matrix de Dependencia dos casos de uso
        ${table}

        ### Ciclos
        Caso exista ciclo, será apresentado abaixo:
        ${containsCycle != null? `\`\`\`mermaid` : ""}
        
        ${containsCycle != null? containsCycle : ""}

        ${containsCycle != null? `\`\`\`` : ""}
        
        ### Grafo de Dependencia
        \`\`\`mermaid
        ${topologicalSort}
        \`\`\`
        `
    }

    private createNonFunctionalRequirements(){

        const nonFunctionals = this.model.components.filter(isRequirement).flatMap(requirements=>requirements.requirements.filter(isNonFunctionalRequirement))

        return expandWithNewLines`
        ## Requisitos Não-Funcionais

        | ID   | Descrição    |Prioridade   | Dependências           |
        |------|--------------|-------------|------------------------|
        ${nonFunctionals.map(nonFunctional=> `|${nonFunctional.id.toUpperCase()}|${nonFunctional.description ?? `-`}|${nonFunctional.priority ?? `-`}|${nonFunctional.depend?.id.toUpperCase()?? `-`}${nonFunctional.depends.map(depends => depends.id ? `,${depends.id.toUpperCase()}` : ``).join(`,`)}|`).join(`\n`)}
    `
    }

    private createFunctionalRequirements(){
        const functionalRequirements = this.model.components.filter(isRequirement).flatMap(requirements => requirements.requirements.filter(isFunctionalRequirement))
      
        return expandWithNewLines`
        ## Requisitos Funcionais

        | ID   | Descrição    |Prioridade   | Dependências           |
        |------|--------------|-------------|------------------------|
        ${functionalRequirements.map(requirement=> `|${requirement.id.toUpperCase()}|${requirement.description ?? `-`}|${requirement.priority ?? `-`}|${requirement.depend?.id.toUpperCase()?? `-`}${requirement.depends.map(depends => depends.id ? `,${depends.id.toUpperCase()}` : ``).join(`,`)}|`).join(`\n`)}
        `
    }

    private createBusinessRules(){
        const BussinesRule = this.model.components.filter(isRequirement).flatMap(requirements => requirements.requirements.filter(isBussinesRule))
      
        return expandWithNewLines`
        ## Regras de Negócios

        | ID   | Descrição    |Prioridade   | Dependências           |
        |------|--------------|-------------|------------------------|
        ${BussinesRule.map(BussinesRule=> `|${BussinesRule.id.toUpperCase()}|${BussinesRule.description ?? `-`}|${BussinesRule.priority ?? `-`}|${BussinesRule.depend?.id.toUpperCase()?? `-`}${BussinesRule.depends.map(depends => depends.id ? `,${depends.id.toUpperCase()}` : ``).join(`,`)}|`).join(`\n`)}
        `
    }
    
    private createUSecaseDescription() {
        const project = this.model.project

        const useCases = this.model.components.filter(isUseCase)

        const value = `---
sidebar_position: 3
---
# Casos de Uso
${useCases.map(usecase=> this.createUseCaseContain(usecase)).join('\n')}
    `
    const module_name = project?.id.toLocaleLowerCase() ?? `module_name`
    const module_path = createPath( this.ANALYSIS_PATH, module_name)        
    fs.writeFileSync(path.join(module_path , `usecase.md`), value)

    }

    private createUseCaseContain(useCase: UseCase):string {
        return expandWithNewLines`
    ## ${useCase.id.toUpperCase()}: ${useCase.name_fragment}
    ${useCase.description}
    ${useCase.events.map((event, index)=> this.createEventContain(event, useCase, index)).join('\n')}
        `
    }

    private createEventContain(event:Event, usecase: UseCase, index:number):string{
        return expandWithNewLines`
    ### ${usecase.id.toUpperCase()}.${index}: ${event.name_fragment}
    ${event.action}
    `
    }

    private createIntroduction (){
        
        const project = this.model.project
        
        const value = `
---
sidebar_position: 1
---
# Propósito
${project?.purpose}
        
## Minimundo
${project?.miniworld}
 `
        const module_name = project?.id.toLocaleLowerCase() ?? `module_name`
        const module_path = createPath( this.ANALYSIS_PATH, module_name)        
        fs.writeFileSync(path.join(module_path , `introducao.md`), value)

    }    
    private createAnalysFolder(){
        
        this.ANALYSIS_PATH = createPath( this.DOC_PATH,'analysis')
        console.log("xxxx: "+this.ANALYSIS_PATH)
        this.createCategoryFile(this.ANALYSIS_PATH , 'Analise', '2', 'Documentos de Analise')
        
        const value = `---
        sidebar_position: 1
        ---
        # Visão Geral        
        Apresenta os documento de analise de cada módulo. 
        `
        fs.writeFileSync(path.join(this.ANALYSIS_PATH , "intro.md"), value)
        console.log("")
    }


    private createCategoryFile(path_folder:string, label:string, position:string, description:string) {
        const value =`{
            "label": "${label}",
            "position": ${position},
            "link": {
                "type": "generated-index",
                "description": "${description}"
            }
        }`
        
        fs.writeFileSync(path.join(path_folder, `_category_.json`), value)
    }

    private CreateDiagrams(){
        const project = this.model.project
        const module_name = project?.id.toLocaleLowerCase() ?? `module_name`
        const module_path = createPath( this.ANALYSIS_PATH, module_name)     
        const diagramGenerator = new DiagramGeneratorService(this.model, module_path);
        diagramGenerator.generate();
        const UseCasediagramGenerator = new UseCaseGeneratorService(this.model, module_path);
        UseCasediagramGenerator.generate();
    }


}