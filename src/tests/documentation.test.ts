import { DocusaurusProjectCreator } from '../application/DocusaurusCreator'
import { project } from "./data/projeto";


const docusaurus = new DocusaurusProjectCreator(project, "./out/documentation");

test("Criando a documentação (Como é muita coisa, executa e verifica a renderização do markdown)", ()=> {
    // docusaurus.create();
});

