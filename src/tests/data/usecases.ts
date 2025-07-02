import { EventType, UseCaseClass } from "../../model/andes/AnalisysTypes.d";
import { actors1 } from "./actors";
import { rf1 } from "./requisitos"

export const uc1 = new UseCaseClass("TESTE", "Algum Nome Aí", "Descrição do Caso de Uso", [], actors1, [])

export const event1: EventType = {
    identifier: "EVENTO1",
    name: "Nome do Evento",
    ucRef: uc1,
    action: "Teste",
    description: "Descrição",
    performer: [actors1],
}

export const event2: EventType = {
    identifier: "EVENTO2",
    name: "Nome do Evento",
    ucRef: uc1,
    action: "Teste",
    description: "Descrição",
    performer: [actors1],
    depends: [event1],
    requiriments: [rf1]
}


uc1.event?.push(event1);
uc1.event?.push(event2);

