import { Project } from "../../model/ProjectModels"
import { module1 } from "./modulos"


export const project: Project = {
    overview: {
        name: "Projeto de Teste",
        description: "Descrição do meu projeto de Teste",
        miniwolrd: "Esse aqui é o minimundo do projeto de teste",
        purpose: "Testar a lib com todas as funcionalidades até então implementadas",
        architecture: "arquitetura-solicitada-pelo-usuário",
    },
    modules: [
        module1        
    ]
}

