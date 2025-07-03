import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType, RequirimentAgregationClass } from "../../model/andes/RequirimentsClass";

// Agregação de Requisitos
export const requiriments =  new RequirimentAgregationClass("Conjunto1", "Conjunto 1");

export const rf1 = new FunctionalRequirimentType("RF01", "Requisito Funcional 1", requiriments, "Alta");

// Requisitos Funcionais
export const rf2 = new FunctionalRequirimentType(
    "RF02",
    "Requisito Funcional 2",
    requiriments,
    "Média",
    "",
    [rf1]
);

export const rf3 = new FunctionalRequirimentType(
    "RF03",
    "Requisito Funcional 3",
    requiriments,
    "Alta"
);

export const rf4 = new FunctionalRequirimentType(
    "RF04",
    "Requisito Funcional 4",
    requiriments,
    "Baixa",
    "",
    [rf3]
);

export const rf5 = new FunctionalRequirimentType(
    "RF05",
    "Requisito Funcional 5",
    requiriments,
    "Média",
    "",
    [rf3]
);

export const rf6 = new FunctionalRequirimentType(
    "RF06",
    "Requisito Funcional 6",
    requiriments,
    "Alta",
    "",
    [rf1]
);

export const rf7 = new FunctionalRequirimentType(
    "RF07",
    "Requisito Funcional 7",
    requiriments,
    "Média",
    "",
    [rf6]
);

export const rf8 = new FunctionalRequirimentType(
    "RF08",
    "Requisito Funcional 8",
    requiriments,
    "Alta"
);

export const rnf1 = new NonFunctionalRequirimentType(
    "RNF01",
    "Requisito Não Funcional 1",
    requiriments,
    ""
);

export const rnf2 = new NonFunctionalRequirimentType(
    "RNF02",
    "Requisito Não Funcional 2",
    requiriments,
    ""
);

export const rnf3 = new NonFunctionalRequirimentType(
    "RNF03",
    "Requisito Não Funcional 3",
    requiriments,
    ""
);

export const rnf4 = new NonFunctionalRequirimentType(
    "RNF04",
    "Requisito Não Funcional 4",
    requiriments,
    ""
);

export const rn1 = new BuisinessRuleType(
    "RNF05",
    "Regra de Negócio 1",
    requiriments,
    ""
);

export const rn2 = new BuisinessRuleType(
    "RNF06",
    "Regra de Negócio 2",
    requiriments,
    ""
);

export const rn3 = new BuisinessRuleType(
    "RNF07",
    "Regra de Negócio 3",
    requiriments,
    ""
);

export const rn4 = new BuisinessRuleType(
    "RNF08",
    "Regra de Negócio 4",
    requiriments,
    ""
);


// Adicionando Ciclos Intencionais
rf1.depends.push(rf2);
rf1.depends.push(rf7);



requiriments.fr = [rf1, rf2, rf3, rf4, rf5, rf6, rf7, rf8];
requiriments.nfr = [rnf1, rnf2, rnf3, rnf4];
requiriments.br = [rn1, rn2, rn3, rn4];

