---
title: Requisitos do Módulo
sidebar_position 1
---
# Requisitos Funcionais
<div align="center">
Tabela 1: Requisitos Funcionais do Módulo

|ID|Nome|Descrição|Dependências|Prioridade|
|-|-|-|-|-|
|RF0|Dependência|Mais uma descrição|RF1|Baixa|
|RF1|Outro Teste|Outra descrição|RF0|Média|
|RF2|TESTE|Feito para Teste||ALTA|

Autor: Autoria Própria
</div>

# Requisitos Não Funcionais
<div align="center">
Tabela 2: Requisitos Não Funcionais do Módulo

|ID|Nome|Descrição|
|-|-|-|
|RNF0|Teste|Mais um TESTE PQP|

Autor: Autoria Própria
</div>

# Regras de Negócio
<div align="center">
Tabela 3: Regras de Negócio do Módulo

|ID|Nome|Descrição|
|-|-|-|
|RN0|Test|Não pode dar merda né!|

Autor: Autoria Própria
</div>

# Grafo de Dependências
<div align="center">
Grafo de Fluxo 1: Grafo esquematizado das dependências entre os requisitos funcionais
</div>

```mermaid

---
title: Dependência Entre Requisitos Funcionais
---
flowchart LR
	RF0["Dependência"]
	RF1["Outro Teste"]
	RF2["TESTE"]

	RF0-->|depends| RF1

	RF1-->|depends| RF0

	RF2

```

<div align="center">
Fonte: Autoria Própria
</div>

# Ciclo entre dependências
<div align="center">
Grafo de Fluxo 2: Grafo que contém um dos ciclos encontrados no grafo ${this.name}
</div>

```mermaid

---
title: Grafo de Ciclos (Dependência Entre Requisitos Funcionais)
---
flowchart LR
	RF0["Dependência"]
	RF1["Outro Teste"]

	RF0-->|depends| RF1

	RF1-->|depends| RF0

```

<div align="center">
Fonte: Autoria Própria
</div>