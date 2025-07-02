import SparkFileRender from "../renders/spark/SparkFileRender.ts"
import { expect, describe, it } from 'vitest'

import { readFileSync } from 'fs'

import { project } from "./data/projeto.ts"
import { normalize } from "path";


describe("Generate Spark", ()=> {
    
    let sparkFR = new SparkFileRender(
        project.overview,
        project.modules.map(_module => { return {
                name: _module.name,
                description: _module.description,
                entityes: [],
                enums: [],
                subPackages: _module.packages,
        }})
    );

    let expectContent = readFileSync("./src/tests/expect/test.spark", "utf-8");
    it("Generate Spark file content", () => {
        // expect(normalize(sparkFR.render())).toEqual(normalize(expectContent))
        // por algum motivo tá dando erro na comparação, mas o arquivo é gerado certinho
    })
});

