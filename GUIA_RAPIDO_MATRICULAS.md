# 🎯 Guia Rápido - Sistema de Matrículas

## 📍 URLs de Acesso

### Criar Nova Matrícula

```
http://localhost:3000/admin/matriculas/nova
```

### Gerenciar Matrículas

```
http://localhost:3000/admin/matriculas
```

---

## 🔄 Fluxo Visual

### Criar Nova Matrícula

```
┌──────────────────────────────────────┐
│ Página: /admin/matriculas/nova       │
│ HTML: matriculas.html                │
│ Script: matricula.js                 │
└──────────────┬───────────────────────┘
               │
               ▼
        ┌─────────────┐
        │  Formulário │
        │   Válido?   │
        └──────┬──────┘
               │
         ┌─────┴─────┐
         │           │
        NÃO         SIM
         │           │
         │    ┌──────▼──────────────────┐
         │    │ Enviar dados via Fetch │
         │    │ POST /api/matricula    │
         │    └──────┬──────────────────┘
         │           │
         │           ▼
         │    ┌──────────────────────────┐
         │    │ MatriculaController      │
         │    │ .criar()                 │
         │    └──────┬───────────────────┘
         │           │
         │           ▼
         │    ┌──────────────────────────┐
         │    │ MatriculaDisciplina      │
         │    │ Service.criar()          │
         │    │ + Validação              │
         │    └──────┬───────────────────┘
         │           │
         │           ▼
         │    ┌──────────────────────────┐
         │    │ MatriculaDisciplina      │
         │    │ Dao.create()             │
         │    │ INSERT no BD              │
         │    └──────┬───────────────────┘
         │           │
         │           ▼
         │    ┌──────────────────────────┐
         │    │ Sucesso!                 │
         │    │ Redireciona para /admin/ │
         │    │ matriculas               │
         │    └──────────────────────────┘
         │
         └─► Mostrar erro
```

### Gerenciar Matrículas

```
┌──────────────────────────────────┐
│ Página: /admin/matriculas        │
│ HTML: gerenciarMatriculas.html   │
│ Script: gerenciarMatriculas.js   │
└──────────────┬────────────────────┘
               │
               ▼
        ┌─────────────────────┐
        │ Carregar Matrículas │
        │ GET /api/matricula/ │
        │ completo            │
        └────────┬────────────┘
                 │
                 ▼
        ┌─────────────────────┐
        │ Renderizar Tabela   │
        │ com Status Cores    │
        └────────┬────────────┘
                 │
        ┌────────┴─────────┐
        │                  │
        ▼                  ▼
   ┌────────────┐   ┌─────────────┐
   │ Filtros:   │   │ Ações:      │
   │ - Busca    │   │ - Visualizar│
   │ - Curso    │   │ - Editar    │
   │ - Status   │   │ - Deletar   │
   └────────────┘   └─────────────┘
```

---

## 🎮 Como Usar

### 1️⃣ Criar Matrícula

**Passo 1**: Acesse `/admin/matriculas/nova`

**Passo 2**: Preencha o formulário

- Nome do Aluno
- Data de Nascimento
- CPF
- Curso
- Série
- Turma
- Observações (opcional)

**Passo 3**: Clique em "Finalizar Matrícula 🚀"

**Passo 4**: Quando solicitado

- Digite a matrícula do aluno (ex: `MAT001`)
- Digite o ID da disciplina (ex: `1`)

**Passo 5**: Confirme o sucesso

- A página redirecionará para `/admin/matriculas`

---

### 2️⃣ Gerenciar Matrículas

**Listar**:

- Acesse `/admin/matriculas`
- A página carrega automaticamente

**Buscar**:

- Use o campo "Buscar Aluno" (nome, CPF, código)
- Escolha filtros de Curso e Status

**Visualizar (👁️)**:

- Clique no botão 👁️
- Veja os detalhes em um popup

**Editar (✏️)**:

- Clique no botão ✏️
- Digite o novo status
- Valores: CURSANDO, APROVADO, REPROVADO, TRANCADO

**Deletar (🗑️)**:

- Clique no botão 🗑️
- Confirme a exclusão
- A matrícula será removida do banco

---

## 🎨 Cores de Status

| Status    | Cor                | Hex       |
| --------- | ------------------ | --------- |
| CURSANDO  | 🔵 Azul            | `#dbeafe` |
| APROVADO  | 🟢 Verde           | `#d1fae5` |
| REPROVADO | 🔴 Vermelho        | `#fee2e2` |
| TRANCADO  | 🔴 Vermelho escuro | `#fee2e2` |

---

## ⚙️ Configuração

### Variáveis de Entrada Esperadas

#### POST /api/matricula

```json
{
    "discente_matricula": "MAT001",
    "disciplina_id": 1,
    "ano": 2026,
    "semestre": "1",
    "status": "CURSANDO"
}
```

#### PATCH /api/matricula/:id/status

```json
{
    "status": "APROVADO"
}
```

---

## 🐛 Troubleshooting

### Erro: "Matrícula não encontrada"

- Verifique se a matrícula do aluno existe no banco
- Verifique se o ID da disciplina existe

### Erro: "Status inválido"

- Use apenas: CURSANDO, APROVADO, REPROVADO, TRANCADO
- Não esqueça de maiúsculas

### A tabela não carrega

- Abra o console (F12) e procure por erros
- Verifique se a API está rodando
- Verifique se há dados no banco

### Filtros não funcionam

- Recarregue a página
- Limpe o cache do navegador
- Verifique se há matrículas no banco

---

## 📞 Comandos Úteis

### Testar API no terminal (PowerShell)

**Listar matrículas**:

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/matricula" -Method GET
```

**Criar matrícula**:

```powershell
$body = @{
    discente_matricula = "MAT001"
    disciplina_id = 1
    ano = 2026
    semestre = "1"
    status = "CURSANDO"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/matricula" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

---

## 📚 Documentação Completa

Veja `DOCUMENTACAO_MATRICULAS_API.md` para detalhes técnicos completos.
