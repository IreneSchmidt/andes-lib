import { PathLike } from "fs";
import { BuisinesRule, FunctionalRequirement, NonFunctionalRequirement, ProjectModule } from "../model/newModels";
import FileRender from "../renders/markdown/FileRender";
import createFolderAndFile from "./IO";
import TableRender from "../renders/markdown/TableRender";
import GraphRender from "../renders/markdown/mermaid/flowchart/GraphRender";
import Node from "../renders/markdown/mermaid/flowchart/Node";
import { ConnectionTypes } from "../renders/markdown/mermaid/flowchart/MultiEdgeHandler";


const functionalRequirimentsTableHeaders = ["ID", "Nome", "Descrição", "Dependências", "Prioridade"];
const nonFunctionalRequirimentsTableHeaders = ["ID", "Nome", "Descrição"];
const buisinesRuleTableHeaders = ["ID", "Nome", "Descrição"];


export class DocusaurusModuleCreator
{
    private moduleReference: ProjectModule;
    private targetFolder: PathLike;

    private modulePropourse: FileRender;
    private moduleRequisites: FileRender;
    private moduleUserCases: FileRender;
    private moduleDomainModel: FileRender;
    private moduleStatesMachines: FileRender;
    
    public constructor(module: ProjectModule, targetFolder: PathLike)
    {
        this.moduleReference = module;
        this.targetFolder = `${targetFolder}/${this.moduleReference.name}`;
        this.modulePropourse = this.buildModuleProporse();
        this.moduleRequisites = this.buildModuleRequisites();
        this.moduleUserCases = this.buildModuleUserCase();
        this.moduleDomainModel = this.buildModuleDomainModel();
        this.moduleStatesMachines = this.buildModuleDomainModel();
    }

    public create()
    {
        createFolderAndFile(this.targetFolder, `ModulePropourse.md`, this.modulePropourse.render());
        createFolderAndFile(this.targetFolder, `Requisites.md`, this.moduleRequisites.render());
        createFolderAndFile(this.targetFolder, `UserCase.md`, this.moduleUserCases.render());
        createFolderAndFile(this.targetFolder, `ModuleDomain.md`, this.moduleDomainModel.render());
        createFolderAndFile(this.targetFolder, `ModuleStatesMachine.md`, this.moduleStatesMachines.render());
    }

    private buildModuleProporse(): FileRender
    {
        let porpourse = new FileRender("Proósito do Módulo");
        porpourse.addSimpleSection("Propósito", this.moduleReference.purpose);
        porpourse.addSimpleSection("Minimundo", this.moduleReference.miniworld);

        return porpourse;
    }

    private buildModuleRequisites(): FileRender
    {
        const requisites = new FileRender("Requisitos do Módulo");
        const requirimentsData = this.moduleReference.requiriments;

        const frTable = new TableRender(functionalRequirimentsTableHeaders, requirimentsData.functional.map(fr => this.frToTalbe(fr)), "Requisitos Funcionais do Módulo");
        const nfrTable = new TableRender(nonFunctionalRequirimentsTableHeaders, requirimentsData.nonFunctional.map(nfr => this.nfrToTable(nfr)), "Requisitos Não Funcionais do Módulo");
        const brTable = new TableRender(buisinesRuleTableHeaders, requirimentsData.buisinesRule.map(br => this.brToTable(br)), "Regras de Negócio do Módulo");

        requisites.addSimpleTableSection("Requisitos Funcionais", frTable);
        requisites.addSimpleTableSection("Requisitos Não Funcionais", nfrTable);
        requisites.addSimpleTableSection("Regras de Negócio", brTable);

        const frGraph = this.frsToGraph(requirimentsData.functional);
        const frCycleGraph = frGraph.cycleGraph();

        requisites.addSimpleSection("Grafo de Dependências", frGraph.render());
        if(frCycleGraph != null)
            { requisites.addSimpleSection("Ciclo entre dependências", frCycleGraph.render()); }

        return requisites;
    }

    private frToTalbe(fr: FunctionalRequirement): string[]
    {
        let frDependencies = DocusaurusModuleCreator.ptBrMultiJoin(fr.listDependencies());
        return [fr.getDescription(), fr.getName(), fr.getDescription(), frDependencies, fr.getPriority()];
    }

    private nfrToTable(nfr: NonFunctionalRequirement): string[]
    {
        return [nfr.getReference(), nfr.getName(), nfr.getDescription()];   
    }

    private brToTable(br: BuisinesRule): string[]
    {
        return [br.getReference(), br.getName(), br.getDescription()];   
    }

    private frsToGraph(functional: FunctionalRequirement[]): GraphRender
    {
        const frNodes: Node[] = [];
        functional.forEach(fr => frNodes.push(new Node(fr.getReference(), fr.getName())));
        functional.forEach(fr =>
            { 
                let n = frNodes.find(node => node.getIdentifier() == fr.getReference())
                if(n == undefined)
                    { return; }

                fr.listDependencies().forEach(dependencie =>
                    {
                        let sn = frNodes.find(_node => _node.getIdentifier() == dependencie);
                        if(sn != undefined)
                        {
                            n.addEdge(sn, ConnectionTypes.APPOINTS_TO, "depends");
                        }
                    })
            });

        const frGraph = new GraphRender("Dependencia Entre Requisitos Funcionais", frNodes, "Grafo esquematizado das dependências entre os requisitos funcionais");

        return frGraph;
    }

    private static ptBrMultiJoin(strs: string[]): string
    {
        let lastStr = strs.pop();
        if(lastStr == undefined)
            { return ""; }

        let completeStr = `${strs.join(',')} e ${lastStr}`;
        strs.push(lastStr); 
        
        return completeStr;
    }

    private buildModuleUserCase(): FileRender
    {

    }

    private buildModuleDomainModel(): FileRender
    {

    }

    private buildModuleStatesMachine(): FileRender
    {

    }
}

