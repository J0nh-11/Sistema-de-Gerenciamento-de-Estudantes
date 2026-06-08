# 📋 Documentação - Integração de Matrículas com API

## ✅ Conexões Realizadas

### 1. **Página de Nova Matrícula** (`/admin/matriculas/nova`)

- **HTML**: `public/view/admin/matriculas.html`
- **JavaScript**: `public/js/matricula.js`
- **Funcionalidades**:
    - Formulário com validação de campos obrigatórios
    - Seleção cascata: Curso → Série → Turma
    - Envio de dados para API: `POST /api/matricula`
    - Redirecionamento após sucesso
    - Botão Cancelar com confirmação

### 2. **Página de Gerenciar Matrículas** (`/admin/matriculas`)

- **HTML**: `public/view/admin/gerenciarMatriculas.html`
- **JavaScript**: `public/js/gerenciarMatriculas.js`
- **Funcionalidades**:
    - Listagem de todas as matrículas: `GET /api/matricula/completo`
    - Filtros por:
        - Busca (nome, CPF, ID)
        - Curso
        - Status
    - Ações:
        - 👁️ Visualizar detalhes
        - ✏️ Editar status (PATCH `/api/matricula/:id/status`)
        - 🗑️ Deletar (DELETE `/api/matricula/:id`)
    - Contadores dinâmicos
    - Status com cores codificadas

### 3. **Estilos CSS**

- **Arquivo**: `public/css/gerenciarMatriculas.css`
- **Adicionado**:
    - Badge colors para novos status (CURSANDO, APROVADO, REPROVADO, TRANCADO)
    - Estilos para botão de deletar

---

## 🔌 Endpoints da API Utilizados

| Página         | Endpoint                    | Método | Descrição            |
| -------------- | --------------------------- | ------ | -------------------- |
| Nova Matrícula | `/api/matricula`            | POST   | Criar nova matrícula |
| Gerenciar      | `/api/matricula/completo`   | GET    | Listar com detalhes  |
| Gerenciar      | `/api/matricula/:id`        | GET    | Buscar por ID        |
| Gerenciar      | `/api/matricula/:id/status` | PATCH  | Atualizar status     |
| Gerenciar      | `/api/matricula/:id`        | DELETE | Deletar matrícula    |

---

## 📊 Fluxo de Dados

### Nova Matrícula

```
HTML Form
   ↓ (Validação JS)
JavaScript (matricula.js)
   ↓ (Fetch POST)
API POST /api/matricula
   ↓
MatriculaController.criar()
   ↓
MatriculaDisciplinaService.criar()
   ↓
MatriculaDisciplinaDao.create()
   ↓
Database (matricula_disciplina)
```

### Gerenciar Matrículas

```
HTML Table Body
   ↓ (Load on page init)
JavaScript (gerenciarMatriculas.js)
   ↓ (Fetch GET)
API GET /api/matricula/completo
   ↓
MatriculaController.listarCompleto()
   ↓
MatriculaDisciplinaService.listarCompleto()
   ↓
MatriculaDisciplinaDao.listCompleto()
   ↓
Database (JOIN query)
   ↓
Response com dados de aluno + disciplina + docente
```

---

## 🎨 Status Visuais

| Status    | Cor             | Badge              |
| --------- | --------------- | ------------------ |
| CURSANDO  | Azul            | `.badge-cursando`  |
| APROVADO  | Verde           | `.badge-aprovado`  |
| REPROVADO | Vermelho        | `.badge-reprovado` |
| TRANCADO  | Vermelho escuro | `.badge-trancado`  |

---

## 🧪 Testando as Conexões

### Teste 1: Criar Nova Matrícula

1. Acesse `/admin/matriculas/nova`
2. Preencha o formulário
3. Digite matrícula do aluno (ex: MAT001)
4. Digite ID da disciplina (ex: 1)
5. Clique em "Finalizar Matrícula 🚀"
6. Verifique se foi criada em `/admin/matriculas`

### Teste 2: Listar Matrículas

1. Acesse `/admin/matriculas`
2. A página carrega automaticamente todas as matrículas
3. Use os filtros para buscar
4. Clique nos botões de ação

### Teste 3: Atualizar Status

1. Em `/admin/matriculas`
2. Clique no botão ✏️ de uma matrícula
3. Digite novo status (CURSANDO, APROVADO, REPROVADO, TRANCADO)
4. Verifique a atualização na tabela

### Teste 4: Deletar Matrícula

1. Em `/admin/matriculas`
2. Clique no botão 🗑️ de uma matrícula
3. Confirme a exclusão
4. Verifique se foi removida da tabela

---

## 📝 Notas Importantes

1. **Matrícula do Aluno**: O formulário usa `prompt()` para pedir a matrícula do aluno. Você pode melhorar isso com um select carregado do banco.

2. **ID da Disciplina**: Similar à matrícula do aluno, pode ser melhorado com um select das disciplinas disponíveis.

3. **Validação de Dados**: Ambos os formulários fazem validação no cliente. O servidor também valida (trata erros).

4. **Feedback do Usuário**: Usa `alert()` para feedback. Pode ser melhorado com um sistema de toast/notificação.

5. **Permissões**: As rotas view já têm autenticação JWT. As rotas API também devem ter (você pode adicionar middleware).

---

## 🚀 Melhorias Futuras Sugeridas

- [ ] Selects dinâmicos para alunos e disciplinas
- [ ] Sistema de notificações tipo Toast
- [ ] Modal para editar matrícula completa (não apenas status)
- [ ] Paginação na listagem
- [ ] Exportar dados para Excel/PDF
- [ ] Histórico de mudanças (audit trail)
- [ ] Busca avançada com mais filtros

---

## 📞 Suporte

Se encontrar problemas:

1. Abra o console do navegador (F12)
2. Verifique os logs de erro
3. Verifique a aba Network para requisições HTTP
4. Verifique o status da API em `GET /api/matricula`
