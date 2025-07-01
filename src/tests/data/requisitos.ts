import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType, RequirimentAgregationType } from "../../model/andes/RequirimentsTypes";

// Agregação de Requisitos
export const requiriments: RequirimentAgregationType = {
    fr: [],
    nfr: [],
    br: [],
    name: "Conjunto 1",
    identifier: "Conjunto1",
};


export const rf1: FunctionalRequirimentType = {
    name: "Requisito Funcional 1",
    priority: "Alta",
    depends: [],
    identifier: "RF01",
    ref: requiriments,
};

export const rf2: FunctionalRequirimentType = {
    name: "Requisito Funcional 2",
    priority: "Média",
    depends: ["Requisito Funcional 1"], // Recuperação de senha depende do login implementado
    identifier: "RF02",
    ref: requiriments,
};

export const rf3: FunctionalRequirimentType = {
    name: "Requisito Funcional 3",
    priority: "Alta",
    depends: [],
    identifier: "RF03",
    ref: requiriments,
};

export const rf4: FunctionalRequirimentType = {
    name: "Requisito Funcional 4",
    priority: "Baixa",
    depends: ["Requisito Funcional 3"], // Envio de boas-vindas depende do cadastro de usuário
    identifier: "RF04",
    ref: requiriments,
};

export const rf5: FunctionalRequirimentType = {
    name: "Requisito Funcional 5",
    priority: "Média",
    depends: ["Requisito Funcional 3"], // Edição de perfil depende do cadastro de usuário
    identifier: "RF05",
    ref: requiriments,
};

export const rf6: FunctionalRequirimentType = {
    name: "Requisito Funcional 6",
    priority: "Alta",
    depends: ["Requisito Funcional 1"], // Histórico acessado após login
    identifier: "RF06",
    ref: requiriments,
};

export const rf7: FunctionalRequirimentType = {
    name: "Requisito Funcional 7",
    priority: "Média",
    depends: ["Requisito Funcional 6"], // Relatório depende do histórico de atividades
    identifier: "RF07",
    ref: requiriments,
};

export const rf8: FunctionalRequirimentType = {
    name: "Requisito Funcional 8",
    priority: "Alta",
    depends: [],
    identifier: "RF08",
    ref: requiriments,
};

// Adicionando Ciclos Intencionais
rf1.depends.push("Requisito Funcional 2", "Requisito Funcional 7"); // Ciclo entre rf1 e rf2, rf1 e rf7

export const rnf1: NonFunctionalRequirimentType = {
    name: "Requisito Não Funcional 1",
    priority: "",
    depends: [],
    identifier: "RNF01",
    ref: requiriments,
};

export const rnf2: NonFunctionalRequirimentType = {
    name: "Requisito Não Funcional 2",
    priority: "",
    depends: [],
    identifier: "RNF02",
    ref: requiriments,
};

export const rnf3: NonFunctionalRequirimentType = {
    name: "Requisito Não Funcional 3",
    priority: "",
    depends: [],
    identifier: "RNF03",
    ref: requiriments,
};

export const rnf4: NonFunctionalRequirimentType = {
    name: "Requisito Não Funcional 4",
    priority: "",
    depends: [],
    identifier: "RNF04",
    ref: requiriments,
};

export const rn1: BuisinessRuleType = {
    name: "Regra de Negócio 1",
    priority: "",
    depends: [],
    identifier: "RNF05",
    ref: requiriments,
};

export const rn2: BuisinessRuleType = {
    name: "Regra de Negócio 2",
    priority: "",
    depends: [],
    identifier: "RNF06",
    ref: requiriments,
};

export const rn3: BuisinessRuleType = {
    name: "Regra de Negócio 3",
    priority: "",
    depends: [],
    identifier: "RNF07",
    ref: requiriments,
};

export const rn4: BuisinessRuleType = {
    name: "Regra de Negócio 4",
    priority: "",
    depends: [],
    identifier: "RNF08",
    ref: requiriments,
};


requiriments.fr = [rf1, rf2, rf3, rf4, rf5, rf6, rf7, rf8];
requiriments.nfr = [rnf1, rnf2, rnf3, rnf4];
requiriments.br = [rn1, rn2, rn3, rn4];

