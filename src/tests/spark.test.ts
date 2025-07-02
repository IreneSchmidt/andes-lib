import { expect, describe, it } from 'vitest'

import { readFileSync } from 'fs'

import { project } from "./data/projeto.ts"
import { normalize } from "path";

import createFolderAndFile from "../application/IO.ts"

import SparkFileRender from "../renders/dsl/spark/SparkFileRender.ts"
import SparkConfigRender from '../renders/dsl/spark/SparkConfigRender.ts';
import SparkEnumEntityRender from '../renders/dsl/spark/SparkEnumEntityRender.ts';
import SparkEntityRender from '../renders/dsl/spark/SparkEntytiRender.ts';
import SparkPackageRender from '../renders/dsl/spark/SparkPackageRender.ts';


function testConfig()
{
    const config = new SparkConfigRender(project.overview);
    expect(config.render()).toBe(`\nConfiguration  {\n\tsoftware_name: "Projeto de Teste"\n\tabout: "Descrição do meu projeto de Teste"\n\tlanguage: arquitetura-solicitada-pelo-usuário\n}`);
}

function testEnum()
{
    const enume = project.modules[0].packages[0].enums?.at(0);
    if(enume == undefined)
        { return; }

    const e = new SparkEnumEntityRender(enume);

    expect(e.render()).toBe("\nenum Semestre {\n\tPRIMEIRO\n\tSEGUNDO\n}")
}

function testEntity()
{
    const _aluno = project.modules[0].packages[0].entities[2];

    const aluno = new SparkEntityRender(_aluno);

    expect(aluno.render()).toBe("\nentity Aluno {\n\tnome: string\n\tSemestreIngresso uses Semestre\n\tmatricula OneToOne Matricula\n}")
}

function testPackage()
{
    const _pgk = project.modules[0].packages[0];

    const pkg = new SparkPackageRender(_pgk);

    expect(pkg.render()).toBe(`\nmodule Pacote1 {\n\tentity Escola {\n\t\tnome: string\n\t}\n\tentity Matricula {\n\t\tcodigo: string\n\t\tescola ManyToOne Escola\n\t}\n\tentity Aluno {\n\t\tnome: string\n\t\tSemestreIngresso uses Semestre\n\t\tmatricula OneToOne Matricula\n\t}\n\tenum Semestre {\n\t\tPRIMEIRO\n\t\tSEGUNDO\n\t}\n}`);
}

test("Generate Spark", ()=>
    {
        testConfig();
        testEnum();
        testEntity();
        testPackage();
    }   
);

