-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30/01/2025 às 13:22
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `gerenciamento_mercado_perto`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `lojas`
--

CREATE TABLE `lojas` (
  `nome_loja` varchar(40) DEFAULT NULL,
  `razao_social` varchar(144) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `cidade` varchar(60) DEFAULT NULL,
  `bairro` varchar(60) DEFAULT NULL,
  `endereco` varchar(60) DEFAULT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `telefone` int(11) DEFAULT NULL,
  `cep` int(11) DEFAULT NULL,
  `numero_endereco` int(11) DEFAULT NULL,
  `complemento` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`cnpj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `Id_Produto` int(11) NOT NULL,
  `Nome_Produto` varchar(60) DEFAULT NULL,
  `Descricao` varchar(300) DEFAULT NULL,
  `Preco` float DEFAULT NULL,
  `Quantidade_Estoque` int(11) DEFAULT NULL,
  `Codigo_Barra` varchar(60) DEFAULT NULL,
  `Imagem_Produto` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`Id_Produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `Nome_Usuario` char(30) DEFAULT NULL,
  `Sobrenome` char(60) DEFAULT NULL,
  `Email_Usuario` char(80) DEFAULT NULL,
  `Senha_Usuario` char(25) DEFAULT NULL,
  `Id_Usuario` int(11) NOT NULL,
  PRIMARY KEY (`Id_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda`
--

CREATE TABLE `venda` (
  `id_venda` int(11) NOT NULL AUTO_INCREMENT,
  `cnpj` VARCHAR(14) NOT NULL,
  `id_loja` VARCHAR(14) NOT NULL,
  `data_venda` datetime DEFAULT current_timestamp(),
  `preco_total` decimal(10,2) NOT NULL,
  `status` enum('pendente','pago','cancelado') DEFAULT 'pendente',
  PRIMARY KEY (`id_venda`),
  KEY `fk_loja` (`id_loja`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda_item`
--

CREATE TABLE `venda_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_venda` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `preco_unitario` decimal(7,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_venda` (`id_venda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Restrições para tabelas `venda`
--
ALTER TABLE `venda`
  ADD CONSTRAINT `fk_loja` FOREIGN KEY (`id_loja`) REFERENCES `lojas` (`cnpj`) ON DELETE CASCADE;

--
-- Restrições para tabelas `venda_item`
--
ALTER TABLE `venda_item`
  ADD CONSTRAINT `fk_venda` FOREIGN KEY (`id_venda`) REFERENCES `venda` (`id_venda`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
