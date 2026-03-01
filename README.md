# 🐾 PokeNext - Vanilla JS Pokedex

<p align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" width="150" alt="Pikachu" />
</p>

Uma Pokédex moderna, rápida e responsiva construída puramente com **Vanilla JavaScript**, utilizando a [PokeAPI](https://pokeapi.co/) para listar e buscar informações de todos os seus monstros de bolso favoritos.

[Live Demo](https://pokedex-vanillajs.vercel.app/)

---

## 📋 Pré-requisitos

Para rodar este projeto, você precisa ter instalado:

- **Node.js**: Versão **20.x** (LTS) ou superior.
- **NPM**: Gerenciador de pacotes (instalado junto com o Node).

---

## 🏁 Como rodar o projeto

Siga os passos abaixo para ter a Pokédex rodando localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/belamacedo/pokedex-vanillajs.git

   ```

2. **Entre na pasta:**

   ```bash
    cd pokedex-vanillajs

   ```

3. **Instale as dependências:**

   ```bash
   npm install

   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev

   ```

5. **Acesse no navegador:**
   ```bash
   http://localhost:5173
   ```

---

## 🚀 Funcionalidades

- **Listagem Dinâmica:** Exibição de cards com nome, ID, tipos e imagem oficial.
- **Busca em Tempo Real:** Pesquisa inteligente por nome do Pokémon.
- **Paginação:** Navegação fluida entre as centenas de registros da PokeAPI.
- **Internacionalização (i18n):** Suporte completo para múltiplos idiomas (PT/EN/ES), incluindo dados da API e interface.
- **Design Responsivo:** Layout adaptável para dispositivos móveis e desktop com Tailwind CSS.

---

## 🛠️ Tecnologias & Ferramentas

| Ferramenta              | Descrição                                                                |
| :---------------------- | :----------------------------------------------------------------------- |
| **Vite**                | Build tool ultra-rápida para o desenvolvimento web moderno.              |
| **Tailwind CSS v4**     | Framework utilitário para estilização rápida e design consistente.       |
| **Vanilla JS**          | Lógica pura, sem frameworks pesados (React/Vue), focando em performance. |
| **ESLint**              | Guardião da qualidade do código, padronizando a escrita.                 |
| **Prettier**            | Formatador automático para manter o código bonito e legível.             |
| **Husky & Lint-staged** | Automação que impede commits com erros ou fora do padrão.                |

---

## ⚡ Por que GraphQL? (Performance)

Optei pelo uso de GraphQL em vez da API REST tradicional da PokeAPI por questões estratégicas de performance:

- **Requisição Única:** Na API REST padrão, a listagem retorna apenas nomes e URLs. Para exibir imagens e tipos, seriam necessárias 18 chamadas adicionais por página. Com GraphQL, foi feito apenas uma.

- **Otimização de Dados:** Foi pedido exatamente os campos necessários, reduzindo o consumo de banda e evitando o problema de n+1 requests no front-end.

---

## 📦 Por que essas bibliotecas?

Conforme o nosso `package.json`, utilizamos ferramentas específicas para garantir um ambiente profissional:

1. **`tailwindcss` & `@tailwindcss/vite`**: Escolhido para estilização via classes utilitárias, permitindo criar interfaces complexas sem sair do HTML/JS.
2. **`eslint` & `eslint-plugin-prettier`**: Garantem que o código siga as melhores práticas de JavaScript, evitando bugs bobos e mantendo o estilo visual do código.
3. **`husky`**: Cria "hooks" de Git. Ele roda comandos automaticamente antes de você confirmar um commit.
4. **`lint-staged`**: Trabalha junto com o Husky para rodar o Linter e o Prettier **apenas** nos arquivos que você modificou, economizando tempo.
5. **`postcss` & `autoprefixer`**: Garantem que o CSS gerado funcione em todos os navegadores, adicionando prefixos necessários automaticamente.

---

## 📜 Scripts Disponíveis

- **`npm run dev:`** Inicia o servidor local de desenvolvimento.

- **`npm run build:`** Prepara o projeto para produção.

- **`npm run lint:`** Procura erros de padrão no código.

- **`npm run format:`** Corrige automaticamente a formatação dos arquivos.

<p align="center">
  Desenvolvido com ❤️ e muito café por <a href="https://github.com/belamacedo">Isabela Macedo</a>.
</p>
