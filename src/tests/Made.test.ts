import { describe, it } from "node:test";

import MadeFileRender from "../renders/made/MadeFileRender"
import { mkdirSync, writeFileSync } from "fs";


describe("Test Made Generator", ()=>{
    it("Shoud create some .made file", ()=>{
        const targetFolder = "./out/made/";
        const creator = new MadeFileRender(project, teams, roadmaps, backlogs, sprints);

        mkdirSync(targetFolder, {recursive: true});
        writeFileSync(`${targetFolder}test.made`, creator.render());
    })
})


