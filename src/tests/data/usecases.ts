import { EventType, UseCaseClass } from "../../model/andes/AnalisysTypes.d";
import { actors1 } from "./actors";
import { rf1 } from "./requisitos"

export const uc1 = new UseCaseClass("TESTE", "Algum Nome Aí", "Descrição do Caso de Uso", [], [actors1], [])

export const event1: EventType = {
    identifier: "EVENTO1",
    name: "Nome do Evento",
    ucRef: uc1,
    action: ["Teste"],
    description: "Descrição",
    performer: [actors1],
    depends: []
}

export const event2: EventType = {
    identifier: "EVENTO2",
    name: "Nome do Evento",
    ucRef: uc1,
    action: ["Teste"],
    description: "Descrição",
    performer: [actors1],
    depends: [event1],
    requiriments: [rf1]
}

export const event3: EventType = {
    identifier: "EVENTO3",
    name: "Evento 3",
    ucRef: uc1,
    action: ["Teste"],
    description: "Descrição",
    performer: [actors1],
    depends: [event1, event2],
    requiriments: [rf1]
}

// event1.depends?.push(event2);
// event2.depends?.push(event1);


uc1.event?.push(event1);
uc1.event?.push(event2);
uc1.event?.push(event3);

export const uc2 = new UseCaseClass("OutroNome", "Nome", "Descrição do Caso de Uso", [], [actors1], [], [uc1]);

