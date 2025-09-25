# n8n-nodes-friendgrid

Este repositório contém um **Custom Node para o n8n** chamado **Random**, que consome a API pública do [Random.org](https://random.org) para gerar números verdadeiramente randômicos.  

Além do node, o projeto inclui a configuração de infraestrutura local com **Docker Compose** e **PostgreSQL**, permitindo subir uma instância do n8n self-hosted e testar o conector personalizado.

---

## 📂 Estrutura do Projeto

```bash
custom-nodes/
└── n8n-nodes-friendgrid/      # Pacote do custom node
    ├── dist/                  # Código compilado (gerado por `npm run build`)
    │   └── nodes/Random/      # Implementação do node Random em JS
    ├── nodes/Random/          # Código-fonte em TypeScript
    ├── infra/                 # Infraestrutura Docker + banco Postgres
    │   ├── docker-compose.yaml
    │   └── .env
    ├── package.json
    ├── tsconfig.json
    └── README.md              # Este guia

⚙️ Configuração do Ambiente
1. Instalar dependências

Na raiz do projeto:

npm install

2. Gerar build
npm run build


Isso criará os arquivos em dist/.

3. Configurar variáveis de ambiente

Edite infra/.env conforme necessário:

POSTGRES_DB=n8n
POSTGRES_USER=n8n
POSTGRES_PASSWORD=n8n

# Timezone
GENERIC_TIMEZONE=America/Sao_Paulo
TZ=America/Sao_Paulo

# Porta local do n8n
N8N_PORT=5678

# Pasta de extensões customizadas
N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom

▶️ Executando Localmente (Docker)

Suba a infraestrutura:

cd infra
docker compose up -d --build


Verifique se o node foi mapeado corretamente:

docker exec -it infra-n8n-1 ls -l /home/node/.n8n/custom/n8n-nodes-friendgrid/dist/nodes/Random


A saída deve listar os arquivos do node (ex.: Random.node.js, Random.node.json, randomIcon.svg).

🚀 Uso no n8n

Acesse o n8n em http://localhost:5678
.

Crie um workflow.

Adicione o node Random.

Configure os parâmetros:

Min → valor mínimo permitido.

Max → valor máximo permitido.

Execute o workflow.

O node fará uma requisição ao endpoint da API Random.org:

GET https://www.random.org/integers/?num=1&min=<MIN>&max=<MAX>&col=1&base=10&format=plain&rnd=new


E retornará um número verdadeiramente randômico.

🧪 Testes

Validação manual:

Compile o projeto (npm run build).

Suba o n8n (docker compose up -d --build).

Adicione o node Random em um workflow.

Configure Min e Max.

Execute e verifique se o número é retornado corretamente da API.

📚 Recursos

Documentação oficial do n8n

Community Nodes

API Random.org