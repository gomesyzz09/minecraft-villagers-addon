# Villagers+ — Minecraft Bedrock Add-on

## V5 — Vila viva e evolutiva

O Villagers+ agora combina JSON + JavaScript para criar uma vila administrável dentro do Minecraft Bedrock.

### O que há na V5

- 15 profissões com desbloqueio por nível da vila.
- Trabalhadores com nome personalizado e XP individual.
- Rotina de trabalho das 08:00 às 18:00.
- Trabalhadores vão para o ponto de trabalho e voltam para casa.
- Produção automática e entrega dos itens ao jogador.
- Se o inventário estiver cheio, a produção fica no estoque do trabalhador.
- Menu para recolher o estoque.
- XP da vila gerado pela produção.
- 6 níveis de evolução: Acampamento, Povoado, Vila, Vila Desenvolvida, Grande Vila e Cidade.
- Construções automáticas por nível.
- Fazenda, casas, celeiro, mercado, biblioteca, oficina, forja, muralhas, santuário, prefeitura e área de mineração.
- Profissões avançadas liberadas conforme a vila evolui.
- Origem persistente da vila por jogador.
- Compatibilidade com a estrutura de Behavior Pack + scripts da API do Bedrock.

### Níveis da vila

| Nível | Nome | XP | Principal desbloqueio |
|---|---|---:|---|
| 1 | Acampamento | 0 | Casas simples |
| 2 | Povoado | 100 | Fazenda e celeiro |
| 3 | Vila | 300 | Mercado e biblioteca |
| 4 | Vila Desenvolvida | 700 | Oficina e forja |
| 5 | Grande Vila | 1500 | Muralhas e santuário |
| 6 | Cidade | 3000 | Prefeitura e mina |

### Profissões

Fazendeiro, Pescador, Pastor, Açougueiro, Curtidor, Bibliotecário, Flecheiro, Cartógrafo, Pedreiro, Ferramenteiro, Armeiro, Armeiro de armas, Clérigo, Apicultor e Minerador.

### Como jogar

1. Ative o Behavior Pack no mundo.
2. Ative o Resource Pack se estiver usando os recursos visuais do projeto.
3. Use uma bússola para abrir o menu Villagers+.
4. Contrate trabalhadores.
5. Acompanhe o nível da vila.
6. Construa/atualize a vila pelo menu.
7. Deixe os trabalhadores produzirem durante o horário de trabalho.
8. Recolha o estoque quando necessário.

### Estrutura

- `behavior_packs/VillagersPlus_BP/manifest.json`
- `behavior_packs/VillagersPlus_BP/scripts/main.js`
- `behavior_packs/VillagersPlus_BP/scripts/jobs.js`
- `behavior_packs/VillagersPlus_BP/scripts/work.js`
- `behavior_packs/VillagersPlus_BP/scripts/movement.js`
- `behavior_packs/VillagersPlus_BP/scripts/storage.js`
- `behavior_packs/VillagersPlus_BP/scripts/village.js`

### Observação

As construções são geradas por script usando a API de blocos do Bedrock. Elas ocupam a área ao redor da origem registrada da vila; evite colocar construções importantes dentro dessa área.

A API de scripts do Bedrock varia entre versões. O projeto usa `@minecraft/server 1.15.0` e `@minecraft/server-ui 1.3.0` no manifesto atual.
