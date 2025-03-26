CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'xK9#mP2$vL5nQ8jR';

-- Conceder permissões globais ao usuário admin
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

-- Forçar o MySQL a aplicar as permissões
FLUSH PRIVILEGES;

-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS d3_formularios;
USE d3_formularios;

-- Criação da tabela de usuário
CREATE TABLE IF NOT EXISTS usuario (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    criado_por CHAR(36) DEFAULT NULL,
    atualizado_em TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36) DEFAULT NULL,
    deletado_em TIMESTAMP NULL,
    deletado_por CHAR(36),
    nome VARCHAR(50) NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE INDEX idx_usuario_login ON usuario (login);

-- Criação de um usuário admin com senha bcrypt (simulação de hash)
INSERT INTO usuario (nome, login, senha) 
VALUES (
    'Administrador', 
    'admin', 
    '$2b$10$GDiICta.gIVfUaD8ehzMNudc.b6k08s0.lBOVUxCGD1.AIeiWqIU6' -- senha = "SenhaD3@2025"
);

-- Criação da tabela de formulário
CREATE TABLE `formulario` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `criado_por` char(36) DEFAULT NULL,
  `atualizado_em` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `atualizado_por` char(36) DEFAULT NULL,
  `deletado_em` timestamp NULL DEFAULT NULL,
  `deletado_por` char(36) DEFAULT NULL,
  `nome` varchar(50) NOT NULL,
  `rota` varchar(50) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `titulo_final` varchar(255) NOT NULL,
  `descricao_final` varchar(255) NOT NULL,
  `imagem_fundo` varchar(255) DEFAULT 'default',
  `cor_fundo` char(7) DEFAULT '#000000',
  `cor_principal` char(7) DEFAULT '#FFFF00',
  `web` tinyint(1) DEFAULT '0',
  `mobile` tinyint(1) DEFAULT '0',
  `desktop` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `rota` (`rota`),
  KEY `fk_form_criado_por` (`criado_por`),
  KEY `fk_form_atualizado_por` (`atualizado_por`),
  KEY `fk_form_deletado_por` (`deletado_por`),
  KEY `idx_formulario_rota` (`rota`,`deletado_em`,`web`,`mobile`,`desktop`),
  CONSTRAINT `fk_form_atualizado_por` FOREIGN KEY (`atualizado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_form_criado_por` FOREIGN KEY (`criado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_form_deletado_por` FOREIGN KEY (`deletado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL
);

-- Criação da tabela de pergunta
CREATE TABLE IF NOT EXISTS pergunta (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    criado_por CHAR(36),
    atualizado_em TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36) DEFAULT NULL,
    deletado_em TIMESTAMP NULL,
    deletado_por CHAR(36),
    formulario_id CHAR(36) NOT NULL,
    etapa INT DEFAULT 1,
    label VARCHAR(255) NOT NULL,
    tipo ENUM('select', 'textarea', 'radio') NOT NULL,
    opcoes JSON,
    gabarito JSON,
    CONSTRAINT fk_perg_form FOREIGN KEY (formulario_id) REFERENCES formulario(id) ON DELETE CASCADE,
    CONSTRAINT fk_perg_criado_por FOREIGN KEY (criado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_perg_atualizado_por FOREIGN KEY (atualizado_por) REFERENCES usuario(id) ON DELETE SET NULL,
    CONSTRAINT fk_perg_deletado_por FOREIGN KEY (deletado_por) REFERENCES usuario(id) ON DELETE SET NULL
);

-- Criação da tabela de envio
CREATE TABLE IF NOT EXISTS envio (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36) DEFAULT NULL,
    deletado_em TIMESTAMP NULL,
    deletado_por CHAR(36) DEFAULT NULL,
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
    atualizado_em TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    atualizado_por CHAR(36) DEFAULT NULL,
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
