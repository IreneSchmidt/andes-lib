import { UseCaseType } from "../../model/madeModels";
import { actors1, actors2 } from "./actors";
import { myevent1, myevent2, myevent3 } from "./events";

export const uc1: UseCaseType = {
    actors: [actors1],
    depends: [],
    description: "Descrição do Caso de Uso",
    events: [myevent1, myevent2, myevent3],
    identifier: "TESTE",
    name: "Algum Nome Aí",
    requirements: []
}

export const uc2: UseCaseType = {
    actors: [actors2],
    depends: [],
    description: "Permite ao ator realizar uma ação relacionada aos eventos 2 e 3",
    events: [myevent2, myevent3],
    identifier: "UC02",
    name: "Processamento de Ação",
    requirements: []
};

export const uc3: UseCaseType = {
    actors: [actors1, actors2],
    depends: [],
    description: "Integra os eventos principais do sistema em uma única operação",
    events: [myevent1, myevent2, myevent3],
    identifier: "UC03",
    name: "Integração de Eventos",
    requirements: []
};

export const uc4: UseCaseType = {
    actors: [actors1],
    depends: [uc2], // Depende do uc2
    description: "Executa uma ação adicional após o processamento de ação",
    events: [myevent1],
    identifier: "UC04",
    name: "Pós-processamento",
    requirements: []
};