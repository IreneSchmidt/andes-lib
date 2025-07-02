import { it } from "node:test";

import { ApplicationCreator } from "../application/ApplicationCreator"
import { project } from "./data/projeto";



test("Application (classe que cria o programa bunitinho)", ()=>{it("Cria o código", ()=>{
    const app = new ApplicationCreator(project, "./out/application");
    app.create();
})})

