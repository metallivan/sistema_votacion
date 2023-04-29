-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2023 a las 02:09:06
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: sistema_votacion
--
CREATE DATABASE IF NOT EXISTS sistema_votacion DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE sistema_votacion;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla candidatos
--

CREATE TABLE candidatos (
  id int(11) NOT NULL,
  candidato varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA candidatos:
--

--
-- Volcado de datos para la tabla candidatos
--

INSERT INTO candidatos (id, candidato) VALUES
(1, 'Elon Muskevich'),
(2, 'Donaldo Trompeta'),
(3, 'Biyan Elekub'),
(4, 'Juan Claudio Vandam'),
(5, 'Joseph Alfred Fonts'),
(6, 'Jonathan J. Joestar'),
(7, 'Marcos Zucaritas'),
(8, 'Zelda DeHyrule'),
(9, 'Barbara Blade'),
(10, 'Escarlet Yojanson');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla comunas
--

CREATE TABLE comunas (
  id bigint(20) NOT NULL,
  comuna varchar(255) NOT NULL,
  region_id tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA comunas:
--

--
-- Volcado de datos para la tabla comunas
--

INSERT INTO comunas (id, comuna, region_id) VALUES
(1, 'Arica', 1),
(2, 'Camarones', 1),
(3, 'Putre', 1),
(4, 'General Lagos', 1),
(5, 'Iquique', 2),
(6, 'Alto Hospicio', 2),
(7, 'Pozo Almonte', 2),
(8, 'Camiña', 2),
(9, 'Antofagasta', 3),
(10, 'Mejillones', 3),
(11, 'Taltal', 3),
(12, 'Tocopilla', 3),
(13, 'Copiapó', 4),
(14, 'Vallenar', 4),
(15, 'Chañaral', 4),
(16, 'Diego de Almagro', 4),
(17, 'Coquimbo', 5),
(18, 'La Serena', 5),
(19, 'Ovalle', 5),
(20, 'Illapel', 5),
(21, 'Valparaíso', 6),
(22, 'Viña del Mar', 6),
(23, 'Quilpué', 6),
(24, 'San Antonio', 6),
(25, 'Santiago', 7),
(26, 'Providencia', 7),
(27, 'Las Condes', 7),
(28, 'Maipú', 7),
(29, 'Rancagua', 8),
(30, 'Santa Cruz', 8),
(31, 'San Fernando', 8),
(32, 'Pichilemu', 8),
(33, 'Talca', 9),
(34, 'Cauquenes', 9),
(35, 'Curicó', 9),
(36, 'Linares', 9),
(37, 'Chillán', 10),
(38, 'Bulnes', 10),
(39, 'San Carlos', 10),
(40, 'Cobquecura', 10),
(41, 'Concepción', 11),
(42, 'Los Ángeles', 11),
(43, 'Coronel', 11),
(44, 'Talcahuano', 11),
(45, 'Temuco', 12),
(46, 'Villarrica', 12),
(47, 'Angol', 12),
(48, 'Loncoche', 12),
(49, 'Valdivia', 13),
(50, 'La Unión', 13),
(51, 'Río Bueno', 13),
(52, 'Paillaco', 13),
(53, 'Puerto Montt', 14),
(54, 'Osorno', 14),
(55, 'Ancud', 14),
(56, 'Castro', 14),
(57, 'Coyhaique', 15),
(58, 'Aysén', 15),
(59, 'Chile Chico', 15),
(60, 'Cochrane', 15),
(61, 'Punta Arenas', 16),
(62, 'Puerto Natales', 16),
(63, 'Porvenir', 16),
(64, 'Cabo de Hornos', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla regiones
--

CREATE TABLE regiones (
  id tinyint(4) NOT NULL,
  region varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA regiones:
--

--
-- Volcado de datos para la tabla regiones
--

INSERT INTO regiones (id, region) VALUES
(1, 'Arica y Parinacota'),
(2, 'Tarapacá'),
(3, 'Antofagasta'),
(4, 'Atacama'),
(5, 'Coquimbo'),
(6, 'Valparaíso'),
(7, 'Metropolitana de Santiago'),
(8, 'Libertador General Bernardo O\'Higgins'),
(9, 'Maule'),
(10, 'Ñuble'),
(11, 'Biobío'),
(12, 'Araucanía'),
(13, 'Los Ríos'),
(14, 'Los Lagos'),
(15, 'Aysén del General Carlos Ibáñez del Campo'),
(16, 'Magallanes y de la Antártica Chilena');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla votaciones
--

CREATE TABLE votaciones (
  id bigint(20) UNSIGNED NOT NULL,
  nombre varchar(255) NOT NULL,
  alias varchar(50) NOT NULL,
  rut varchar(10) NOT NULL,
  email varchar(255) NOT NULL,
  region_id tinyint(4) NOT NULL,
  comuna_id bigint(20) NOT NULL,
  candidato_id int(11) NOT NULL,
  fuentes varchar(255) NOT NULL,
  fecha_voto datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA votaciones:
--   candidato_id
--       candidatos -> id
--   comuna_id
--       comunas -> id
--   region_id
--       regiones -> id
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla candidatos
--
ALTER TABLE candidatos
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla comunas
--
ALTER TABLE comunas
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla regiones
--
ALTER TABLE regiones
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla votaciones
--
ALTER TABLE votaciones
  ADD PRIMARY KEY (id),
  ADD KEY candidato_id (candidato_id),
  ADD KEY comuna_id (comuna_id),
  ADD KEY region_id (region_id);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla candidatos
--
ALTER TABLE candidatos
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla comunas
--
ALTER TABLE comunas
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla regiones
--
ALTER TABLE regiones
  MODIFY id tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla votaciones
--
ALTER TABLE votaciones
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla votaciones
--
ALTER TABLE votaciones
  ADD CONSTRAINT votaciones_ibfk_1 FOREIGN KEY (candidato_id) REFERENCES candidatos (id),
  ADD CONSTRAINT votaciones_ibfk_2 FOREIGN KEY (comuna_id) REFERENCES comunas (id),
  ADD CONSTRAINT votaciones_ibfk_3 FOREIGN KEY (region_id) REFERENCES regiones (id);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
