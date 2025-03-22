-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS d3_formularios;
USE d3_formularios;

-- Criação da tabela de usuário
CREATE TABLE IF NOT EXISTS usuario (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nome VARCHAR(50) NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(60) NOT NULL
);

CREATE INDEX idx_usuario_login ON usuario (login);

-- Criação de um usuário admin com senha bcrypt (simulação de hash)
INSERT INTO usuario (nome, login, senha) 
VALUES (
    'Administrador', 
    'admin', 
    '$2b$10$w6y6.dGp3zUpNC3H91QquOfOHWCEcFj7mZP7wSu8Mc.DOfokj9MoG' -- senha = "SenhaForte@123"
);

-- Criação da tabela de formulário
CREATE TABLE IF NOT EXISTS formulario (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    criado_por CHAR(36),
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36),
    deletado_em TIMESTAMP NULL,
    deletado_por CHAR(36),
    nome VARCHAR(50) NOT NULL,
    rota VARCHAR(50) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    titulo_final VARCHAR(255) NOT NULL,
    descricao_final VARCHAR(255) NOT NULL,
    web BOOLEAN DEFAULT 0,
    mobile BOOLEAN DEFAULT 0,
    desktop BOOLEAN DEFAULT 0,
    CONSTRAINT fk_form_criado_por FOREIGN KEY (criado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_form_atualizado_por FOREIGN KEY (atualizado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_form_deletado_por FOREIGN KEY (deletado_por) REFERENCES usuario(id) ON DELETE SET NULL
);

CREATE INDEX idx_formulario_rota ON formulario (rota, deletado_em, web, mobile, desktop);

-- Criação da tabela de pergunta
CREATE TABLE IF NOT EXISTS pergunta (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    criado_por CHAR(36),
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36),
    deletado_em TIMESTAMP NULL,
    deletado_por CHAR(36),
    formulario_id CHAR(36) NOT NULL,
    etapa INT DEFAULT 1,
    label VARCHAR(255) NOT NULL,
    tipo ENUM('select', 'textarea', 'radio') NOT NULL,
    opcoes JSON,
    CONSTRAINT fk_perg_form FOREIGN KEY (formulario_id) REFERENCES formulario(id) ON DELETE CASCADE,
    CONSTRAINT fk_perg_criado_por FOREIGN KEY (criado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_perg_atualizado_por FOREIGN KEY (atualizado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_perg_deletado_por FOREIGN KEY (deletado_por) REFERENCES usuario(id) ON DELETE SET NULL
);

-- Criação da tabela de envio
CREATE TABLE IF NOT EXISTS envio (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36),
    deletado_em TIMESTAMP NULL,
    deletado_por CHAR(36),
    formulario_id CHAR(36) NOT NULL,
    nome VARCHAR(255),
    email VARCHAR(255),
    resultado_acerto DECIMAL(5,2),
    resultado_vazio DECIMAL(5,2),
    resultado_erros DECIMAL(5,2),
    CONSTRAINT fk_env_form FOREIGN KEY (formulario_id) REFERENCES formulario(id) ON DELETE CASCADE,
    CONSTRAINT fk_env_atualizado_por FOREIGN KEY (atualizado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_env_deletado_por FOREIGN KEY (deletado_por) REFERENCES usuario(id) ON DELETE SET NULL
);

CREATE INDEX idx_envio_email ON envio (email, deletado_em);

-- Criação da tabela de resposta
CREATE TABLE IF NOT EXISTS resposta (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36),
    deletado_em TIMESTAMP NULL,
    deletado_por CHAR(36),
    envio CHAR(36) NOT NULL,
    pergunta_id CHAR(36) NOT NULL,
    valor MEDIUMTEXT,
    status ENUM('acerto', 'erro', 'vazio') NOT NULL,
    CONSTRAINT fk_resp_env FOREIGN KEY (envio) REFERENCES envio(id) ON DELETE CASCADE,
    CONSTRAINT fk_resp_perg FOREIGN KEY (pergunta_id) REFERENCES pergunta(id) ON DELETE CASCADE,
    CONSTRAINT fk_resp_atualizado_por FOREIGN KEY (atualizado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_resp_deletado_por FOREIGN KEY (deletado_por) REFERENCES usuario(id) ON DELETE SET NULL
);

-- Exibir usuários para conferência
SELECT * FROM usuario;
