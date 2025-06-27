import {Actor, Event, Model, UseCase} from "../model/models";

const myUsecase: UseCase = {
    actors: [],
    depends: [],
    description: 'Exemplo de caso de uso',
    events: [],
    id: 'UC01',
    name: 'Exemplo de Caso de Uso',
    requirements: []
}

const myActor: Actor = {
    name: "Ator de Exemplo",
    comment: "gbnecrtiucghu",
}

const myEvent : Event = {
    id: 'EV01',
    name: 'Evento de Exemplo',
    description: 'Descrição do evento de exemplo',
    action: 'Ação do evento de exemplo',
    requirements: [],
    depends: [],
    performer: myActor
    
}

const myUsecase2: UseCase = {
    actors: [myActor],
    depends: [myUsecase],
    description: 'Exemplo de caso de uso 2',
    events: [myEvent],
    id: 'UC02',
    name: 'Caso de Uso 2',
    requirements: []
}

const exampleModel: Model = {
    modules: [],
    Usecases: [
        myUsecase, myUsecase2
    ],
    components: [],
    project: {
        id: 'PRJ001',
        name: 'Sistema de Gestão de Usuários',
        description: 'Projeto responsável pela gestão de contas de usuários',
        startDate: '2025-01-01',
        dueDate: '2025-12-31',
        purpose: 'Gerenciar autenticação e cadastro de usuários',
        miniworld: 'Gerencia usuários, autenticação e permissões',
        name_fragment: 'user-management',
        architecture: 'python'
    }
};
import ApplicationCreator from "../application/ApplicationCreator";

describe("ApplicationCreator", () => {
    it("should create a valid application structure", () => {
        const targetFolder = "./test-output";
        const creator = new ApplicationCreator(exampleModel, targetFolder);
        
        expect(() => creator.create()).not.toThrow();
        
        // Check if the files were created
        const fs = require('fs');
        expect(fs.existsSync(`${targetFolder}/${exampleModel.project.name}.spark`)).toBe(true);
        expect(fs.existsSync(`${targetFolder}/${exampleModel.project.name}.made`)).toBe(true);
    });
});