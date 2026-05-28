-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2026 a las 14:15:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mutantbusters_db`
--
CREATE DATABASE IF NOT EXISTS `mutantbusters_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mutantbusters_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `episodios`
--

CREATE TABLE `episodios` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `sipnosis` text NOT NULL,
  `url_video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `episodios`
--

INSERT INTO `episodios` (`id`, `titulo`, `sipnosis`, `url_video`) VALUES
(1, 'Capítulo 1: Sheriff y Shooter', 'En una Tierra post-apocalíptica poblada por mutantes, un cazador de tesoros llamado Sheriff encuentra una piedra misteriosa.', 'https://youtu.be/8-kzDYliZZw?si=3U5W9gVsT315qGu5'),
(2, 'Capítulo 2: Brutux', 'Sheriff persigue a Shooter para recuperar su piedra, pero en el camino tropieza con el peligroso contrabandista Brutux.', 'https://youtu.be/R24iUU5ttbU?si=zq-tbI2dpB8kk_i9'),
(3, 'Capítulo 3: Vegan-Su y BP', 'Dos misteriosas figuras enmascaradas le roban la piedra a Sheriff, Shooter y Brutux, quienes deciden perseguir a los ladrones en automóvil.', 'https://youtu.be/4YmWazZaTJ8?si=b9RNmVJh7MmEz7-x'),
(4, 'Capítulo 4: Apocalipsis Samurai y Katani', 'En las alcantarillas que conducen a la fortaleza, Sheriff y sus acompañantes se encuentran con un par de ninjas excéntricos.', 'https://youtu.be/LPqKJ3muvoA?si=Tf5qu_EKngGB8G9Q'),
(5, 'Capítulo 5: Colossus', 'Sheriff y su tripulación ingresan a la fortaleza y se enfrentan a un ejército de mutantes para recuperar la piedra.', 'https://youtu.be/vCuLpOAnDRA?si=RhxYDk9LkAdEBGYP'),
(6, 'Capítulo 6: La Résistance', 'El misterioso Dr. White le dice a Sheriff y sus acompañantes la verdad sobre la piedra y los mutantes.', 'https://youtu.be/slZ8CXsnxAw?si=oTYM5aJoY0gav7C1'),
(7, 'Capítulo 7: Las recetas de la abuela', 'Brutux, Sheriff y Shooter visitan una biblioteca peligrosa para encontrar un libro de recetas para que puedan hacer el antídoto del Doctor White.', 'https://youtu.be/GDuBf79635M?si=LKI1xe962y1gvqIq'),
(8, 'Capítulo 8: Game over', 'El grupo busca el primer vegetal de la lista en un vecindario lleno de peligros, lo que pone a prueba las habilidades de videojuegos de Shooter.', 'https://youtu.be/JaKLAhbAA_k?si=TbycCVjNTlRpIiIV'),
(9, 'Capítulo 9: Glutis ninja', 'En su búsqueda para encontrar brócoli, La Résistance se encuentra con un viejo enemigo de Apocalipsis Samurai y Katani.', 'https://youtu.be/DJUWCSIRHRw?si=u0HXOVHJ6Onsi6Fp'),
(10, 'Capítulo 10: El laberinto del Tuskytauro', 'La Résistance tiene que entrar en un laberinto para salvar a BP de las garras de un mutante con cuernos.', 'https://youtu.be/Q8yGL1K3K0w?si=enDHONa8-PBzOkKF'),
(11, 'Capítulo 11: Chakupaku', 'La Résistance llega a un pueblo de granjeros de brócoli y Sheriff se convierte en su líder. Mientras tanto, Horror Kall los está esperando.', 'https://youtu.be/oBUHSL2iVCs?si=VNpukJ9Te7tZQYmb'),
(12, 'Capítulo 12: Mutant Baskets', 'Los miembros de La Résistance se enfrentan en un partido de baloncesto para decidir quién trabajará en el huerto de la base.', 'https://youtu.be/_NnWJAjfQDE?si=1l10UOjytsiMzs1y'),
(13, 'Capítulo 13: La leyenda legendaria', 'El Horror Kall mutante se enferma, por lo que el Sheriff debe cuidarlo y contarle una historia.', 'https://youtu.be/YNE8sEECDYc?si=ZnRdM-ayYksyxGx3'),
(14, 'Capítulo 14: Supercool', 'Sheriff y Shooter se enfrentan al exnovio de Vegan-Su, Scratch Boy, en un duelo de skateboarding', 'https://youtu.be/rjQgIbpl9y8?si=7Vek42ocBBjuDv0V'),
(15, 'Capítulo 15: El arca', 'En su aventura más loca hasta el momento, los miembros de La Résistance ayudan a un buzo de aguas profundas perdido en el desierto a reparar un arca muy especial.', 'https://youtu.be/x0JhkhqFclA?si=hTjPHRcc-zFrKAcD'),
(16, 'Capítulo 16: Larga vida al teatro', 'La Résistance toma el escenario. Para poner sus manos en los tomates, tienen que enfrentar el peor espectáculo de la historia.', 'https://youtu.be/gXB24xgJP6c?si=0AIOqPr3G5y2Fzt-'),
(17, 'Capítulo 17: La Rockistance', 'Los miembros de La Résistance forman una banda para que puedan participar en el \"Día de inicio del Grupo internacional de rock aleatorio\".', 'https://youtu.be/qTOE_tS7Mb4?si=E8v9xsb5AbfrClbc'),
(18, 'Capítulo 18: La llamada de la naturaleza', 'En medio de la jungla, sin su tecnología, Shooter tiene que rescatar a La Résistance.', 'https://youtu.be/3dx0EjYTxwM?si=cD3m4dRu2ecA7vK-'),
(19, 'Capítulo 19: Ultra mega super picante', 'Sheriff llega al templo del ultra-mega-súper picante chile, donde se encuentra con el coloso sombrío.', 'https://youtu.be/eGADSZjqDgA?si=cas7yaOc229P7WW4'),
(20, 'Capítulo 20: Pizzacidio', 'Alguien ha robado la pizza del Dr. White. Sheriff investiga el caso, pero la búsqueda del culpable trae otros secretos a la luz.', 'https://youtu.be/euhoDaGk49I?si=0o4Et_1x-dPOHmC9'),
(21, 'Capítulo 21: La isla del pánico', 'La Résistance necesita un champiñón para el antídoto. Si quieren tenerlo en sus manos, tienen que viajar a la Isla del Pánico.', 'https://youtu.be/T9PSuJ9YHwE?si=b8WpwqbqX17JMh9e'),
(22, 'Capítulo 22: Belleza mutante', 'La Résistance ha sido capturada por Verrugo y debe escapar de la Isla del Pánico. Sheriff será su guía...si puede recuperar su confianza.', 'https://youtu.be/gqXOFCtgkyg?si=UUYlnjY3ECpgnFs-'),
(23, 'Capítulo 23: Morfobláster', 'Para contener la mutación del brazo de Sheriff, está equipado con un \"morfobláster\", que tiene algunos efectos secundarios peligrosos.', 'https://youtu.be/hwmqHVtF-9c?si=Iz4eGnPo8cJrROza'),
(24, 'Capítulo 24: Arkan', 'Para obtener el ingrediente más reciente para el antídoto, los Mutant Busters tienen que cruzar el mar ácido en barco.', 'https://youtu.be/7XMDHtHrA04?si=HrXB6fKJTEgmyFEx'),
(25, 'Capítulo 25: Una visita inesperada', 'Verrugo visita a su hermana Rugor para contarle sus problemas con La Résistance y hacerle una propuesta.', 'https://youtu.be/kHziBJpieFk?si=q-qkl072t5-8zI3-'),
(26, 'Capítulo 26: Una terrible maldición', 'El buque de La Résistance cruza el famoso \"Triánculo de las Bermudas\" y sufre los efectos de la maldición que azota el lugar.', 'https://youtu.be/rorC1E9P2Qk?si=mjiRXygOKI0bb6ka'),
(27, 'Capítulo 27: Mal rollito', 'Un monstruo que se alimenta de mal rollo se hace invencible mientras unos náufragos rescatados discuten con La Résistance, y solo las buenas acciones pueden salvarlos.', 'https://youtu.be/QuVgS1KZQiw?si=HDCRJyfkEWfrFDyA'),
(28, 'Capítulo 28: Relaxopolis', 'La Résistance visita un resort del relax pero, bajo su lujosa apariencia, Sheriff detecta algo siniestro que tiene que ver con los mutantes.', 'https://youtu.be/2I5rRtoxr3M?si=tkHMB3GmpI0scRDQ'),
(29, 'Capítulo 29: Hermanos de moco', 'Sheriff y Shooter, ocupados compitiendo por la atención de Vegan-Su, no prestan atención a una amenaza mutante. Verrugo y Rugor lidian con un aire acondicionado rebelde.', 'https://youtu.be/_GeSSepuDfg?si=A_CpBxDuCWhQMJO_'),
(30, 'Capítulo 30: El día mundial de las bromas', 'Sheriff le pide a Shooter que le ayude a organizar una broma magistral, pero los otros se le adelantan. Los mutantes presumen de su peculiar sentido del humor.', 'https://youtu.be/HFhKTgd_Ico?si=Jd55ztDgHoausAEh'),
(31, 'Capítulo 31: Los Mutant Brothers', 'Verrugo y sus mutantes musicales retan a La Rockistance a una guerra entre bandas para demostrar cuál es el grupo más molón de la Tierra.', 'https://youtu.be/1tnmnvyaQ5g?si=a5S826-q9lkRKE0U'),
(32, 'Capítulo 32: Sirenas', 'La Résistance se abre paso en aguas peligrosas y lucha para no caer en las redes de sirenas mutantes tan cautivadoras como amenazadoras.', 'https://youtu.be/QAshJBRcnvQ?si=yvPz5LFCwOkfRjRB'),
(33, 'Capítulo 33: Aplasta y machaca', 'Sheriff y Shooter caen en la trampa de los mutantes y terminan en un ring de lucha libre donde optan por la verdad y la justicia.', 'https://youtu.be/LQKwTwzKB5Y?si=dciihdyM4nI2iW11'),
(34, 'Capítulo 34: Pirañus', 'La Résistance se dirige a un fuerte mutante para conseguir un ingrediente para el antídoto. Pero el gas tóxico en el estómago de una bestia amenaza con detenerlos.', 'https://youtu.be/qQR4QcSpeMk?si=s_XV9Fa6bR6Q77d0'),
(35, 'Capítulo 35: El abismo del pánico', 'La Résistance se prepara para conseguir el coco, pero Verrugo les pone las cosas difíciles con su supermegamáquina destructora de defensa.', 'https://youtu.be/i1Zs4b33HtQ?si=jD8swESwAa22NpKg'),
(36, 'Capítulo 36: Misión: shopping', 'La glamurosa prima de Vegan-Su llega para enseñar a La Résistance a pilotar helicópteros, pero un triángulo amoroso causa fricción entre Shooter y Sheriff.', 'https://youtu.be/gaTuRR2RFRw?si=zQA6k-Nh171YDM4z'),
(37, 'Capítulo 37: Misión: shopping 2', 'Unos mutantes con alas han capturado a Valley Claire, y La Résistance trata de rescatarla con los mutancopters. Sin embargo, líos amorosos amenazan la misión.', 'https://youtu.be/Q2J9OT58K4M?si=2445kvZ9luWW9G6p'),
(38, 'Capítulo 38: Asombrosas historias humanas', 'Leviaton intenta convencer a los colosos de que se puede confiar en los humanos. En la Guarida del Pánico, el limón cae en manos peligrosas.', 'https://youtu.be/-V7ADCJ99Ns?si=-Uc9Sk9R0f9j9B_k'),
(39, 'Capítulo 39: Metal ice', 'La Résistance debe recargar la batería de unos robots para que tiren abajo la muralla de hielo antes de que los mutantes ataquen.', 'https://youtu.be/zJVzlyXggEE?si=e5YTuxzw86qcneAT'),
(40, 'Capítulo 40: Vuelta al cole', 'Sheriff descubre que la seguridad en el trabajo es uno de sus puntos débiles. Verrugo cuida del sobrino del Amo Supremo, que siembra el caos allá por donde pasa.', 'https://youtu.be/3KgE3jnkvEk?si=nR9O42IRG3Pp04Em'),
(41, 'Capítulo 41: El baile de graduación', 'Los héroes de La Résistance deben encontrar pareja para el baile de graduación, pero un malentendido desemboca en una serie de meteduras de pata que acaba en desastre.', 'https://youtu.be/qgDDTyB4DLg?si=xKDU5ETMzstEdvRk'),
(42, 'Capítulo 42: Icebum', 'La Résistance se encuentra con un mutante que puede adoptar la forma de cualquier ser vivo a su alrededor, y Sheriff, que desconfía de todos, intenta dar con el impostor.', 'https://youtu.be/pNP-kblRD5s?si=_DjoCW6h-9_LmaHj'),
(43, 'Capítulo 43: La pista negra osea super negra', 'Vegan-Su tiene que arreglar el motor del barco, pero al descubrir una fabulosa pista de esquí, Valley Claire les convence a todos para que la bajen juntos.', 'https://youtu.be/FqhgohivXjs?si=LK4Upeyhl0Es92fe'),
(44, 'Capítulo 44: El gran nacho', 'La Résistance se pierde en las montañas, donde Sheriff se une a una secta que adora las tortillas de maíz. Mientras, Shooter y Vegan-Su intentan reiniciar el Mutant-Pad.', 'https://youtu.be/lWMSG-pGIws?si=X1M4aL9SY3XSKVVr'),
(45, 'Capítulo 45: La curva del infierno', 'Mutantes y humanos se enfrentan en un videojuego de conducir, pero Sheriff y Verrugo demuestran ser unos inexpertos a medida que se acercan a la curva del infierno.', 'https://youtu.be/auNn2NDcJGk?si=IR2VwveVW9mW_69n'),
(46, 'Capítulo 46: Cu-lobo', 'Sheriff cuenta la historia de un caballero que se transformó en un culo para salvar a una princesa, pero le cuesta dar con un final feliz.', 'https://youtu.be/J3uu1ReMdVM?si=qj5XyRZCdplK0pMt'),
(47, 'Capítulo 47: Limón concentrado', 'La Résistance va tras el limón. Mientras, la mutación de Sheriff sigue avanzando y el Dr. White le da un antídoto inestable que tiene efectos inesperados.', 'https://youtu.be/BHNCWMx-kuk?si=R2lzygYNuuQMpTTN'),
(48, 'Capítulo 48: Mutantvisión', 'Para demostrar la superioridad de los mutantes, el Amo Supremo anuncia \"Mutantvisión\", un concurso de canciones. Sheriff y los demás deciden demostrar que tienen marcha.', 'https://youtu.be/w2gQEtVwCZo?si=JM3KLG9IMsHFAsZm'),
(49, 'Capítulo 49: Náufrago', 'Sheriff, que se ha quedado varado en mitad del océano, debe encontrar el camino de vuelta al buque de asalto antes de convertirse en mutante.', 'https://youtu.be/PCRE4suF84k?si=7jL-rQj-iZovC8Cy'),
(50, 'Capítulo 50: La guarida del pánico', 'A La Résistance le falta un ingrediente para detener la invasión mutante. Entretanto, el Amo Supremo no se detendrá hasta conseguir la morfonita.', 'https://youtu.be/Xecz8TrK2i0?si=BNC1FiqehzgDN9xF'),
(51, 'Capítulo 51: Amo supremo', 'Con el destino de la humanidad en juego, Sheriff y Vegan-Su se enfrentan al Amo Supremo en la Guarida del Pánico mientras sus compañeros lidian con un ejército mutante.', 'https://youtu.be/LRnDPYLGMXA?si=PnjzsybLXw7hc0c-'),
(52, 'Capítulo 52: Hora de Mutant Busters', 'El Amo Supremo revela un oscuro secreto e intenta convencer a Sheriff de que se una a él para intentar detener su peligrosa máquina. Sheriff está decidido a casarse.', 'https://youtu.be/rLp4TGPPPSg?si=BEkj-E4yA9CZLNrK');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facciones`
--

CREATE TABLE `facciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facciones`
--

INSERT INTO `facciones` (`id`, `nombre`, `descripcion`) VALUES
(1, 'La Résistance', 'Un grupo de humanos supervivientes del Gran Pedo que se unió para luchar contra la tiranía y la opresión de los terribles mutantes que pueblan la Tierra...o lo que queda de ella'),
(2, 'Mutantes', 'Unos viscosos seres formados por los gases tóxicos consecuentes del Gran Pedo. Los hay de muchas formas y aspecto horripilante.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `id_faccion` int(11) NOT NULL,
  `url_archivo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`id`, `nombre`, `descripcion`, `id_faccion`, `url_archivo`) VALUES
(1, 'Sheriff', 'Un cazatesoros y el pedorro líder de La Résistance', 1, '/imagenes/personajes/Sheriff.png'),
(2, 'Shooter', 'El rey del bláster y un friki de los videojuegos', 1, '/imagenes/personajes/Shooter.png'),
(3, 'Brutux', 'Un contrabadista musculoso amante de la literatura', 1, '/imagenes/personajes/Brutux.png'),
(4, 'Vegan-Su', 'La mecánica del equipo. Es una tía bastante dura', 1, '/imagenes/personajes/Vegan-Su.png'),
(5, 'BP', 'Un amante del rap y el beatboxing y hermano de Vegan-SU', 1, '/imagenes/personajes/BP.png'),
(6, 'Dr. White', 'Fundador de La Résistance y padre de Vegan-Su y BP', 1, '/imagenes/personajes/White.png'),
(7, 'Katani', 'Un ninja con talento. Le gusta tocar la flauta', 1, '/imagenes/personajes/Katani.png'),
(8, 'Apocalipsis Samurai', 'Otro talentoso ninja y compañero de Katani', 1, '/imagenes/personajes/AS.png'),
(9, 'Scratch Boy', 'Ex-amante de Vegan-Su, ahora del skateboarding', 1, '/imagenes/personajes/Scratch.png'),
(10, 'Thunder Kat', 'Un skateboarder de pocas palabras y compañero de Scratch Boy', 1, '/imagenes/personajes/TK.png'),
(11, 'Seaman', 'Un buzo coleccionista de gnomos de jardín', 1, '/imagenes/personajes/Seaman.png'),
(12, 'Red Eyes', 'Un actor y antiguo jefe de la compañía teatral Cuatro Mazas', 1, '/imagenes/personajes/RedEyes.png'),
(13, 'Beardman', 'Un actor barbudo y hermano de Beastz', 1, '/imagenes/personajes/Beardman.png'),
(14, 'Beastz', 'Un actor y hermano de Beardman', 1, '/imagenes/personajes/Beastz.png'),
(15, 'Torment', 'Un antiguo azafato y experto del camuflaje', 1, '/imagenes/personajes/Torment.png'),
(16, 'Fénix', 'Un antiguo azafato y compañero de Torment y Fortune Soldier', 1, '/imagenes/personajes/Fenix.png'),
(17, 'Fortune Soldier', 'Otro antiguo auxiliar de vuelo e inseparable amigo de Torment y Fénix', 1, '/imagenes/personajes/FS.png'),
(18, 'Capitán Zirref', 'Líder de un trío de cíborgs. Su equipo tiene cuentas que ajustar con Verrugo', 1, '/imagenes/personajes/Zirref.png'),
(19, 'Circuit', 'Un cíborg con un pasado oscuro', 1, '/imagenes/personajes/Circuit.png'),
(20, 'Metal Jack', 'Un cíborg con un comportamiento algo animal', 1, '/imagenes/personajes/MJ.png'),
(21, 'Arkan', 'El capitán del buque de asalto de la Résistance. Está obsesionado con la limpieza', 1, '/imagenes/personajes/Arkan.png'),
(22, 'Ugetot', 'El líder de un grupo de náufragos', 1, '/imagenes/personajes/Ugetot.png'),
(23, 'John V.', 'Empleado de Relaxópolis', 1, '/imagenes/personajes/JohnV.png'),
(24, 'Rep Til', 'Gerente de Relaxópolis', 1, '/imagenes/personajes/RepTil.png'),
(25, 'Predator', 'Un luchador libre enmascarado que sabe actuar', 1, '/imagenes/personajes/Predator.png'),
(26, 'Valley Claire', 'Una piloto experta y prima de Venga-Su y BP', 1, '/imagenes/personajes/VC.png'),
(27, 'David Snow', 'Un \"trabajador\" con problemas de vaguería', 1, '/imagenes/personajes/DS.png'),
(28, 'Fetid Gas', 'Un mutante verdoso con forma de trasero', 2, '/imagenes/personajes/FG.png'),
(29, 'Toxic Eyes', 'Un mutante rojizo que dispara globos oculares sin parar', 2, '/imagenes/personajes/TE.png'),
(30, 'Toothy', 'Un mutante amarillento con una segunda boca de afilados dientes', 2, '/imagenes/personajes/Toothy.png'),
(31, 'Slug', 'Un viscoso mutante compuesto por mocos', 2, '/imagenes/personajes/Slug.png'),
(32, 'Glutis', 'Un mutante rojizo mucho más letal', 2, '/imagenes/personajes/Glutis.png'),
(33, 'Tusky', 'Un mutante rojizo que siempre sabe lo que quiere', 2, '/imagenes/personajes/Tusky.png'),
(34, 'Kannibal', 'Un mutante azulado que mastica todo lo que encuentra', 2, '/imagenes/personajes/Kannibal.png'),
(35, 'Bad Dirty', 'Un mutante amarillento con ojos de semáforo', 2, '/imagenes/personajes/BD.png'),
(36, 'Tonguex', 'Un mutante con la habilidad de volverse invisible', 2, '/imagenes/personajes/Tonguex.png'),
(37, 'Blurp', 'Un viscoso mutante de cinco ojos', 2, '/imagenes/personajes/Blurp.png'),
(38, 'Tragator', 'Un mutante con forma de pez', 2, '/imagenes/personajes/Tragator.png'),
(39, 'Globus', 'Un mutante con voz de sirena', 2, '/imagenes/personajes/Globus.png'),
(40, 'Flying Gas', 'Un mutante púrpura volador', 2, '/imagenes/personajes/FlyingGas.png'),
(41, 'Icebum', 'Un mutante azulado con poderes miméticos', 2, '/imagenes/personajes/Icebum.png'),
(42, 'Horror Kall', 'Un mutante con cara de pocos amigos', 2, '/imagenes/personajes/HK.png'),
(43, 'Cyklop', 'Un mutante de un solo ojo', 2, '/imagenes/personajes/Cyklop.png'),
(44, 'Gloom', 'Un mutante de aspecto inquietante pero inteligente', 2, '/imagenes/personajes/Gloom.png'),
(45, 'Leaviaton', 'Un mutante muy responsable', 2, '/imagenes/personajes/Leviaton.png'),
(46, 'Cracon', 'El terror de los mares', 2, '/imagenes/personajes/Cracon.png'),
(47, 'Cangrena', 'Un mutante con pinzas afiladas', 2, '/imagenes/personajes/Cangrena.png'),
(48, 'Sharko y Megalón', 'Dos tiburones mutantes luchadores', 2, '/imagenes/personajes/SharkoMegalon.png'),
(49, 'Stony', 'El sobrino del Amo Supremo. Un niño odioso e insoportable', 2, '/imagenes/personajes/Stony.png'),
(50, 'Verrugo', 'El comandante de todos los ejércitos de mutantes que merodean por el planeta', 2, '/imagenes/personajes/Verrugo.png'),
(51, 'Rugor', 'La holgazana hermana de Verrugo.', 2, '/imagenes/personajes/Rugor.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sets`
--

CREATE TABLE `sets` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sets`
--

INSERT INTO `sets` (`id`, `nombre`, `url_imagen`) VALUES
(1, 'La Isla del Pánico', '/imagenes/sets/IslaPanico.jpg'),
(2, 'Cuartel General de La Résistance', '/imagenes/sets/Cuartel.jpg'),
(3, 'Buque de Asalto de La Résistance', '/imagenes/sets/buque.jpg'),
(4, 'Laboratorio del Dr. White', '/imagenes/sets/laboratorio.png'),
(5, 'Mutantcopter', '/imagenes/sets/MutantCopter.jpg'),
(6, 'Metal Ice', '/imagenes/sets/MetalIce.jpg'),
(7, 'Mutant Patrol & BP', '/imagenes/sets/BPCoche.jpg'),
(8, 'Mutant Patrol & Fénix', '/imagenes/sets/FenixCoche.jpg'),
(9, 'Mutant Patrol & Fortune Soldier', '/imagenes/sets/FSCoche.jpg'),
(10, 'Mutant Patrol & Shooter', '/imagenes/sets/ShooterCoche.jpg'),
(11, 'Cyklop & Titán', '/imagenes/sets/CyklopTitan.jpg'),
(12, 'Horror Kall & Titán', '/imagenes/sets/HorrorKallTitan.jpg'),
(13, 'Multitud vs. Compañía', '/imagenes/sets/WhiteNinjas.jpg'),
(14, 'Multitud vs. Compañía v2', '/imagenes/sets/TormentJackSeaman.jpg'),
(15, 'Pilotos de Mutantcopter', '/imagenes/sets/Pilotos.jpg'),
(16, 'Set Norte Congelado', '/imagenes/sets/IcebumBPSheriff.jpg'),
(17, 'Beardman & Blurp', '/imagenes/sets/BeardBlurp.jpg'),
(18, 'BP & Cangrena', '/imagenes/sets/BPCangrena.jpg'),
(19, 'Brutux & Tragator', '/imagenes/sets/BrutuxTragator.jpg'),
(20, 'Doctor Custo & Langosta mutante', '/imagenes/sets/DrCustoMutante.jpg'),
(21, 'John V & Cangrena', '/imagenes/sets/JohnVCangrena.jpg'),
(22, 'Red Eyes & Tonguex', '/imagenes/sets/RETonguex.jpg'),
(23, 'Rugor & BP', '/imagenes/sets/RugorBP.jpg'),
(24, 'Sheriff & Cracon', '/imagenes/sets/SheriffCracon.jpg'),
(25, 'Shooter & Caballito mutante', '/imagenes/sets/ShooterCaballito.jpg'),
(26, 'Shooter & Megalón', '/imagenes/sets/ShooterMegalon.jpg'),
(27, 'Sheriff & Fetid Gas', '/imagenes/sets/FetidGasSheriff.jpg'),
(28, 'Dr. White & Tusky', '/imagenes/sets/WhiteTusky.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('usuario','admin') DEFAULT 'usuario',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones`
--

CREATE TABLE `valoraciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `puntuacion` int(11) NOT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `id_referencia` int(11) NOT NULL,
  `tipo_referencia` enum('personaje','set','episodio') NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `facciones`
--
ALTER TABLE `facciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_faccion` (`id_faccion`);

--
-- Indices de la tabla `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_valoracion_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `episodios`
--
ALTER TABLE `episodios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `facciones`
--
ALTER TABLE `facciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `sets`
--
ALTER TABLE `sets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD CONSTRAINT `fk_faccion` FOREIGN KEY (`id_faccion`) REFERENCES `facciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD CONSTRAINT `fk_valoracion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
