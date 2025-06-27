import { BuisinesRule, FunctionalRequirement, NonFunctionalRequirement, Requirements } from "../../model/RequirimentsModels";

export const rf1 = new FunctionalRequirement("Requisito Funcional 1", "Alta", "O sistema deve permitir que o usuário realize login com e-mail e senha.");
export const rf2 = new FunctionalRequirement("Requisito Funcional 2", "Média", "O sistema deve permitir a recuperação de senha via e-mail.");
export const rf3 = new FunctionalRequirement("Requisito Funcional 3", "Alta", "O sistema deve permitir o cadastro de novos usuários.");
export const rf4 = new FunctionalRequirement("Requisito Funcional 4", "Baixa", "O sistema deve enviar um e-mail de boas-vindas após o cadastro.");
export const rf5 = new FunctionalRequirement("Requisito Funcional 5", "Média", "O sistema deve permitir que o usuário edite seu perfil.");
export const rf6 = new FunctionalRequirement("Requisito Funcional 6", "Alta", "O sistema deve permitir que o usuário visualize o histórico de atividades.");
export const rf7 = new FunctionalRequirement("Requisito Funcional 7", "Média", "O sistema deve gerar relatórios mensais de uso.");
export const rf8 = new FunctionalRequirement("Requisito Funcional 8", "Alta", "O sistema deve permitir o logout seguro do usuário.");
rf2.addDepedencie(rf1); // Recuperação de senha depende do login implementado
rf4.addDepedencie(rf3); // Envio de boas-vindas depende do cadastro de usuário
rf5.addDepedencie(rf3); // Edição de perfil depende do cadastro de usuário
rf6.addDepedencie(rf1); // Histórico acessado após login
rf7.addDepedencie(rf6); // Relatório depende do histórico de atividades

export const rnf1 = new NonFunctionalRequirement("Requisito Não Funcional 1", "O sistema deve estar disponível 99,9% do tempo.");
export const rnf2 = new NonFunctionalRequirement("Requisito Não Funcional 2", "O tempo de resposta das páginas não deve exceder 2 segundos.");
export const rnf3 = new NonFunctionalRequirement("Requisito Não Funcional 3", "O sistema deve suportar até 10 mil usuários simultâneos.");
export const rnf4 = new NonFunctionalRequirement("Requisito Não Funcional 4", "A interface deve ser compatível com dispositivos móveis.");

export const rn1 = new BuisinesRule("Regra de Negócio 1", "Usuários menores de 18 anos não podem se cadastrar.");
export const rn2 = new BuisinesRule("Regra de Negócio 2", "O e-mail fornecido no cadastro deve ser único.");
export const rn3 = new BuisinesRule("Regra de Negócio 3", "A alteração de e-mail exige confirmação por código enviado.");
export const rn4 = new BuisinesRule("Regra de Negócio 4", "Usuários inativos por 6 meses devem ser notificados.");


export const requiriments: Requirements = {
    functionalRequiriment: [rf1, rf2, rf3, rf4, rf5, rf6, rf7, rf8],
    nonFunctionalRequiriment: [rnf1, rnf2, rnf3, rnf4],
    buiinesRule: [rn1, rn2, rn3, rn4],
}

