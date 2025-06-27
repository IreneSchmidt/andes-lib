import { BuisinesRule, FunctionalRequirement, NonFunctionalRequirement } from "../../../../model/RequirimentsModels";
import TableRender from "../../../../renders/markdown/TableRender";

const functionalRequirimentsTableHeaders = ["ID", "Nome", "Descrição", "Dependências", "Prioridade"];
const nonFunctionalRequirimentsTableHeaders = ["ID", "Nome", "Descrição"];
const buisinesRuleTableHeaders = ["ID", "Nome", "Descrição"];


export default class TableParser
{
    static frToTable(frs: FunctionalRequirement[]): TableRender
    {
        return new TableRender(
            functionalRequirimentsTableHeaders,
            frs.map(fr => [ fr.getReference(), fr.getName(), fr.getDescription(), TableParser.ptBrMultiJoin(fr.listDependencies()), fr.getPriority()],),
            "Requisitos Funcionais do Módulo"
        )
    }

    static nfrToTalbe(nfrs: NonFunctionalRequirement[]): TableRender
    {
        return new TableRender(
            nonFunctionalRequirimentsTableHeaders,
            nfrs.map(nfr => [nfr.getReference(), nfr.getName(), nfr.getDescription()]),
            "Requisitos Não Funcionais do Módulo"
        )
    }

    static brToTalbe(brs: BuisinesRule[]): TableRender
    {
        return new TableRender(
            buisinesRuleTableHeaders,
            brs.map(br => [br.getReference(), br.getName(), br.getDescription()]),
            "Regras de Negócio do Módulo"
        )
    }

    private static ptBrMultiJoin(strs: string[]): string
    {
        let lastStr = strs.pop();
        if(lastStr == undefined)
            { return ""; }
        if(strs.length <= 0)
            { return lastStr; }

        let completeStr = `${strs.join(',')} e ${lastStr}`;
        strs.push(lastStr); 
        
        return completeStr;
    }
}

