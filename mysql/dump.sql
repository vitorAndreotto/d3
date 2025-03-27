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
INSERT INTO `envio` VALUES ('90d6375d-c30c-4677-b6a5-989145b01099','2025-03-27 16:05:51',NULL,NULL,NULL,NULL,'ed1d153e-8e1e-4ee8-b2d4-942f9ebc5f47','Vitor Afonso Andreotto','vitorandreotto@gmail.com',100.00,0.00,0.00),('c6388783-2525-4583-a20b-104c375f5083','2025-03-27 16:01:54',NULL,NULL,NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04','Vitor Afonso Andreotto','vitorandreotto@gmail.com',100.00,0.00,0.00);
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
  `tipo` enum('tecnologia','saude','educacao','financeiro','marketing') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
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
INSERT INTO `formulario` VALUES ('4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04','2025-03-23 21:06:48','2bc5621a-0823-11f0-bb90-0242c0a8c002','2025-03-27 16:03:16','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,'Formulario do teste','desenvolvedor','Parabéns por chegar até aqui!','Prepare-se para uma jornada incrível! Na D3, você terá a oportunidade de fazer parte de um time talentoso e trabalhar em projetos desafiadores.<br /><br />Tire uma copia do arquivo figma e envie para o email fornecido na vaga.','Obrigado pelo contato!','Responderemos o mais breve possível.','tecnologia',1,1,0,'default','#FFFFFF','#FFFF00','#FFFFFF'),('ed1d153e-8e1e-4ee8-b2d4-942f9ebc5f47','2025-03-27 16:02:10','2bc5621a-0823-11f0-bb90-0242c0a8c002','2025-03-27 16:03:29',NULL,NULL,NULL,'Tech Lead','techlead','Parabéns por chegar até aqui!','Estamos empolgados com o seu interesse em liderar times na D3! Este desafio é voltado para profissionais que têm experiência técnica sólida e habilidades de liderança.<br>Responda com atenção e sinceridade.','Obrigado pelo contato!','Nossa equipe avaliará suas respostas e retornará em breve.','educacao',0,0,0,'default','#FFFFFF','#0000FF','#CCCCFF');
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
INSERT INTO `pergunta` VALUES ('27f38cac-b9c5-4921-aca7-80042af51fe0','2025-03-23 22:46:53','2bc5621a-0823-11f0-bb90-0242c0a8c002','2025-03-26 18:39:20','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04',2,'Qual das seguintes tecnologias é primariamente utilizada para manipular o DOM (Document Object Model) e criar interfaces dinâmicas em aplicações web?','select','[{\"label\": \"Python\", \"value\": 1}, {\"label\": \"JavaScript\", \"value\": 2}, {\"label\": \"SQL\", \"value\": 3}, {\"label\": \"C#\", \"value\": 4}]','[\"2\"]'),('30bed38e-b8e7-4d91-8aa9-16cbbdf4f954','2025-03-23 22:44:58','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04',3,'Escreva uma redação falando sobre o impacto das IAs na área da tecnologia.','textarea',NULL,NULL),('593049d1-f8be-4e4e-a467-4733dfcf638f','2025-03-23 22:10:09','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'4f2e4ee0-c8bc-4c60-ae9c-7dc93ddf1f04',1,'Qual das seguintes opções <corTexto=\'principal\'>NÃO</corTexto> é considerada uma das principais responsabilidades de um desenvolvedor backend?','radio','[{\"label\": \"Criar APIs para serem consumidas por front-ends.\", \"value\": 1}, {\"label\": \"Desenvolver a interface visual do aplicativo.\", \"value\": 2}, {\"label\": \"Gerenciar bancos de dados e armazenamento de informações.\", \"value\": 3}, {\"label\": \"Gerenciar bancos de dados e armazenamento de informações.\", \"value\": 4}, {\"label\": \"Implementar a lógica de negócio da aplicação.\", \"value\": 5}]','[\"2\"]'),('6278b768-7df6-4acb-a0cd-622956a55480','2025-03-27 16:02:10','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'ed1d153e-8e1e-4ee8-b2d4-942f9ebc5f47',1,'Qual das seguintes atividades <corTexto=\'principal\'>NÃO</corTexto> é comumente esperada de um Tech Lead?','radio','[{\"label\": \"Revisar e aprovar pull requests da equipe.\", \"value\": 1}, {\"label\": \"Apoiar no desenvolvimento técnico dos membros do time.\", \"value\": 2}, {\"label\": \"Participar da definição de arquitetura das soluções.\", \"value\": 3}, {\"label\": \"Cuidar do financeiro da empresa e dos salários dos colaboradores.\", \"value\": 4}, {\"label\": \"Garantir que o time esteja alinhado com os objetivos do projeto.\", \"value\": 5}]','[\"4\"]'),('a137b1d2-109b-4db6-bea5-a400781c9838','2025-03-27 16:02:10','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'ed1d153e-8e1e-4ee8-b2d4-942f9ebc5f47',2,'Qual prática a seguir está mais relacionada com garantir a qualidade do código em times de desenvolvimento ágeis?','radio','[{\"label\": \"Evitar o uso de testes automatizados para acelerar entregas.\", \"value\": 1}, {\"label\": \"Realizar code reviews consistentes e colaborativos.\", \"value\": 2}, {\"label\": \"Deixar os desenvolvedores escolherem qualquer padrão de codificação.\", \"value\": 3}, {\"label\": \"Confiar que todo código enviado funciona sem verificação.\", \"value\": 4}, {\"label\": \"Utilizar exclusivamente testes manuais em homologação.\", \"value\": 5}]','[\"2\"]'),('b3e58f82-b9c3-4b7d-884f-c61377bf9fe9','2025-03-27 16:02:10','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'ed1d153e-8e1e-4ee8-b2d4-942f9ebc5f47',3,'Como Tech Lead, como você lidaria com um conflito entre dois desenvolvedores do seu time que têm opiniões técnicas divergentes?','textarea',NULL,NULL),('bf008c11-4b7e-43a3-93d9-d4701315090f','2025-03-27 16:02:10','2bc5621a-0823-11f0-bb90-0242c0a8c002',NULL,NULL,NULL,NULL,'ed1d153e-8e1e-4ee8-b2d4-942f9ebc5f47',4,'Quais práticas você considera essenciais para garantir a evolução técnica contínua de um time de desenvolvimento?','textarea',NULL,NULL);
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
INSERT INTO `resposta` VALUES ('2f930d0a-77e1-4ec2-962c-823f814e87a5','2025-03-27 16:05:51',NULL,NULL,NULL,NULL,'90d6375d-c30c-4677-b6a5-989145b01099','bf008c11-4b7e-43a3-93d9-d4701315090f','<p>Algumas práticas essenciais para garantir a evolução técnica contínua de um time de desenvolvimento incluem a promoção de uma cultura de aprendizado constante, com incentivos à participação em cursos, eventos e comunidades. A realização de code reviews construtivos também é fundamental, pois estimula o compartilhamento de conhecimento e melhora a qualidade do código.</p><p></p><p>Além disso, adotar práticas como pair programming, tech talks internas, e reservar tempo para inovação e experimentação ajuda a manter o time atualizado. Por fim, é importante definir planos de desenvolvimento individual e oferecer feedbacks regulares, alinhando o crescimento técnico com os objetivos da equipe e da empresa.</p>','acerto'),('4f84ddce-3e17-410d-b463-55894fd81a38','2025-03-27 16:05:51',NULL,NULL,NULL,NULL,'90d6375d-c30c-4677-b6a5-989145b01099','a137b1d2-109b-4db6-bea5-a400781c9838','2','acerto'),('577d1bf8-3bd2-4ab8-8743-280079b3608f','2025-03-27 16:01:54',NULL,NULL,NULL,NULL,'c6388783-2525-4583-a20b-104c375f5083','27f38cac-b9c5-4921-aca7-80042af51fe0','2','acerto'),('73b6eaf9-1d37-4bfc-b906-2b5df5cad4de','2025-03-27 16:05:51',NULL,NULL,NULL,NULL,'90d6375d-c30c-4677-b6a5-989145b01099','b3e58f82-b9c3-4b7d-884f-c61377bf9fe9','<p>Como Tech Lead, eu ouviria ambos os lados com atenção, promovendo uma conversa aberta e respeitosa. </p><p>Avaliaria os argumentos com base em critérios técnicos e alinhamento com o projeto.</p>','acerto'),('b96492a0-3e98-4085-81e0-48c9d516eb75','2025-03-27 16:01:54',NULL,NULL,NULL,NULL,'c6388783-2525-4583-a20b-104c375f5083','593049d1-f8be-4e4e-a467-4733dfcf638f','2','acerto'),('d27f86af-b54d-482c-8aa5-856e37d836c1','2025-03-27 16:01:54',NULL,NULL,NULL,NULL,'c6388783-2525-4583-a20b-104c375f5083','30bed38e-b8e7-4d91-8aa9-16cbbdf4f954','<p>A <strong>inteligência artificial</strong> tem provocado uma verdadeira revolução na área da tecnologia. Com sua capacidade de processar grandes volumes de dados e aprender padrões complexos, a IA tem sido aplicada em diversas frentes — desde automação de processos empresariais até diagnósticos médicos assistidos por algoritmos. No desenvolvimento de <em>software</em>, por exemplo, ferramentas baseadas em IA estão auxiliando programadores a escreverem códigos mais rápidos e eficientes, além de facilitar a detecção de bugs. A IA também tem papel central em sistemas de recomendação, segurança digital, análise preditiva e assistentes virtuais.</p><p></p><p>Por outro lado, esse avanço acelerado levanta importantes questionamentos. O impacto no mercado de trabalho, a possibilidade de vieses nos algoritmos e os dilemas éticos envolvendo privacidade e uso de dados são temas cada vez mais discutidos. A substituição de tarefas humanas por máquinas exige uma adaptação profissional e social constante. Assim, enquanto a IA oferece inúmeras oportunidades para inovação, também desafia a sociedade a criar normas e limites que garantam seu uso responsável e justo. O equilíbrio entre progresso e ética será essencial para o futuro dessa tecnologia.</p>','acerto'),('e6ce6edf-c980-41c5-b440-a6acb0f57b15','2025-03-27 16:05:51',NULL,NULL,NULL,NULL,'90d6375d-c30c-4677-b6a5-989145b01099','6278b768-7df6-4acb-a0cd-622956a55480','4','acerto');
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

-- Dump completed on 2025-03-27 13:18:36
