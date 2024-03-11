-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: shenlongcomics
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritodecompras`
--

DROP TABLE IF EXISTS `carritodecompras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritodecompras` (
  `usuarios_id` int NOT NULL,
  `productos_id` int NOT NULL,
  `productos_generos_idGenero` int NOT NULL,
  `id_carrito` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`usuarios_id`,`productos_id`,`productos_generos_idGenero`,`id_carrito`),
  UNIQUE KEY `productos_id_UNIQUE` (`productos_id`),
  UNIQUE KEY `id_carrito_UNIQUE` (`id_carrito`),
  KEY `fk_usuarios_has_productos_productos1_idx` (`productos_id`,`productos_generos_idGenero`),
  KEY `fk_usuarios_has_productos_usuarios1_idx` (`usuarios_id`),
  CONSTRAINT `fk_usuarios_has_productos_productos1` FOREIGN KEY (`productos_id`, `productos_generos_idGenero`) REFERENCES `productos` (`id`, `generos_idGenero`),
  CONSTRAINT `fk_usuarios_has_productos_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritodecompras`
--

LOCK TABLES `carritodecompras` WRITE;
/*!40000 ALTER TABLE `carritodecompras` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritodecompras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `idGenero` int NOT NULL AUTO_INCREMENT,
  `genero` varchar(45) NOT NULL,
  PRIMARY KEY (`idGenero`),
  UNIQUE KEY `genero_UNIQUE` (`genero`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (2,'Cómic'),(1,'Manga');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreProd` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descripcion` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descuento` decimal(10,0) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `generos_idGenero` int NOT NULL,
  `autor` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`,`generos_idGenero`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_productos_categorias_idx` (`generos_idGenero`),
  CONSTRAINT `fk_productos_categorias` FOREIGN KEY (`generos_idGenero`) REFERENCES `generos` (`idGenero`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'BATMAN HISTORIAS DEL DEMONIO','vamos a ver ahora',7000,5,10,2,'DENNY O´NEIL','prod-1709251270135.webp'),(2,'DRAGON BALL SUPER 01','Explora las oscuras y La emocionante continuación de las aventuras de Goku y sus amigos después de la derrota de Majin Buu.',1234,5,15,2,'AKIRA TORIYAMA','prod-1709251996768.jpg'),(3,'BATMAN: ABISMO','prueba para ver si al editar me pisa los cambios ',7500,5,4,2,'KARL KERSCHL','prod-1709252267193.webp'),(4,'BLUE PERIOD 13','Descubre el emocionante mundo de Blue Period ',600,0,20,2,'Panini manga','prod-1709252399245.jpg'),(5,'BATMAN: EL LARGO HALLOWEEN','',899,10,1,2,'Jeph Loeb (guion) y Tim Sale (dibujos)','prod-1709426463677.jpg'),(8,'BATMAN KNIGHTFALL VOL.3: LA CRUZADA DEL','Acompaña a Batman en su lucha contra el crimen mientras enfrenta desafíos que pondrán a prueba su voluntad y habilidades.',8000,0,4,2,'Ovni Press','prod-1709252550209.webp'),(9,'SLAM DUNK 27 (SOBRECUBIERTA)','La obra más conocida del famosísimo Takehiko Inoue, narra la historia de Hanamichi Sakuragi, el típico quilombero de instituto japonés (clásico de los mangas de peleas de estudiantes) con el giro argumental de que quiere convertirse en jugador de básquetbol.',5000,0,4,2,' TAKEHIKO INOUE','prod-1709252598841.jpg'),(10,'BATMAN VAMPIRO','La obra más conocida del famosísimo Takehiko Inoue, narra la historia de Hanamichi Sakuragi, el típico quilombero de instituto japonés (clásico de los mangas de peleas de estudiantes) con el giro argumental de que quiere ¡Edición en papel obra y logo en stamping metalizado! HIJOS DE LA NOCHE La Ciudad de Gotham está atrapada en una espiral de corrupción y decadencia, y aquellos que se alimentan de la sangre y la desesperación están a punto de consumir toda la vida que queda en sus moribundas venas. Lo único que se interpone entre ellos es Batman, el legendario vengador en las sombras...',14500,0,4,2,'DOUGH MOENCH','prod-1709252643776.webp'),(11,'LA VEZ QUE REENCARNE EN SLIME 12','La obra más conocida del famosísimo Takehiko Inoue, narra la historia de Hanamichi Sakuragi, el típico quilombero de instituto japonés (clásico de los mangas de peleas de estudiantes) con el giro argumental de que quiere ¡Edición en papel obra y logo en stamping metalizado! HIJOS DE LA NOCHE La Ciudad de Gotham está atrapada en una espiral de corrupción y decadencia, y aquellos que se alimentan de la sangre y la desesperación están a punto de consumir toda la vida que queda en sus moribundas venas. Lo único que se interpone entre ellos es Batman, el Después de salvar a los niños que Shizu dejo atrás al morir, Rimuru se retira de Ingrassia. Al mismo tiempo, las Naciones del Oeste, insatisfechas con el rápido crecimiento de la influencia del país de los monstruos, se disponen a atacar a Rimuru y a la nación de Tempest, ahora que su líder no se encuentra en ella. ',4800,0,6,2,' TAIKI KAWAKAMI','prod-1709252575641.jpg'),(12,'20 PISOS DE TERROR','Una novela ágil; con atrapante ritmo de thriller cinematográfico. Manuel; un preadolescente que; afectado por la mudanza a un moderno complejo de edificios; se verá envuelto por un misterio cuya resolución lo enfrentará con lo desconocido. ',7800,0,12,2,' JOSE MONTERO','prod-1709251973288.jpg'),(17,'1. SANDMAN : PRELUDIOS Y NOCTURNOS','Una de las novelas gráficas más populares y aclamadas por la crítica de todos los tiempos, la galardonada obra maestra de Neil Gaiman, SANDMAN, estableció el estándar para la fantasía lírica y madura en la era moderna de los cómics. Ilustrada por un seleccionado ejemplar de los artistas más talentosos del medio, esta serie es una rica mezcla de mitología moderna y antigua en la que la ficción contemporánea, el drama histórico y la leyenda están perfectamente entrelazados.\r\n\r\nPRELUDIOS Y NOCTURNOS recopila los números #1-8 de la serie original de THE SANDMAN, comenzando una saga épica única en la literatura gráfica e introduciendo a los lectores a un mundo oscuro y encantador de sueños y pesadillas: la casa de Morfeo, el Rey de los Sueños y sus parientes, los Eternos.',14500,0,6,2,'GAIMAN, NEIL','prod-1709420806793.webp'),(18,' 9. SANDMAN LAS BENEVOLAS','La una que es tres, las Furias, las Euménides, las Erinias o las Hécates. Son diversos los nombres recibidos por estas criaturas que encarnan la venganza y el odio interminable. Ha llegado el momento de que sus caminos se crucen con los de Lyta Hall y Morfeo, ahora convertido en presa que bien podría perder todo cuanto ha construido.',16500,0,8,2,'GAIMAN, NEIL','prod-1709426680604.jpg'),(19,'Fairy Tail - Libro 27','Salvat te trae Fairy Tail en un gran formato de 19 x 24 cm, perfecto para coleccionistas. Todas las historias de este manga de culto, obra de Hiro Mashima, en magníficos volúmenes de más de 300 páginas.',1300,0,3,1,'    Hiro Mashima. Dibujo: Hiro Mashima','prod-1709426904432.jpg'),(21,'LOS DIARIOS DE LA BOTICARIA 02','Maomao, una joven que fue descubierta por Jinshi, un eunuco, y terminó convirtiéndose en la dama de compañía de la concubina Gyokuyo, recibe una orden directa del Emperador para llevar a cabo cierta tarea Además, se prepara para participar en su primera fiesta en el jardín. Sin embargo ¡¡ Un segundo volumen en el que Maomao, impulsada por su innata curiosidad e insaciable sed de conocimiento, sin querer comienza a destacarse y a llamar la atención?! ',8000,0,5,1,' NATSU HYUUGA','prod-1709427271103.jpg'),(24,'MARTIN FIERRO','Poema narrativo fundacional de la literatura gauchesca, que relata la historia de un gaucho reclutado para defender la frontera contra los indígenas. Uno de los títulos más importantes de la literatura argentina, el poema narra, en primera persona y a modo de payada, las desventuras de un gaucho reclutado por el ejército para defender las fronteras. Reflejando la discriminación, el abandono y la persecución por parte del Estado que sufriera en el periplo. ',5500,10,8,2,' JOSE HERNANDEZ','prod-1709445183280.jpg'),(26,'LOBO GREATEST HITS','¡Edición en papel obra y logo en stamping metalizado! Cuando el infame mercenario intergaláctico es succionado por un agujero negro, te conviertes en elarquitecto de su destino. Enfréntate a decisiones impredecibles mientras Lobo repasa momentos clave de su vida, en los que el Más Grande esparce su caos asesino por todas partes y se enfrenta a Mister Miracle, a la Liga de la Justicia y al mismísimo Hombre de Acero... Pero ten cuidado, ¡cadaelección lleva a un destino diferente! ¿Lograrás guiar a Lobo hacia la libertad o lo llevarás a una muerte segura? ¡Prepárate para un festín interactivo de caos y humor negro que hará las delicias de los fans de la comedia despiadada y la violencia gráfica! Recopila páginas de Lobo: Greatest Hits, Omega Men #3, 10, 20; Superman #41; Adventures of Superman #464; L.E.G.I.O.N. #3-5, 7-10, 13, 16-18; Justice League International #18-19, 21; y Mister Miracle #13-14. ',13500,15,10,2,' KEITH GIFFEN','prod-1709429144833.jpg'),(34,'ONE PUNCH MAN 14','DESCRIPCIÓN\r\nVarios artistas marciales sin la capacidad para combatir a los monstruos. Unas células que garantizan una fuerza descomunal. Unos cuantos héroes que se enfrentan a las criaturas infernales. Una bestia imponente e invencible que revela parte del plan de la Asociación de Monstruos. Un héroe calvo que huye... del personal de seguridad que lo persigue. ¿Será este el momento en el que Saitama comience a derrotar a los monstruos que han invadido las ciudades? ',6000,5,10,1,' YUSUKE MURATA ONE','prod-1709430258105.jpg'),(41,'LA SOLDADERA','Una fascinante aventura ambientada en la época de la revolución mexicana de principios del siglo XX protagonizada, entre otros, por Pancho Villa. 288 páginas en blanco y negro recopilando la obra completa, inédita en nuestro país. Un documentado y potente guión de Walter Slavich ilustrado minuciosa y majestuosamente por Enrique Breccia. ',13500,15,6,2,' Walter Slavich','prod-1709749776794.jpg'),(43,'CUENTOS DE TERRORRAN','Prepárate para entrar en las sombras de lo desconocido, donde el odio se manifiesta como una fuerza sobrenatural y la venganza desencadena horrores inimaginables. Desde oscuros pactos con demonios hasta asesinatos que liberan fuerzas más allá de la comprensión, estos 22 relatos de TerrorRan te sumergirán en una inquietante travesía hacia el espanto.¿Te atreves a enfrentar tus miedos más profundos? ',11900,0,5,1,' TERRORRAN','prod-1709759499947.jpg'),(44,'CUENTOS DE TERRORRAN','Prepárate para entrar en las sombras de lo desconocido, donde el odio se manifiesta como una fuerza sobrenatural y la venganza desencadena horrores inimaginables. Desde oscuros pactos con demonios hasta asesinatos que liberan fuerzas más allá de la comprensión, estos 22 relatos de TerrorRan te sumergirán en una inquietante travesía hacia el espanto.¿Te atreves a enfrentar tus miedos más profundos? ',11500,0,5,1,' TERRORRAN','prod-1709759595388.jpg');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rol_UNIQUE` (`rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FechaNac` date NOT NULL,
  `correo` varchar(45) NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `roles_id` int DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `fotoPerfil` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  KEY `fk_usuarios_roles1_idx` (`roles_id`),
  CONSTRAINT `fk_usuarios_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'1987-12-12','fatima@gmail.com','1234',NULL,NULL,'Fatima Diaz','user-1710037207844.jpg'),(2,'1999-10-16','lisandor@gmail.com','8cb7ba89-c425-494c-ba5f-566584ce79d4',NULL,NULL,'Lisandro Diaz',NULL),(3,'1999-10-16','luchi@gmail.com','1234',NULL,NULL,'Luchi Paz',NULL),(4,'1999-10-16','correo@gmail.com','06243f77-382e-477e-a932-ed4de68c72a8',NULL,NULL,'mariano',NULL),(9,'1999-10-16','correoprueba@gmail.com','8a615f06-eaed-4610-b2f2-67a7c9d3f3ab',NULL,NULL,'Isaac Avila',NULL),(12,'1988-12-12','correotres@gmail.com','39f704fb-0ebd-4b7e-aeab-f2760269023d',NULL,NULL,'prueba dos',NULL),(13,'1988-12-12','correocuatro@gmail.com','82b67642-08f7-46e4-b12b-858b9a0363e6',NULL,NULL,'prueba tres',NULL),(14,'2002-12-08','joaquien@gmail.com','58df9444-3287-4e83-9cad-2d12c3ca7b88',NULL,NULL,'Joaquin Gonzales',NULL),(15,'1999-01-10','maria@gmail.com','eb2eec00-7af8-4349-bd50-364752df7da7',NULL,NULL,'Maria catan',NULL),(17,'1999-01-10','mariacatan@gmail.com','505a88a8-d545-4e51-afa9-62d6bc022401',NULL,NULL,'Maria catan',NULL),(19,'1993-12-02','eli@gmail.com','0e377bb1-bd6c-45e5-bffd-15e5d939280a',NULL,NULL,'Eliana Dorado',NULL),(21,'1993-12-02','eliana@gmail.com','3e5d63dd-0561-42ed-913b-774fd9e65f3f',NULL,NULL,'Eliana Dorado',NULL),(22,'1988-08-05','gabrielacampos@gmail.com','691cbcf8-643f-4c5e-ae89-36c677df3133',NULL,NULL,'Gabriel Campos',NULL),(23,'1978-04-07','veron@gmail.com','abe0f7b5-d229-4f4c-a4d8-53d79f404030',NULL,NULL,'Hugo Veron',NULL),(24,'1999-02-12','ff@gmail.com','55e803d4-37ef-44d8-9ddf-8a3f4e497dd9',NULL,NULL,'fff',NULL),(27,'1999-02-12','prueba_DE_DE@gmail.com','5ddfb7c1-044a-4e67-91cc-26a94ec2b535',NULL,NULL,'flaco',NULL),(30,'1999-02-12','pruebra_prueba@gmail.com','d4014cfa-dbbd-4cd9-94eb-e56b13f70c81',NULL,NULL,'nombre apellido',NULL),(32,'1999-02-12','pruebra_@gmail.com','4e646efd-dc1b-4f7d-ac8e-de0a93c9a2ec',NULL,NULL,'nombre apellido',NULL),(34,'1987-04-12','bruno@gmail.com','ffcdb6f5-1039-4a22-9f91-3d85c4011b5c',NULL,NULL,'bruno perez',NULL),(36,'1987-04-12','brunoperez@gmail.com','06c50505-ae57-46fb-9a80-cc94b8ba5e80',NULL,NULL,'bruno perez',NULL),(37,'1983-07-25','guadaluper@gmail.com','1234',NULL,NULL,'Guadalupe  Diaz','default-image.png');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-11 16:42:28
