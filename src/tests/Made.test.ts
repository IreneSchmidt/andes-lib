import { mkdirSync, writeFileSync } from "fs";

import MadeFileRender from "../renders/dsl/made/MadeFileRender"

import { module1 } from "./data/modulos"

test("Test Made Generator", ()=>{
        const targetFolder = "./out/made/";
        const creator = new MadeFileRender(module1);

        mkdirSync(targetFolder, {recursive: true});
        writeFileSync(`${targetFolder}test.made`, creator.render());
    }
)


