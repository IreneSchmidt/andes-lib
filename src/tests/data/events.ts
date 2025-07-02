import { EventType } from "../../model/madeModels";
import { actors1, actors2 } from "./actors";
import { rf1, rf2, rf3, rf4 } from "./requisitos";

// Evento 1
export const myevent1: EventType = {
    identifier: "EV01",
    name: "Meu evento 1",
    description: "Descrição do evento 1",
    action: "Realizar evento 1",
    requirements: [rf1, rf2],
    depends: [], // sem dependências por enquanto (para evitar erro de referência)
    performer: actors1
};

// Evento 2
export const myevent2: EventType = {
    identifier: "EV02",
    name: "Meu evento 2",
    description: "Descrição do evento 2",
    action: "Executar segundo evento",
    requirements: [rf2, rf3],
    depends: [myevent1],
    performer: actors2
};

// Evento 3
export const myevent3: EventType = {
    identifier: "EV03",
    name: "Meu evento 3",
    description: "Descrição do evento 3",
    action: "Executar evento 3",
    requirements: [rf3, rf4],
    depends: [myevent2],
    performer: actors1
};

// Inserindo dependência circular agora que os outros já estão definidos
myevent1.depends = [myevent3]; // agora EV01 depende de EV03 ⇒ ciclo formado
