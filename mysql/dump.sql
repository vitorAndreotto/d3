-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: d3_formularios
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `envio`
--

DROP TABLE IF EXISTS `envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `atualizado_por` char(36) DEFAULT NULL,
  `deletado_em` timestamp NULL DEFAULT NULL,
  `deletado_por` char(36) DEFAULT NULL,
  `formulario_id` char(36) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `resultado_acerto` decimal(5,2) NOT NULL,
  `resultado_vazio` decimal(5,2) NOT NULL,
  `resultado_erros` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_env_form` (`formulario_id`),
  KEY `fk_env_atualizado_por` (`atualizado_por`),
  KEY `fk_env_deletado_por` (`deletado_por`),
  KEY `idx_envio_email` (`email`,`deletado_em`),
  CONSTRAINT `fk_env_atualizado_por` FOREIGN KEY (`atualizado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_env_deletado_por` FOREIGN KEY (`deletado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_env_form` FOREIGN KEY (`formulario_id`) REFERENCES `formulario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
INSERT INTO `envio` VALUES ('807c877e-ee70-4805-aaaa-4107d00c4f59','2025-03-27 15:09:09',NULL,NULL,NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04','cxx','cxccx@fd.fdds',100.00,0.00,0.00);
/*!40000 ALTER TABLE `envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `tipo` enum('tecnologia','saude','educacao', 'financeiro', 'marketing') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `web` tinyint(1) DEFAULT '0',
  `mobile` tinyint(1) DEFAULT '0',
  `desktop` tinyint(1) DEFAULT '0',
  `imagem_fundo` varchar(255) DEFAULT 'default',
  `cor_fundo` char(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '#000000',
  `cor_principal` char(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '#FFFF00',
  `cor_texto` char(7) NOT NULL DEFAULT '#FFFFFF',
  PRIMARY KEY (`id`),
  UNIQUE KEY `rota` (`rota`),
  KEY `fk_form_criado_por` (`criado_por`),
  KEY `fk_form_atualizado_por` (`atualizado_por`),
  KEY `fk_form_deletado_por` (`deletado_por`),
  KEY `idx_formulario_rota` (`rota`,`deletado_em`,`web`,`mobile`,`desktop`),
  CONSTRAINT `fk_form_atualizado_por` FOREIGN KEY (`atualizado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_form_criado_por` FOREIGN KEY (`criado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_form_deletado_por` FOREIGN KEY (`deletado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES ('4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04','2025-03-23 21:06:48','2bc5621a-0823-11f0-bb90-0242c0a8c002','2025-03-27 14:30:32','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,'Formulario do teste','desenvolvedor','Parabéns por chegar até aqui!','Prepare-se para uma jornada incrível! Na D3, você terá a oportunidade de fazer parte de um time talentoso e trabalhar em projetos desafiadores.<br /><br />Tire uma copia do arquivo figma e envie para o email fornecido na vaga.','Obrigado pelo contato!','Responderemos o mais breve possível.','saude',1,1,0,'default','#FFFFFF','#FFFF00','#FFFFFF');
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pergunta`
--

DROP TABLE IF EXISTS `pergunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pergunta` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `criado_por` char(36) DEFAULT NULL,
  `atualizado_em` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `atualizado_por` char(36) DEFAULT NULL,
  `deletado_em` timestamp NULL DEFAULT NULL,
  `deletado_por` char(36) DEFAULT NULL,
  `formulario_id` char(36) NOT NULL,
  `etapa` int DEFAULT '1',
  `label` varchar(255) NOT NULL,
  `tipo` enum('select','textarea','radio') NOT NULL,
  `opcoes` json DEFAULT NULL,
  `gabarito` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_perg_form` (`formulario_id`),
  KEY `fk_perg_criado_por` (`criado_por`),
  KEY `fk_perg_atualizado_por` (`atualizado_por`),
  KEY `fk_perg_deletado_por` (`deletado_por`),
  CONSTRAINT `fk_perg_atualizado_por` FOREIGN KEY (`atualizado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_perg_criado_por` FOREIGN KEY (`criado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_perg_deletado_por` FOREIGN KEY (`deletado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_perg_form` FOREIGN KEY (`formulario_id`) REFERENCES `formulario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pergunta`
--

LOCK TABLES `pergunta` WRITE;
/*!40000 ALTER TABLE `pergunta` DISABLE KEYS */;
INSERT INTO `pergunta` VALUES ('27f38cac-b9c5-4921-aca7-80042af51fe0','2025-03-23 22:46:53','2bc5621a-0823-11f0-bb90-0242c0a8c002','2025-03-26 18:39:20','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04',2,'Qual das seguintes tecnologias é primariamente utilizada para manipular o DOM (Document Object Model) e criar interfaces dinâmicas em aplicações web?','select','[{\"label\": \"Python\", \"value\": 1}, {\"label\": \"JavaScript\", \"value\": 2}, {\"label\": \"SQL\", \"value\": 3}, {\"label\": \"C#\", \"value\": 4}]','[\"2\"]'),('30bed38e-b8e7-4d91-8aa9-16cbbdf4f954','2025-03-23 22:44:58','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04',3,'Escreva uma redação falando sobre o impacto das IAs na área da tecnologia.','textarea',NULL,NULL),('593049d1-f8be-4e4e-a467-4733dfcf638f','2025-03-23 22:10:09','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04',1,'Qual das seguintes opções <corTexto=\'principal\'>NÃO</corTexto> é considerada uma das principais responsabilidades de um desenvolvedor backend?','radio','[{\"label\": \"Criar APIs para serem consumidas por front-ends.\", \"value\": 1}, {\"label\": \"Desenvolver a interface visual do aplicativo.\", \"value\": 2}, {\"label\": \"Gerenciar bancos de dados e armazenamento de informações.\", \"value\": 3}, {\"label\": \"Gerenciar bancos de dados e armazenamento de informações.\", \"value\": 4}, {\"label\": \"Implementar a lógica de negócio da aplicação.\", \"value\": 5}]','[\"2\"]');
/*!40000 ALTER TABLE `pergunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resposta`
--

DROP TABLE IF EXISTS `resposta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resposta` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `atualizado_por` char(36) DEFAULT NULL,
  `deletado_em` timestamp NULL DEFAULT NULL,
  `deletado_por` char(36) DEFAULT NULL,
  `envio` char(36) NOT NULL,
  `pergunta_id` char(36) NOT NULL,
  `valor` mediumtext,
  `status` enum('acerto','erro','vazio') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_resp_env` (`envio`),
  KEY `fk_resp_perg` (`pergunta_id`),
  KEY `fk_resp_atualizado_por` (`atualizado_por`),
  KEY `fk_resp_deletado_por` (`deletado_por`),
  CONSTRAINT `fk_resp_atualizado_por` FOREIGN KEY (`atualizado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_resp_deletado_por` FOREIGN KEY (`deletado_por`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_resp_env` FOREIGN KEY (`envio`) REFERENCES `envio` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_resp_perg` FOREIGN KEY (`pergunta_id`) REFERENCES `pergunta` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resposta`
--

LOCK TABLES `resposta` WRITE;
/*!40000 ALTER TABLE `resposta` DISABLE KEYS */;
INSERT INTO `resposta` VALUES ('5da4875a-35af-47ed-ab96-00c9d4064c16','2025-03-27 15:09:09',NULL,NULL,NULL,NULL,'807c877e-ee70-4805-aaaa-4107d00c4f59','27f38cac-b9c5-4921-aca7-80042af51fe0','2','acerto'),('7998f69c-41f8-40ff-8898-329db2d51325','2025-03-27 15:09:09',NULL,NULL,NULL,NULL,'807c877e-ee70-4805-aaaa-4107d00c4f59','593049d1-f8be-4e4e-a467-4733dfcf638f','2','acerto'),('c49aeac3-9e86-4cf4-b82c-2e1a171a0664','2025-03-27 15:09:09',NULL,NULL,NULL,NULL,'807c877e-ee70-4805-aaaa-4107d00c4f59','30bed38e-b8e7-4d91-8aa9-16cbbdf4f954','<p>cxcxcx</p>','acerto');
/*!40000 ALTER TABLE `resposta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `criado_por` char(36) DEFAULT NULL,
  `atualizado_em` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `atualizado_por` char(36) DEFAULT NULL,
  `deletado_em` timestamp NULL DEFAULT NULL,
  `deletado_por` char(36) DEFAULT NULL,
  `nome` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  KEY `idx_usuario_login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('2bc5621a-0823-11f0-bb90-0242c0a8c002','2025-03-23 20:12:39',NULL,'2025-03-23 21:45:36','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,'Usuario Teste 2','admin','$2b$10$GDiICta.gIVfUaD8ehzMNudc.b6k08s0.lBOVUxCGD1.AIeiWqIU6');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'd3_formularios'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 12:25:00
