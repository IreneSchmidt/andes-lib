import { UseCaseType } from "../../model/madeModels";
import { actors1 } from "./actors";
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

