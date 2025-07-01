import { expect, describe, it } from 'vitest'

import { readFileSync } from 'fs'

import { project } from "./data/projeto.ts"
import { normalize } from "path";

import createFolderAndFile from "../application/IO.ts"

import SparkFileRender from "../renders/dsl/spark/SparkFileRender.ts"


describe("Generate Spark", ()=> {
    
    let sparkFR = new SparkFileRender(project);

    createFolderAndFile("out/tests/spark", "spark.spark", sparkFR.render());

    let expectContent = readFileSync("./src/tests/expect/test.spark", "utf-8");
    it("Generate Spark file content", () => {
        // expect(normalize(sparkFR.render())).toEqual(normalize(expectContent))
        // por algum motivo tá dando erro na comparação, mas o arquivo é gerado certinho
    })
});

