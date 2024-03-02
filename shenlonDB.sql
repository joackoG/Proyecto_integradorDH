-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shenlongcomics
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `carritodecompras`






USE shenlongcomics;



/*
DROP TABLE IF EXISTS `carritodecompras`;

!40101 SET @saved_cs_client     = @@character_set_client ;
!50503 SET character_set_client = utf8mb4 ;

LOCK TABLES `carritodecompras` WRITE;
/*!40000 ALTER TABLE `carritodecompras` DISABLE KEYS ;
/*!40000 ALTER TABLE `carritodecompras` ENABLE KEYS ;
UNLOCK TABLES;
*/

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'BATMAN HISTORIAS DEL DEMONIO','vamos a ver ahora',7000,5,10,2,'DENNY O´NEIL','prod-1709251270135.webp'),(2,'DRAGON BALL SUPER 01','Explora las oscuras y La emocionante continuación de las aventuras de Goku y sus amigos después de la derrota de Majin Buu.',1234,5,15,2,'AKIRA TORIYAMA','prod-1709251996768.jpg'),(3,'BATMAN: ABISMO','si, efectivamente se guardo la edición ',7500,5,4,2,'KARL KERSCHL','prod-1709252267193.webp'),(4,'BLUE PERIOD 13','Descubre el emocionante mundo de Blue Period ',600,0,20,2,'Panini manga','prod-1709252399245.jpg'),(5,'BATMAN: EL LARGO HALLOWEEN','',899,10,2,2,'Jeph Loeb (guion) y Tim Sale (dibujos)','prod-1709252481914.webp'),(8,'BATMAN KNIGHTFALL VOL.3: LA CRUZADA DEL','Acompaña a Batman en su lucha contra el crimen mientras enfrenta desafíos que pondrán a prueba su voluntad y habilidades.',8000,0,5,2,'Ovni Press','prod-1709252550209.webp'),(9,'SLAM DUNK 27 (SOBRECUBIERTA)','La obra más conocida del famosísimo Takehiko Inoue, narra la historia de Hanamichi Sakuragi, el típico quilombero de instituto japonés (clásico de los mangas de peleas de estudiantes) con el giro argumental de que quiere convertirse en jugador de básquetbol.',5000,0,4,2,' TAKEHIKO INOUE','prod-1709252598841.jpg'),(10,'BATMAN VAMPIRO','La obra más conocida del famosísimo Takehiko Inoue, narra la historia de Hanamichi Sakuragi, el típico quilombero de instituto japonés (clásico de los mangas de peleas de estudiantes) con el giro argumental de que quiere ¡Edición en papel obra y logo en stamping metalizado! HIJOS DE LA NOCHE La Ciudad de Gotham está atrapada en una espiral de corrupción y decadencia, y aquellos que se alimentan de la sangre y la desesperación están a punto de consumir toda la vida que queda en sus moribundas venas. Lo único que se interpone entre ellos es Batman, el legendario vengador en las sombras...',14500,0,4,2,'DOUGH MOENCH','prod-1709252643776.webp'),(11,'LA VEZ QUE REENCARNE EN SLIME 12','La obra más conocida del famosísimo Takehiko Inoue, narra la historia de Hanamichi Sakuragi, el típico quilombero de instituto japonés (clásico de los mangas de peleas de estudiantes) con el giro argumental de que quiere ¡Edición en papel obra y logo en stamping metalizado! HIJOS DE LA NOCHE La Ciudad de Gotham está atrapada en una espiral de corrupción y decadencia, y aquellos que se alimentan de la sangre y la desesperación están a punto de consumir toda la vida que queda en sus moribundas venas. Lo único que se interpone entre ellos es Batman, el Después de salvar a los niños que Shizu dejo atrás al morir, Rimuru se retira de Ingrassia. Al mismo tiempo, las Naciones del Oeste, insatisfechas con el rápido crecimiento de la influencia del país de los monstruos, se disponen a atacar a Rimuru y a la nación de Tempest, ahora que su líder no se encuentra en ella. ',4800,0,6,2,' TAIKI KAWAKAMI','prod-1709252575641.jpg'),(12,'20 PISOS DE TERROR','Una novela ágil; con atrapante ritmo de thriller cinematográfico. Manuel; un preadolescente que; afectado por la mudanza a un moderno complejo de edificios; se verá envuelto por un misterio cuya resolución lo enfrentará con lo desconocido. ',7800,0,12,2,' JOSE MONTERO','prod-1709251973288.jpg'),(13,'nombre prueba','ffffff',7000,11,5,2,'autor prueba','prod-1709252698560.png'),(16,'prueba','dddd',1221,12,0,1,'prueba','prod-1709148726310.png');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  KEY `fk_usuarios_roles1_idx` (`roles_id`),
  CONSTRAINT `fk_usuarios_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'1987-12-12','fatima@gmail.com','da429a45-f2f4-49da-b32d-42ea4704f4f3',NULL,NULL,'Fatima Diaz'),(2,'1999-10-16','lisandor@gmail.com','8cb7ba89-c425-494c-ba5f-566584ce79d4',NULL,NULL,'Lisandro Diaz'),(3,'1999-10-16','luchi@gmail.com','bfc5ebd5-af9d-4e24-953f-d4a62e7eb022',NULL,NULL,'Luciano Perez'),(4,'1999-10-16','correo@gmail.com','06243f77-382e-477e-a932-ed4de68c72a8',NULL,NULL,'mariano'),(9,'1999-10-16','correoprueba@gmail.com','8a615f06-eaed-4610-b2f2-67a7c9d3f3ab',NULL,NULL,'Isaac Avila'),(12,'1988-12-12','correotres@gmail.com','39f704fb-0ebd-4b7e-aeab-f2760269023d',NULL,NULL,'prueba dos'),(13,'1988-12-12','correocuatro@gmail.com','82b67642-08f7-46e4-b12b-858b9a0363e6',NULL,NULL,'prueba tres'),(14,'2002-12-08','joaquien@gmail.com','58df9444-3287-4e83-9cad-2d12c3ca7b88',NULL,NULL,'Joaquin Gonzales');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'shenlongcomics'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02 11:43:00