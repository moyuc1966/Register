-- MySQL dump 10.13  Distrib 5.6.50, for Linux (x86_64)
--
-- Host: localhost    Database: register
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `gender` int(11) NOT NULL DEFAULT '1',
  `email` varchar(50) DEFAULT NULL,
  `grade` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'超级管理员','123456','E50DE14051AFD6AACD8D1560F2F08579',1,NULL,1),(2,'墨羽晨','12345678','78d609a308db4a83d77eac6f9d486262',0,'3216354195@qq.com',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrange`
--

DROP TABLE IF EXISTS `arrange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arrange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorName` varchar(10) NOT NULL,
  `doctorId` int(11) NOT NULL,
  `hosName` varchar(30) DEFAULT NULL,
  `hosId` int(11) NOT NULL,
  `depName` varchar(30) NOT NULL,
  `depTwoId` int(11) NOT NULL,
  `time` date DEFAULT NULL COMMENT '日期',
  `MtimeSegment` varchar(20) DEFAULT NULL COMMENT '上午时间段',
  `Mnum` int(11) DEFAULT '10',
  `Msurplus` int(11) DEFAULT '10' COMMENT '剩余数量',
  `Mstate` int(11) DEFAULT '0' COMMENT '0排班，1休息',
  `AtimeSegment` varchar(20) DEFAULT NULL COMMENT '下午时间段',
  `Anum` int(11) DEFAULT '10',
  `Asurplus` int(11) DEFAULT '10' COMMENT '剩余数量',
  `Astate` int(11) DEFAULT '0' COMMENT '0排班，1休息',
  PRIMARY KEY (`id`),
  KEY `doctorId` (`doctorId`,`doctorName`,`depName`,`depTwoId`,`time`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrange`
--

LOCK TABLES `arrange` WRITE;
/*!40000 ALTER TABLE `arrange` DISABLE KEYS */;
INSERT INTO `arrange` VALUES (1,'吴雨涵',1,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-08-18','09.25-11.25',10,10,0,'14.25-17.25',10,10,0),(2,'沈林',2,'华夏神州人民医院青龙东院',1,'内科-消化内科',2,'2022-08-18','09.25-11.25',10,10,0,'14.25-17.25',10,10,0),(3,'贾美欣',11,'华夏神州人民医院青龙东院',1,'外科-心血管外科',3,'2022-08-18','09.25-11.25',10,10,0,'14.25-17.25',10,10,0),(4,'谢桂英',12,'华夏神州人民医院青龙东院',1,'外科-心血管外科',3,'2022-08-18','09.25-11.25',10,10,0,'14.25-17.25',10,10,0),(5,'武天昊',14,'华夏神州人民医院青龙东院',1,'外科-烧伤科',4,'2022-08-18','09.25-11.25',10,10,0,'14.25-17.25',10,10,0),(6,'陆超',13,'华夏神州人民医院青龙东院',1,'外科-骨外科',5,'2022-08-18','09.25-11.25',10,10,0,'14.25-17.25',10,10,0),(8,'陆欣汝',3,'华夏神州人民医院厚土中院',2,'内科-内分泌科',7,'2022-08-18','09.25-11.25',10,10,0,'14.25-17.25',10,10,0),(9,'徐润莎',8,'华夏神州人民医院玄武北院',3,'中医科-中医全科',13,'2022-08-18','10.40-11.40',10,10,0,'14.40-15.40',10,10,0),(10,'陈强',9,'华夏神州人民医院玄武北院',3,'中医科-中医儿科',14,'2022-08-18','10.40-11.40',10,10,0,'14.40-15.40',10,10,0),(11,'徐榕润',7,'华夏神州人民医院厚土中院',2,'内科-内分泌科',7,'2022-08-18','10.40-11.40',10,10,0,'14.40-15.40',10,10,0),(12,'阎苒溪',10,'华夏神州人民医院厚土中院',2,'眼科-眼部外科',10,'2022-08-18','10.40-11.40',10,10,0,'14.40-15.40',10,10,0),(13,'任晓庆',6,'华夏神州人民医院玄武北院',3,'内科-普通内科',11,'2022-08-23','08.55-11.55',10,10,0,'13.55-16.55',10,10,0),(14,'任晓庆',6,'华夏神州人民医院玄武北院',3,'内科-普通内科',11,'2022-08-25','08.55-11.55',10,10,0,'13.55-16.55',10,10,0),(15,'秦雅涵',5,'华夏神州人民医院玄武北院',3,'内科-普通内科',11,'2022-08-25','08.55-11.55',10,8,0,'0',10,10,1),(16,'秦雅涵',5,'华夏神州人民医院玄武北院',3,'内科-普通内科',11,'2022-08-26','0',10,10,1,'13.55-18.30',10,10,0),(17,'吴雨涵',1,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-09-15','16.48-21.48',10,10,0,'0',10,10,1),(18,'沈林',2,'华夏神州人民医院青龙东院',1,'内科-消化内科',2,'2022-09-21','10.21-20.21',50,10,0,'0',0,0,1),(19,'吴雨涵',1,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-09-21','0',10,10,1,'14.22-20.22',10,10,0),(20,'陆欣汝',3,'华夏神州人民医院厚土中院',2,'内科-内分泌科',7,'2022-10-20','09.44-14.44',10,10,0,'0',10,10,1),(21,'吴雨涵',1,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-11-26','08.00-12.00',10,8,0,'0',10,10,1),(22,'吴雨涵',1,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-11-08','10.37-13.37',40,20,0,'0',0,0,1),(23,'沈林',2,'华夏神州人民医院青龙东院',1,'内科-消化内科',2,'2022-11-08','14.24-15.24',25,25,0,'0',0,0,1),(24,'谢桂英',12,'华夏神州人民医院青龙东院',1,'外科-心血管外科',3,'2022-11-09','14.14-17.14',35,35,0,'0',0,0,1),(25,'沈林',2,'华夏神州人民医院青龙东院',1,'内科-消化内科',2,'2022-11-09','14.25-15.25',10,9,0,'0',0,0,1),(26,'沈林',2,'华夏神州人民医院青龙东院',1,'内科-消化内科',2,'2022-11-12','08.51-12.47',30,29,0,'14.50-18.50',40,40,0),(27,'武天昊',14,'华夏神州人民医院青龙东院',1,'外科-烧伤科',4,'2022-11-12','08.16-12.16',50,49,0,'0',10,10,1),(28,'谢桂英',12,'华夏神州人民医院青龙东院',1,'外科-心血管外科',3,'2022-11-12','10.35-11.35',30,30,0,'14.35-16.35',40,40,0),(29,'张玥傲',15,'华夏神州人民医院青龙东院',1,'外科-心血管外科',3,'2022-11-12','08.32-11.32',60,60,0,'0',10,10,1),(30,'吴雨涵',1,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-11-27','08.20-12.20',60,60,0,'14.46-21.46',80,80,0),(31,'沈林',2,'华夏神州人民医院青龙东院',1,'内科-消化内科',2,'2022-11-26','08.20-12.20',60,60,0,'14.46-21.46',80,80,0),(32,'沈林',2,'华夏神州人民医院青龙东院',1,'内科-消化内科',2,'2022-11-27','08.20-11.20',40,40,0,'14.46-19.46',50,50,0),(33,'武天昊',14,'华夏神州人民医院青龙东院',1,'外科-烧伤科',4,'2022-11-25','0',10,10,1,'21.19-23.19',10,10,0),(34,'叶淳美',17,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-11-26','08.10-11.20',50,50,0,'0',10,10,1),(35,'贺静',18,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-11-26','08.10-11.20',50,50,0,'21.37-22.37',20,20,0),(36,'贺静',18,'华夏神州人民医院青龙东院',1,'内科-神经内科',1,'2022-11-27','08.10-11.20',50,50,0,'15.37-22.37',20,20,0);
/*!40000 ALTER TABLE `arrange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `readNum` int(11) NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL,
  `author` varchar(20) NOT NULL DEFAULT '佚名',
  `cat` varchar(50) NOT NULL DEFAULT '分享',
  `imgUrl` varchar(50) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_cat` (`cat`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,20,'养生小知识','现代医院院长网','健康百科','/images/article/imgUrl-1667868217073.jpeg','2022-08-17 19:51:51','<p><span style=\"color: rgb(25, 25, 25);\">1.头发：</span></p><p><span style=\"color: rgb(25, 25, 25);\">牛奶、南瓜养发防脱。想拥有健康浓密的秀发，必须摄入足够的蛋白质。一杯牛奶提供的蛋白质约为7克，每天两杯可满足需要。此外，纽约皮肤学副教授弗兰西斯卡·福斯克介绍，每天吃把南瓜子，可补足一天所需的锌，减少脱发</span></p><p><br></p><p>2.大脑：</p><p>圆白菜健脑、抗抑郁。金枪鱼富含欧米伽3脂肪酸，有助于改善大脑功能，赶走抑郁。同时，研究显示，每天吃两道甘蓝类蔬菜，如圆白菜，认知功能的下降速度可减慢40%。</p><p><br></p><p>3.皮肤：</p><p>西红柿防晒保湿。西红柿富含番茄红素，可降低紫外线伤害、减少皱纹，烹调后食用效果更佳。亚麻子油含欧米伽3脂肪酸，有保湿功效，让肌肤更有光彩。</p><p><br></p><p><br></p><p>4.眼睛：</p><p>鸡蛋防白内障，胡萝卜防眼干。白内障、黄斑变性是导致失明的两大病症，蛋黄中的类胡萝卜素能有效对抗这两种疾病。每天吃一个即可。橘黄色的蔬菜，如胡萝卜、南瓜等都富含β—胡萝卜。β—胡萝卜素犹如天然眼药水，能预防干眼症。</p>'),(2,13,'让患者体验到高质量就医服务','张院长','分享','/images/article/imgUrl-1660737479739.png','2022-08-17 19:57:59','<p class=\"ql-align-justify\">现在的营销理念是什么，是以患者为出发点而不是医院。重要点是患者所需要的治疗服务，目的是通过患者满意度获得利润，而不是通过增加患者获得利润。</p><p class=\"ql-align-justify\">如今大多数的医院都还是执行等患者上门求医，还是以医院为中心，而不是以患者的角度提供相应的服务。</p><p class=\"ql-align-justify\">医院的形象和荣誉在一定程度上决定了医院对患者的吸引力。</p><p class=\"ql-align-justify\">因此，医院必须千方百计提髙整体形象，通过医院形象创建科学、规范、温馨和充满人性化的理念、视觉和行为识别标志，从而提高医院在人民群众中的良好形象，以形象力来推动经营力。</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\"><strong>一、医院的形象营销</strong></p><p class=\"ql-align-justify\">1、事件营销</p><p class=\"ql-align-justify\">要充分利用各种突发事件、重大事件或大众传媒关注的事件进行营销。</p><p class=\"ql-align-justify\">医院可通过为广大群众进行防病治病知识的宣传、提供咨询服务、免费发放口罩或预防性药品等，来扩大医院影响力，提高医院在群众中的声誉，这就是所谓的“危难见真情”。</p><p class=\"ql-align-justify\">2、&nbsp;&nbsp;会议营销</p><p class=\"ql-align-justify\">医院可通过承办一些学术交流会，以及继续教育学习班、专业证书班等，扩大医院影响。</p><p class=\"ql-align-justify\">3、&nbsp;&nbsp;公益营销</p><p class=\"ql-align-justify\">医院可通过组织义诊、免费健康咨询、为老年人进行免费健康检查、举办免费健康教育讲座等活动，来吸引公众的注意力，增加医院的知名度。</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong>二、环境与隐私</strong></p><p class=\"ql-align-justify\">1、注意保护患者隐私</p><p class=\"ql-align-justify\">门诊部应设计单人诊室；注射室和各种医技检查均应设单间或分隔遮帘;住院部应进一步向少床或单床病房发展。</p><p class=\"ql-align-justify\">在北京的一些中外合作医院，每位患者都可以单独享用诊室，不得到患者和医生的允许，任何人不得进人诊室。</p><p class=\"ql-align-justify\">2、&nbsp;&nbsp;布置温馨宜人的环境</p><p class=\"ql-align-justify\">应用美学和行为心理学的研究成果来进行室内环境设计，避免产生单调乏味甚至冷冰冰的室内空间环境。</p><p><br></p>'),(3,15,'预约挂号小程序上线','管理员','公告','/images/article/imgUrl-1660737708781.jpg','2022-08-17 20:01:48','<p>触摸智慧生活现已上线，预约挂号小程序，可在小程序进行预约挂号，选择医生时间点提交挂号。</p><p><br></p><p>如若遇到操作或系统bug，可及时点击一键反馈提交问题，我们会及时的整改，保障最优的体验</p>'),(4,1,'医院智能药柜服务市场调研公告','药学部','公告','/images/article/imgUrl-1667866994108.jpg','2022-11-08 08:23:14','<p>	为进一步提升我院药学服务水平，更好地服务患者，结合我院临床需求，本着公平、公正、公开的原则，对智能药柜服务进行市场调研。请在投标的响应文件中承诺服务的配送企业积极参加，现将相关事宜公告如下。</p><p>	一、项目基本情况</p><p>	1、项目名称：医院智能药柜服务项目；</p><p>	2、相关内容：智能药柜的商品信息及售后维护保养和人员支持等；</p><p>	3、联系地址：第一医院药学部；</p><p>	4、联 系 人：墨羽晨</p><p>	5、联系电话：0123-123456</p><p>	6、截止日期：2022年12月28日（公告日期为五个工作日）。</p><p>	（接收材料时间：上午8:30-12:00 下午3:00-6:00）</p><p>	二、报名资料</p><p>	请配送企业将以下证件加盖公章并按顺序装订成册后提交（一式五份）。</p><p>	1、企业资质复印件</p><p>	公司简介、营业执照（正、副本）、药品经营许可证（正、副本）、银行开户许可证、质量认证证书等；</p><p>	2、供应商代表是法定代表人，需提供法定代表人身份证明书（附法定代表人身份证复印件）；供应商代表不是法定代表人，经办人需持有法定代表人授权委托书、法定代表人身份证复印件及经办人身份证原件及复印件；</p><p>	3、智能药柜的商品信息及售后维护保养和人员支持等服务计划。</p><p>	4、供应商认为需要提交的其他资证。</p>'),(5,3,'招聘编制外合同制工作人员公告','人事处','公告','/images/article/imgUrl-1667867412155.jpeg','2022-11-08 08:30:12','<p class=\"ql-align-justify\">	为了满足我院实际工作的需求，适应医院发展的需要，经我院研究决定，山西医科大学第一医院面向社会公开招聘工作人员61名，现就有关事宜通知如下：</p><p class=\"ql-align-justify\">	<strong>一、单位简介</strong></p><p class=\"ql-align-justify\">	树立人才资源是第一资源的理念，加大力度引进人才，培育人才，使用人才。</p><p class=\"ql-align-justify\">	<strong>二、招聘计划及岗位具体要求</strong></p><p class=\"ql-align-justify\">	医院2022年第一批公开招聘编制外合同制工作人员61名。</p><p class=\"ql-align-justify\">	<strong>三、招聘条件</strong></p><p class=\"ql-align-justify\">	（一）具有中华人民共和国国籍。</p><p class=\"ql-align-justify\">	（二）遵守中华人民共和国宪法和法律。</p><p class=\"ql-align-justify\">	（三）具有良好的品行和职业道德。</p><p class=\"ql-align-justify\">	（四）具备正常履行职责的身体条件、心理条件。</p><p class=\"ql-align-justify\">	（五）具有岗位所需的学历学位、专业或技能条件。</p><p class=\"ql-align-justify\">	（六）具备招聘岗位所需的年龄要求，年龄在25周岁及以下（即1996年8月26日以后出生），年龄在30周岁及以下（即1991年8月26日以后出生），年龄在35周岁及以下（即1986年8月26日以后出生）。</p><p class=\"ql-align-justify\">	（七）具备报考岗位所要求的其他资格条件。</p><p class=\"ql-align-justify\">	不得报名应聘的主要情形：</p><p class=\"ql-align-justify\">	（一）现役军人和在读的非应届毕业生不能报考，在读的非2022年应届博士、硕士毕业生不得以原取得硕士研究生或本科学历、学位证书报考；</p><p class=\"ql-align-justify\">	（二）因犯罪受过刑事处罚的、被开除中国共产党党籍和公职的;在立案审查期间或未解除党纪、政纪处分的人员，不能报考;</p><p class=\"ql-align-justify\">	（三）各级公务员招考和事业单位招聘中被认定有舞弊等严重违反考录、招聘纪律行为的人员，不能报考;</p><p class=\"ql-align-justify\">	（四）试用期内的公务员（参照公务员法管理事业单位工作人员）和试用期内的事业单位工作人员，不能报考;</p><p class=\"ql-align-justify\">	（五）招聘为事业单位工作人员有服务年限规定且服务期未满的，不得报考;</p><p class=\"ql-align-justify\">	（六）被依法列为失信联合惩戒对象以及法律、法规规定不符合本次公开招聘要求的人员，不能报考。</p><p class=\"ql-align-justify\">	（七）报考人员不得报考聘用后即构成回避关系的岗位。</p><p class=\"ql-align-justify\">	应聘者在报名之后、聘用之前已成为试用期内的公务员（参照管理单位工作人员）或已被聘用为事业单位工作人员的，不予聘用。</p><p class=\"ql-align-justify\">	招聘条件或岗位要求的辞退、现役、试(聘)用期、服务期、各类从业(职业、执业)资格证书等的截止时间，除岗位有明确要求外，均为公告发布之日。2022年应届毕业生须在本年度内通过考试，取得专业要求的相应执业资格证书、住院医师规范化培训合格证书等。</p><p class=\"ql-align-justify\">	<strong>四、招聘程序</strong></p><p class=\"ql-align-justify\">	（一）报名方式：本次报名采取网络报名的方式进行。，下载填写《报名表》（见附件2）并于2022年8月31日前发送至lsgsj@qq.com，报名表重命名为“姓名+出生年月”。</p><p><br></p>'),(6,1,'常生活健康小常识','健康养生','健康百科','/images/article/imgUrl-1667868037493.jpg','2022-11-08 08:40:37','<p><span style=\"color: rgb(51, 51, 51);\">1.吃了辣的东西，感觉就要被辣死了，就往嘴里放上少许盐，含一下，吐掉，漱下口，就不辣了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">2.牙齿黄，可以把花生嚼碎后含在嘴里，并刷牙三分钟，很有效；</span></p><p><span style=\"color: rgb(51, 51, 51);\">3.若有小面积皮肤损伤或者烧伤、烫伤，抹上少许牙膏，可立即止血止痛；</span></p><p><span style=\"color: rgb(51, 51, 51);\">4.经常装茶的杯子里面留下难看的茶渍，用牙膏洗之，非常干净；</span></p><p><span style=\"color: rgb(51, 51, 51);\">5.仰头点眼药水时微微张嘴，这样眼睛就不会乱眨了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">6.嘴里有溃疡，就用维生素C贴在溃疡处，等它溶化后溃疡基本就好了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">7.眼睛进了小灰尘，闭上眼睛用力咳嗽几下，灰尘就会自己出来；</span></p><p><span style=\"color: rgb(51, 51, 51);\">8.洗完脸后，用手指沾些细盐在鼻头两侧轻轻按摩，然后再用清水冲洗，黑头和粉刺就会清除干净，毛细孔也会变小；</span></p><p><span style=\"color: rgb(51, 51, 51);\">9.刚刚被蚊子咬完时，涂上肥皂就不会痒了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">10.如果嗓子、牙龈发炎了，在晚上把西瓜切成小块，沾着盐吃，记得一定要是晚上，当时症状就会减轻，第二天就好了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">11.吹风机对着标签吹，等吹到商标的胶热了，就可以很容易的把标签撕下来；</span></p><p><span style=\"color: rgb(51, 51, 51);\">12.旅行带衣服时如果怕压起褶皱，可以把每件衣服都卷成卷；</span></p><p><span style=\"color: rgb(51, 51, 51);\">13.打打嗝时就喝点醋，立杆见影；</span></p><p><span style=\"color: rgb(51, 51, 51);\">14.吃了有异味的东西，如大蒜、臭豆腐，吃几颗花生米就好了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">15.治疗咳嗽，特别是干咳，晚上睡觉前，用纯芝麻香油煎鸡蛋，油放稍多些，什么调味料都不要放，趁热吃过就去睡觉，连吃几天效果很明显；</span></p><p><span style=\"color: rgb(51, 51, 51);\">16.手腕长粗的MM想带较细的手镯，就不能硬带，应把手上套上一个塑料袋再带上手镯，非常好带，也不会把手弄疼，取下也是同样的方法；</span></p><p><span style=\"color: rgb(51, 51, 51);\">17.栗子皮难剥，先把外壳剥掉，再把它放进微波炉转一下，拿出后趁热一搓，皮就掉了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">18.插花时，在水里滴上一滴洗洁精，可以维持好几天；</span></p><p><span style=\"color: rgb(51, 51, 51);\"><span class=\"ql-cursor\">﻿</span>19.把核桃放进锅里蒸十分钟，取出放在凉水里再砸开，就能取出完整的桃核仁了；</span></p><p><span style=\"color: rgb(51, 51, 51);\">20.把虾仁放进碗里，加一点精盐、食用碱粉，用手抓搓一会儿后用清水浸泡，然后再用清水冲洗，即能使炒出的虾仁透明如水晶，爽嫩可口；</span></p><p><span style=\"color: rgb(51, 51, 51);\">21.炒肉时，先把肉用小苏打水浸泡十几分钟，倒掉水，再入味，炒出来会很嫩滑；</span></p><p><span style=\"color: rgb(51, 51, 51);\">22.将残茶叶浸入水中数天后，浇在植物根部，可促进植物生长；</span></p><p><span style=\"color: rgb(51, 51, 51);\">23.把残茶叶晒干，放到厕所或者沟渠里燃熏，可消除恶臭，具有驱除蚊子苍蝇的功能；</span></p><p><span style=\"color: rgb(51, 51, 51);\">24.夹生饭重煮法：可用筷子在饭内扎些直通锅底的孔，洒入少许黄酒重焖；</span></p><p><span style=\"color: rgb(51, 51, 51);\">25.若只表面夹生，只要将表层翻到中间再焖即可；</span></p><p><span style=\"color: rgb(51, 51, 51);\">26.巧除纱窗油腻：将洗衣服、吸烟剩下的烟头一起放在水里，待溶解后，拿来擦玻璃窗、纱窗，效果真不错；</span></p><p><span style=\"color: rgb(51, 51, 51);\">27.只要在珠宝盒中放上一节小小的粉笔，即可让首饰常保光泽；</span></p>'),(7,1,'生活健康小常识大全','明月别枝','健康百科','/images/article/imgUrl-1667868396082.jpg','2022-11-08 08:46:36','<p>1、科学地洗脸</p><p>每天早晨起床之后，我们最好洗一个冷水脸，不仅能够洗去我们睡眠中粘在脸上的尘埃，还能够提高我们一天的精神状态。对于一些每天都要化妆的女生们，每天晚上下班之后的第一件事，最好就是洗脸，把脸上淡去的妆与污垢洗去。</p><p>洁面的水温以30℃左右为宜。不可用太热的水，热气会吸收肌肤内过多的油脂，令肌肤干燥，破坏了原有的弹性和光泽，容易出皱纹;也不可用太冷的水，冷水虽然能清洁表面的污垢，但无法清洁毛孔里的尘垢和过剩油脂。而用30℃左右的温水洗脸，可以使毛孔张开，清洁更彻底，对肌肤也不会造成伤害。</p><p>2、食盐为肌肤排毒</p><p>食盐具备的消炎杀菌的功效众所周知，其实它的排毒功效亦很独到。如果你是油性肌肤，可试着将一小勺盐与蜂蜜调匀后，涂在脸上并轻轻按摩5分钟后用清水洗去。盐有深层清洁皮肤毛孔的作用，而蜂蜜水则能及时补充肌肤营养，每天早晚各一次，可帮助清除皮肤毒素。</p><p>3、两次轻度防晒</p><p>办公室MM们每日不会见到太多的阳光，她们皮肤大多薄且白晰，对光的抵抗力较弱，比一般人更容易晒伤，更需要注意防晒工作。防晒指数过高的产品会令皮肤感到不适，因此，建议每天早晚上下班时都要涂适当的轻度防晒品。虽然下午三点以后的日晒不那么强烈，但是还是需要在下班半个小时前涂上SPF15的防晒品。</p><p>4、房间里放种适合你的植物</p><p>色彩心理学家西泽巴说：“就像维生素是人的滋养品一样，色彩也是助于大脑的营养物。”在所有颜色之中，植物的绿色具有和谐的素质，对治疗心情抑郁有帮助。红色有一种强力燃烧的能量，有“和血平肝，养胃，宽胸”的作用。而紫色则可以刺激组织生长，愈合伤口。所以不妨在办公室或居室放一些花饰或盆栽吧。</p><p>5、每周2天吃素</p><p>现在很多人们都讲究吃饭的营养，盲目的认为吃些大鱼大肉肯定就会对身体好，其实这说法太片面了。吃些营养价值高的食物对身体当然好，可是如果一直吃，就会给身体肠胃带来巨大的负担。所以我们应该每天有两天时间吃吃素菜，让肠胃休息休息。</p><p>6、DIY面膜谋杀皱纹</p><p>这是一种在印度风行一时的敷面方法，将番木瓜和蜂蜜混合起来是最可以谋杀皱纹的天然面膜。将两者混合成泥状，敷在脸上15分钟以后再洗去，就能令面膜发挥功效。</p><p>7、用红糖橙汁柔嫩双唇</p><p>嘴唇是身体上最暴露、得到关爱却又最少的部位。每星期抽出两天，用一茶匙红糖配上新榨的橙汁调成糊状，敷在双唇上几分钟。糖类、谷类是最天然的柔和去角质霜，而橙汁中所含的酸类成分可以很好地去掉死皮。洗掉“唇膜”以后，立刻擦上含有抗氧化成分同时又有SPF值的润唇膏，保护娇嫩的双唇不受伤害。</p>'),(8,1,'养生小知识','糯米','健康百科','/images/article/imgUrl-1667868562530.jpeg','2022-11-08 08:49:22','<p><span style=\"color: rgb(64, 64, 64);\">1.养生小知识：当我们出现口渴的时候，要及时的补充身体里面的水分。不要强忍着不喝水，水作为人体特别需要的物质来说，对于中年人来讲，要有一个好的按时喝水的好习惯，每天喝6杯到8杯最好。人体如果缺水了，就会出现渴，渴代表身体里面，细胞是一个脱水的时候，这时候不喝水，硬撑下去，会影响我们的健康</span></p><p><br></p><p class=\"ql-align-justify\">2.养生小知识：冬天地 时候，要经常到房间外面，走动走动，提高身体的抵抗力。冬季的时候，想要养生，就不要因为天气寒冷的缘故，就让自已一直待在房间里面，适当的感受天地间的寒凉的气息，到室外走一走，激发一下身体里面的潜能，让自己的身体免疫力，得到提高。</p><p class=\"ql-align-justify\">3.养生小知识：平常的时候，多吃一些五谷杂粮，蔬菜水果也要适当的多吃一些，让自己拥有一个健康的饮食，让自己更健康，更加充满活力。</p><p><br></p><p class=\"ql-align-justify\">4. 养生小知识：多吃蔬菜，防止便秘。老年人因为胃肠蠕动变慢，很容易出现便秘，建议多吃一些绿色的蔬菜可以缓解便秘。</p><p class=\"ql-align-justify\">5.养生小知识： 当我们生病的时候，不要硬扛。对于平常发生的头痛、咳嗽等不舒服的身体症状，不加以重视的话，时间长了，就会耽误病情，酿成更大的疾病。所以，当我们的身体出现疾病的时候，要早点到医院里面去诊治，让身体尽快的恢复健康，千万不要硬撑着，让疾病更加严重。</p><p><br></p>'),(10,1,'雪夜抒怀','古墨飘香','分享','/images/article/imgUrl-1667868748057.jpg','2022-11-08 08:52:28','<p class=\"ql-align-center\">	一轮明月半盏雪，</p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\">	雪地空留烟火绝。</p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\">	半盏<a href=\"https://www.yafu.me/zhuanti/4041.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">新月</a>海上升，</p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\">	犹向<a href=\"https://www.yafu.me/zhuanti/1365.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">清风</a>借消遣。</p>');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code`
--

DROP TABLE IF EXISTS `code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(6) NOT NULL,
  `time` varchar(13) DEFAULT NULL COMMENT '操作开始时间戳',
  `state` int(11) DEFAULT '1' COMMENT '1表示操作中，2表示已失效',
  `uid` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code`
--

LOCK TABLES `code` WRITE;
/*!40000 ALTER TABLE `code` DISABLE KEYS */;
INSERT INTO `code` VALUES (1,'124009','1660804953',2,1,'749038898@qq.com'),(2,'584921','1660962943',2,1,'749038898@qq.com'),(3,'045992','1660963165',2,1,'749038898@qq.com'),(4,'077510','1668154153',3,1,'3216354195@qq.com');
/*!40000 ALTER TABLE `code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depHospital`
--

DROP TABLE IF EXISTS `depHospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depHospital` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minname` varchar(6) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭',
  PRIMARY KEY (`id`),
  KEY `state` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depHospital`
--

LOCK TABLES `depHospital` WRITE;
/*!40000 ALTER TABLE `depHospital` DISABLE KEYS */;
INSERT INTO `depHospital` VALUES (1,'青龙东院','华夏神州人民医院青龙东院',1),(2,'厚土中院','华夏神州人民医院厚土中院',1),(3,'玄武北院','华夏神州人民医院玄武北院',1);
/*!40000 ALTER TABLE `depHospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depInclude`
--

DROP TABLE IF EXISTS `depInclude`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depInclude` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depId` int(11) NOT NULL COMMENT '所属科室id',
  `hosId` int(11) NOT NULL COMMENT '分院id',
  `depName` varchar(50) DEFAULT NULL COMMENT '科室名称',
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL COMMENT '楼层地址',
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭',
  PRIMARY KEY (`id`),
  KEY `state` (`state`,`depId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depInclude`
--

LOCK TABLES `depInclude` WRITE;
/*!40000 ALTER TABLE `depInclude` DISABLE KEYS */;
INSERT INTO `depInclude` VALUES (1,1,1,'内科','神经内科','内科大楼203',1),(2,1,1,'内科','消化内科','内科大楼201',1),(3,2,1,'外科','心血管外科','外科大楼225',1),(4,2,1,'外科','烧伤科','外科大楼556',1),(5,2,1,'外科','骨外科','外科大楼356',1),(6,11,2,'内科','神经内科','急诊大楼105',1),(7,11,2,'内科','内分泌科','内科大楼236',1),(8,12,2,'外科','普通外科','外科大楼586',1),(9,12,2,'外科','神经外科','外科大楼886',1),(10,15,2,'眼科','眼部外科','外科大楼446',1),(11,20,3,'内科','普通内科','内科大楼113',1),(12,20,3,'内科','肾内科','内科大楼259',1),(13,28,3,'中医科','中医全科','中医院6号楼225',1),(14,28,3,'中医科','中医儿科','中医院6号楼552',1),(15,1,1,'内科','心血管内科','内科大楼223',1),(16,1,1,'内科','小儿内科','内科大楼125',1),(17,1,1,'内科','内分泌科','内科大楼403',1),(18,1,1,'内科','肿瘤科','内科大楼1209',1),(19,2,1,'外科','心胸外科','急诊大楼559',1),(20,2,1,'外科','矫形外科','外科楼223',1),(21,2,1,'外科','显微外科','外科楼605',1),(22,3,1,'儿科','儿内科 ','急诊441',1),(23,3,1,'儿科','儿外科','急诊443',1),(24,3,1,'儿科','心血管中心','急诊大楼455',1),(25,3,1,'儿科','传染科','急诊大楼456',1),(26,4,1,'妇科','妇内科','急诊120',1);
/*!40000 ALTER TABLE `depInclude` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depOwn`
--

DROP TABLE IF EXISTS `depOwn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depOwn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hosId` int(11) NOT NULL COMMENT '所属医院id',
  `name` varchar(50) DEFAULT NULL,
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭',
  PRIMARY KEY (`id`),
  KEY `state` (`state`,`hosId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depOwn`
--

LOCK TABLES `depOwn` WRITE;
/*!40000 ALTER TABLE `depOwn` DISABLE KEYS */;
INSERT INTO `depOwn` VALUES (1,1,'内科',1),(2,1,'外科',1),(3,1,'儿科',1),(4,1,'妇科',1),(5,1,'眼科',1),(6,1,'耳鼻喉科',1),(7,1,'口腔科',1),(8,1,'皮肤科',1),(9,1,'心理咨询室',1),(10,1,'中医科',1),(11,2,'内科',1),(12,2,'外科',1),(13,2,'儿科',1),(14,2,'妇科',1),(15,2,'眼科',1),(16,2,'耳鼻喉科',1),(17,2,'口腔科',1),(18,2,'皮肤科',1),(19,2,'心理咨询室',1),(20,3,'内科',1),(21,3,'外科',1),(22,3,'儿科',1),(23,3,'妇科',1),(24,3,'眼科',1),(25,3,'耳鼻喉科',1),(26,3,'口腔科',1),(27,3,'皮肤科',1),(28,3,'中医科',1);
/*!40000 ALTER TABLE `depOwn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `hosId` int(11) NOT NULL,
  `depId` int(11) NOT NULL,
  `depTwoId` int(11) NOT NULL,
  `position` varchar(10) NOT NULL COMMENT '职称',
  `reg` varchar(5) DEFAULT NULL COMMENT '挂号费',
  `dia` decimal(10,2) DEFAULT '0.00' COMMENT '诊查费',
  `brief` varchar(500) DEFAULT NULL,
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'吴雨涵','/images/doctor/photo-1660734336045.jpg',1,1,1,'主治医师','60',0.00,'凭借细致耐心的品质，开朗乐观的性格，精益求精的精神，\n深受家长和孩子的喜欢以及同事的一致好评',1),(2,'沈林','/images/doctor/photo-1660735610099.jpg',1,1,2,'主任医师','65',2.00,'凭借细致耐心的品质，开朗乐观的性格，精益求精的精神，\n深受家长和孩子的喜欢以及同事的一致好评',1),(3,'陆欣汝','/images/doctor/photo-1660736395214.jpg',2,11,7,'副主任医师','50',0.00,'凭借细致耐心的品质，开朗乐观的性格，精益求精的精神，\r\n深受家长和孩子的喜欢以及同事的一致好评',1),(4,'徐秀英','/images/doctor/photo-1660736505892.jpg',3,20,12,'主治医师','60',10.00,'一切为了患者，为了患者的一切',1),(5,'秦雅涵','/images/doctor/photo-1660736533601.jpg',3,20,11,'主治医师','50',5.00,'对内科常见疾病的诊断及急、危、重症的抢救有较丰富的经验，尤其擅长支气管哮喘、慢性咳嗽的诊断和治疗，高血压、糖尿病等慢性病的控制及长期管理。在省级杂志发表论文数篇',1),(6,'任晓庆','/images/doctor/photo-1660736549094.jpg',3,20,11,'副主任医师','60',10.00,'对内科常见疾病的诊断及急、危、重症的抢救有较丰富的经验，尤其擅长支气管哮喘、慢性咳嗽的诊断和治疗，高血压、糖尿病等慢性病的控制及长期管理。在省级杂志发表论文数篇',1),(7,'徐榕润','/images/doctor/photo-1660736589744.jpg',2,11,7,'主任医师','55',10.00,'擅长脑卒中一二级预防以及头痛、良性阵发性位置性眩晕（耳石症）、痴呆等的诊断和治疗',1),(8,'徐润莎','/images/doctor/photo-1660736647337.jpg',3,28,13,'主治医师','70',0.00,'熟悉内科及肿瘤科相关诊疗工作。',1),(9,'陈强','/images/doctor/photo-1660736664353.jpg',3,28,14,'主治医师','70',0.00,'熟悉内科及肿瘤科相关诊疗工作。',1),(10,'阎苒溪','/images/doctor/photo-1660736701036.jpg',2,15,10,'主治医师','70',0.00,'擅长内科常见病、多发病的诊治。',1),(11,'贾美欣','/images/doctor/photo-1660736719056.jpg',1,2,3,'主治医师','70',0.00,'擅长内科常见病、多发病的诊治。',1),(12,'谢桂英','/images/doctor/photo-1660736732566.jpg',1,2,3,'副主任医师','60',0.00,'擅长内科常见病、多发病的诊治。',1),(13,'陆超','/images/doctor/photo-1660736741770.jpg',1,2,5,'主任医师','60',0.00,'擅长内科常见病、多发病的诊治。',1),(14,'武天昊','/images/doctor/photo-1660736750441.jpg',1,2,4,'主任医师','60',0.00,'擅长内科常见病、多发病的诊治。',1),(15,'张玥傲','/images/doctor/photo-1668061674041.jpg',1,2,3,'主治医师','20',10.00,'京大学口腔颌面外科博士，首都医科大学口腔颌面外科博士后。自1996年起从事口腔颌面外科临床工作，擅长：1.颌面复杂骨折的诊断和治疗；2.经口内切口治疗下颌骨髁状突骨折；3. 颞下颌关节关节盘外科复位术；4. 颞下颌关节肿瘤的外科治疗；5.颌面部陈旧性创伤畸形的整形修复治疗；',1),(16,'李浩晨','/images/doctor/photo-1668061799351.jpg',1,2,3,'副主任医师','30',2.00,'首都医科大学口腔颌面外科博士后。自1996年起从事口腔颌面外科临床工作，擅长：1.颌面复杂骨折的诊断和治疗；2.经口内切口治疗下颌骨髁状突骨折；3. 颞下颌关节关节盘外科复位术；4. 颞下颌关节肿瘤的外科治疗；5.颌面部陈旧性创伤畸形的整形修复治疗；',1),(17,'叶淳美','/images/doctor/photo-1669383326059.png',1,1,1,'主治医师','20',5.00,'2001年率先在校医院开展临床及体检超声诊断和心电图诊断工作。2001年获临床医学医师资格证开始从事临床医疗工作，至今从事内科临床工作近20年，对普通内科的常见病、多发病的诊治积累了一定的临床经验。',1),(18,'贺静','/images/doctor/photo-1669383366664.png',1,1,1,'主治医师','15',10.00,'2001年率先在校医院开展临床及体检超声诊断和心电图诊断工作。2001年获临床医学医师资格证开始从事临床医疗工作，至今从事内科临床工作近20年，对普通内科的常见病、多发病的诊治积累了一定的临床经验。',1);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `type` varchar(5) NOT NULL,
  `content` varchar(200) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'操作手感不好','使用问题','用起来卡卡的','fae2@p3puk206.com.cn','19318541963','2022-08-18 15:12:05','123456'),(2,'功能无法使用','使用问题','好多功能点击没有反应','321635426@qq.com','匿名','2022-08-20 17:50:33','123456'),(3,'余额退款无法使用','使用问题','进入余额退款功能页面，提示无权限，无法看到退款记录','mufeng@lsgsj.xyz','匿名','2022-11-09 22:24:42','12345678');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `make`
--

DROP TABLE IF EXISTS `make`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `make` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `patId` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `card` varchar(20) DEFAULT NULL COMMENT '就诊卡',
  `idCard` varchar(18) DEFAULT NULL COMMENT '身份证',
  `phone` varchar(12) DEFAULT NULL,
  `type` varchar(5) DEFAULT NULL COMMENT '挂号类型',
  `price` int(11) NOT NULL,
  `state` int(11) DEFAULT '0' COMMENT '状态，0待就诊，1已完成，2以取消',
  `time` varchar(30) DEFAULT NULL COMMENT '就诊日期',
  `datetime` varchar(10) DEFAULT NULL COMMENT '时间',
  `createTime` varchar(30) DEFAULT NULL COMMENT '预约时间',
  `depName` varchar(30) DEFAULT NULL COMMENT '科室名称',
  `hosName` varchar(30) DEFAULT NULL,
  `hosId` int(11) NOT NULL,
  `depId` int(11) NOT NULL,
  `depTwoId` int(11) NOT NULL,
  `doctorName` varchar(20) DEFAULT NULL COMMENT '医生姓名',
  `doctorId` int(11) NOT NULL COMMENT '医生id',
  `position` varchar(5) DEFAULT NULL COMMENT '医生职称',
  `remarks` varchar(30) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `name` (`name`,`card`,`idCard`,`state`,`doctorId`,`patId`,`depTwoId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `make`
--

LOCK TABLES `make` WRITE;
/*!40000 ALTER TABLE `make` DISABLE KEYS */;
INSERT INTO `make` VALUES (1,1,1,'许冰枫','202203923523','220201198302283144','14939204403','普通号',60,1,'2022年8月18日上午','9.30','2022-08-18 15:16:49','内科-神经内科','青龙东院',1,1,1,'吴雨涵',1,'主治医师','无'),(4,1,2,'吕雅晗','202203923566','610201198303035778','15612575061','专家号',60,2,'2022年8月25日上午','9.30','2022-08-21 09:06:46','内科-神经内科','青龙东院',1,1,1,'吴雨涵',1,'主治医师','不想去'),(5,1,3,'金添昊','202203923562','230101198502027045','13894114250','普通号',55,1,'2022-08-25上午','8.55','2022-08-24 08:15:03','内科-普通内科','华夏神州人民医院玄武北院',3,20,11,'秦雅涵',5,'主治医师','无'),(12,1,2,'吕雅晗','202203923566','610201198303035778','15612575061','普通号',55,1,'2022-08-25上午','9.05','2022-08-24 16:20:21','内科-普通内科','华夏神州人民医院玄武北院',3,20,11,'秦雅涵',5,'主治医师','无'),(13,11,4,'墨羽晨','2020025612','422225200204121611','18063354112','普通号',67,1,'2022-11-09上午','14.25','2022-11-09 20:34:03','内科-消化内科','华夏神州人民医院青龙东院',1,1,2,'沈林',2,'主任医师','无'),(14,11,4,'墨羽晨','2020025612','422225200204121611','18063354112','普通号',67,2,'2022-11-12上午','11.51','2022-11-10 06:15:45','内科-消化内科','华夏神州人民医院青龙东院',1,1,2,'沈林',2,'主任医师','有事去不了'),(15,11,5,'墨小羽','20200205275','422225200405121822','15355227872','普通号',60,1,'2022-11-12上午','8.16','2022-11-10 10:17:13','外科-烧伤科','华夏神州人民医院青龙东院',1,2,4,'武天昊',14,'主任医师','无'),(16,1,2,'吕雅晗','202203923566','610201198303035778','15612575061','普通号',60,0,'2022-11-26上午','8.50','2022-11-26 15:49:13','内科-神经内科','华夏神州人民医院青龙东院',1,1,1,'吴雨涵',1,'主治医师','无'),(17,1,3,'金添昊','202203923562','230101198502027045','13894114250','普通号',60,0,'2022-11-26上午','9.00','2022-11-26 19:28:24','内科-神经内科','华夏神州人民医院青龙东院',1,1,1,'吴雨涵',1,'主治医师','无');
/*!40000 ALTER TABLE `make` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0' COMMENT '接收消息的用户id，0表示全部用户',
  `source` varchar(20) DEFAULT NULL COMMENT '来源',
  `time` datetime DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `isread` int(11) DEFAULT '0' COMMENT '是否已读，0为未读',
  `title` varchar(20) NOT NULL,
  `content` varchar(800) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,1,'管理员','2022-08-18 15:14:23','新消息',1,'反馈已收到','感谢您的反馈'),(2,1,'管理员','2022-08-18 15:26:30','退款处理',1,'您的退款申请被驳回','您的订单号为TK081518262022090870的申请被驳回，<br><br>驳回原因为：不想给你退。'),(5,1,'4','2022-08-21 09:06:46','预约成功',1,'预约挂号成功','您已成功在青龙东院预约挂号，请于2022年8月25日上午准时就诊。'),(6,1,'系统通知','2022-08-21 15:15:57','新消息',1,'预约挂号已取消','您在青龙东院预约于2022年8月25日上午的挂号已成功取消'),(7,1,'管理员','2022-08-22 15:50:39','退款处理',1,'您的退款申请已通过','您的订单号为TK081522332022179925的申请已通过，<br>退款金额为：15元，退款后余额为：0元。'),(8,1,'5','2022-08-24 08:15:03','预约成功',1,'预约挂号成功','您已成功在华夏神州人民医院玄武北院预约挂号，请于2022-08-25上午准时就诊。'),(9,1,'12','2022-08-24 16:20:21','预约成功',0,'预约挂号成功','您已成功在华夏神州人民医院玄武北院预约挂号，请于2022-08-25上午准时就诊。'),(10,11,'13','2022-11-09 20:34:03','预约成功',1,'预约挂号成功','您已成功在华夏神州人民医院青龙东院预约挂号，请于2022-11-09上午准时就诊。'),(11,11,'14','2022-11-10 06:15:45','预约成功',0,'预约挂号成功','您已成功在华夏神州人民医院青龙东院预约挂号，请于2022-11-12上午准时就诊。'),(12,11,'系统通知','2022-11-10 06:16:10','新消息',0,'预约挂号已取消','您在华夏神州人民医院青龙东院预约于2022-11-12上午的挂号已成功取消'),(13,11,'15','2022-11-10 10:17:13','预约成功',0,'预约挂号成功','您已成功在华夏神州人民医院青龙东院预约挂号，请于2022-11-12上午准时就诊。'),(16,11,'系统通知','2022-11-10 10:31:47','新消息',1,'预约挂号已完成','您有一个预约挂号已完成，已自动扣款，如有异议请及时反馈处理，请及时充值并且在缴费页面完成缴费'),(17,1,'16','2022-11-26 15:49:13','预约成功',0,'预约挂号成功','您已成功在华夏神州人民医院青龙东院预约挂号，请于2022-11-26上午准时就诊。'),(18,1,'17','2022-11-26 19:28:24','预约成功',1,'预约挂号成功','您已成功在华夏神州人民医院青龙东院预约挂号，请于2022-11-26上午准时就诊。');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `navigation`
--

DROP TABLE IF EXISTS `navigation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `navigation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `reco` varchar(150) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navigation`
--

LOCK TABLES `navigation` WRITE;
/*!40000 ALTER TABLE `navigation` DISABLE KEYS */;
INSERT INTO `navigation` VALUES (1,'华夏神州人民医院青龙东院','0010-556632','华夏神州内乘4、5、20、24、27、49、46路高铁可直达青龙东院本部','上海市市辖区奉贤区南桥镇'),(2,'华夏神州人民医院厚土中院','0010-556689','华夏神州内乘11,23,89,555,682路高铁可直达厚土中院本部','山西省晋城市沁水县龙港镇'),(3,'华夏神州人民医院玄武北院','0010-556636','华夏神州内乘87,63,19,665,823路高铁可直达玄武北院本部','山东省潍坊市青州市何官镇');
/*!40000 ALTER TABLE `navigation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `navigationFloor`
--

DROP TABLE IF EXISTS `navigationFloor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `navigationFloor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hosId` int(11) NOT NULL,
  `floorName` varchar(10) NOT NULL,
  `content` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navigationFloor`
--

LOCK TABLES `navigationFloor` WRITE;
/*!40000 ALTER TABLE `navigationFloor` DISABLE KEYS */;
INSERT INTO `navigationFloor` VALUES (1,1,'一楼','肿瘤内科、肿瘤外科、肿瘤妇科、骨肿瘤科、放疗科、肿瘤康复科、肿瘤综合科'),(2,1,'二楼','医全科、中医内科、中医外科、中医妇科、中医儿科、中医保健科、针灸按摩科'),(3,1,'三楼','肝病科、艾滋病科、结核病、寄生虫'),(4,2,'一楼','药剂科、护理科、体检科、检验科、急诊科、公共卫生与预防科、全科'),(5,2,'二楼','核医学科、放射科、超声科'),(6,3,'一楼','普通外科、神经外科、心胸外科、泌尿外科、心血管外科、乳腺外科、肝胆外科、器官移植、肛肠外科、烧伤科、骨外科'),(7,3,'二楼','科、产科、计划生育、妇幼保健');
/*!40000 ALTER TABLE `navigationFloor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `docType` varchar(10) NOT NULL DEFAULT '身份证',
  `certificate` varchar(18) NOT NULL,
  `relation` varchar(2) NOT NULL,
  `card` varchar(20) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `isdefault` int(11) DEFAULT '2' COMMENT '1默认，2非默认',
  `balance` decimal(10,2) DEFAULT '0.00' COMMENT '账户余额',
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `card` (`card`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (2,'吕雅晗','身份证','610201198303035778','子女','202203923566','15612575061','内蒙古自治区乌兰察布市察哈尔右翼中旗黄羊城镇',2,55.00,1),(3,'金添昊','身份证','230101198502027045','本人','202203923562','13894114250','云南省红河哈尼族彝族自治州屏边苗族自治县新华乡',1,110.00,1),(4,'墨羽晨','身份证','422225200204121611','本人','202002561220','18063354112','江苏省徐州市沛县沛城镇小向阳路',2,3.00,11),(5,'墨小羽','身份证','422225200405121822','子女','20200205275','15355227872','江苏省',1,40.00,11),(6,'邱佳钰','身份证','310101197408191602','本人','2020020568825','15150519040','上海市市辖区黄浦区淮海中路街道',1,0.00,12),(8,'梁瑾昆','身份证','520101197907232252','夫妻','20221023625','14773588123','宁夏回族自治区吴忠市同心县兴隆乡',2,0.00,12);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payOrder`
--

DROP TABLE IF EXISTS `payOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payOrder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(20) NOT NULL,
  `time` datetime DEFAULT NULL,
  `price` int(11) DEFAULT NULL COMMENT '总价',
  `type` varchar(10) DEFAULT NULL,
  `dep` varchar(10) DEFAULT NULL COMMENT '科室',
  `patName` varchar(10) DEFAULT NULL COMMENT '就诊人姓名',
  `card` varchar(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `patId` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT '0' COMMENT '0待支付，1已支付',
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`,`state`,`patId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payOrder`
--

LOCK TABLES `payOrder` WRITE;
/*!40000 ALTER TABLE `payOrder` DISABLE KEYS */;
INSERT INTO `payOrder` VALUES (1,'JF081518502022586206','2022-08-18 15:50:58',100,'西药费','消化内科','吕雅晗','202203923523',1,2,0),(2,'JF081824232022044414','2022-08-24 18:23:04',55,'挂号费','内科-普通内科','金添昊','202203923562',1,3,0),(3,'JF112109142022027476','2022-11-09 21:14:02',67,'挂号费','内科-消化内科','墨羽晨','2020025612',11,4,1);
/*!40000 ALTER TABLE `payOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payOrderList`
--

DROP TABLE IF EXISTS `payOrderList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payOrderList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(20) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL COMMENT '单价',
  `num` int(11) DEFAULT '1',
  `total` int(11) DEFAULT NULL COMMENT '小计',
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payOrderList`
--

LOCK TABLES `payOrderList` WRITE;
/*!40000 ALTER TABLE `payOrderList` DISABLE KEYS */;
INSERT INTO `payOrderList` VALUES (1,'JF081518502022586206','阿莫西林',30.00,2,60),(2,'JF081518502022586206','胶囊',20.00,2,40),(3,'JF081824232022044414','挂号费',55.00,1,55),(4,'JF112109142022027476','挂号费',67.00,1,67);
/*!40000 ALTER TABLE `payOrderList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recorder`
--

DROP TABLE IF EXISTS `recorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auantity` decimal(10,2) NOT NULL COMMENT '充值金额',
  `card` varchar(20) NOT NULL,
  `payType` varchar(10) DEFAULT '在线支付',
  `time` datetime DEFAULT NULL,
  `orderId` varchar(35) DEFAULT NULL COMMENT '支付订单号',
  `patName` varchar(10) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `patId` int(11) NOT NULL COMMENT '就诊人id',
  `balance` decimal(10,2) NOT NULL COMMENT '充值完成余额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recorder`
--

LOCK TABLES `recorder` WRITE;
/*!40000 ALTER TABLE `recorder` DISABLE KEYS */;
INSERT INTO `recorder` VALUES (1,65.00,'202203923523','微信支付','2022-08-18 15:19:57','CZ081518192022578557','许冰枫',1,1,65.00),(2,15.00,'202203923566','微信支付','2022-08-21 15:50:00','CZ081521502022007675','吕雅晗',1,2,35.00),(3,50.00,'202203923566','微信支付','2022-08-22 20:30:40','CZ082022302022401864','吕雅晗',1,2,50.00),(4,10.00,'202203923566','微信支付','2022-08-22 20:31:22','CZ082022312022223846','吕雅晗',1,2,60.00),(5,10.00,'202203923562','微信支付','2022-08-22 20:36:05','CZ082022362022056758','金添昊',1,3,10.00),(6,50.00,'202203923562','微信支付','2022-09-14 14:01:17','CZ091414012022174698','金添昊',1,3,0.00),(7,50.00,'202203923566','微信支付','2022-09-14 14:01:35','CZ091414012022357863','吕雅晗',1,2,55.00),(8,50.00,'202203923562','微信支付','2022-09-14 14:06:46','CZ091414062022466493','金添昊',1,3,110.00),(9,50.00,'202203923562','微信支付','2022-09-14 14:07:32','CZ091414072022321030','金添昊',1,3,60.00),(10,50.00,'20200205275','微信支付','2022-11-09 21:10:45','CZ112109102022458052','墨小羽',11,5,50.00),(11,70.00,'2020025612','微信支付','2022-11-09 21:17:10','CZ112109172022100645','墨羽晨',11,4,70.00),(12,50.00,'20200205275','微信支付','2022-11-10 10:31:35','CZ111010312022353244','墨小羽',11,5,100.00);
/*!40000 ALTER TABLE `recorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund`
--

DROP TABLE IF EXISTS `refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  `orderId` varchar(20) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `card` varchar(20) NOT NULL,
  `balance` decimal(10,2) NOT NULL COMMENT '余额',
  `money` decimal(10,2) NOT NULL COMMENT '退款金额',
  `userId` int(11) DEFAULT NULL,
  `patId` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT '0' COMMENT '0待处理，1已退款，2驳回',
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund`
--

LOCK TABLES `refund` WRITE;
/*!40000 ALTER TABLE `refund` DISABLE KEYS */;
INSERT INTO `refund` VALUES (1,'2022-08-18 15:26:09','TK081518262022090870','吕雅晗','202203923523',0.00,5.00,1,2,2),(2,'2022-08-22 15:33:17','TK081522332022179925','吕雅晗','202203923566',0.00,15.00,1,2,1),(3,'2022-09-20 10:36:15','TK091020362022158095','吕雅晗','202203923566',35.00,20.00,1,2,0),(4,'2022-11-08 15:46:07','TK111508462022075380','金添昊','202203923562',100.00,10.00,1,3,0);
/*!40000 ALTER TABLE `refund` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `swiper`
--

DROP TABLE IF EXISTS `swiper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `swiper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(50) DEFAULT NULL,
  `detId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `swiper`
--

LOCK TABLES `swiper` WRITE;
/*!40000 ALTER TABLE `swiper` DISABLE KEYS */;
INSERT INTO `swiper` VALUES (1,'/images/swiper/swiperImg-1660737121955.jpg',1),(2,'/images/swiper/swiperImg-1660737502591.png',2),(3,'/images/swiper/swiperImg-1660737716851.jpg',3);
/*!40000 ALTER TABLE `swiper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `name` varchar(20) NOT NULL,
  `gender` int(11) NOT NULL DEFAULT '0',
  `age` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `state` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'123456','e50de14051afd6aacd8d1560f2f08579','测试用户',0,28,'3216354195@qq.com','18686979779','/images/avatar/avatar-1663121568823.png','2022-08-15 10:51:14',1),(11,'12345678','78d609a308db4a83d77eac6f9d486262','墨羽晨',0,20,'8c1f@6069n6.xyz','18374578913','/images/default/boy.jpeg','2022-08-19 17:54:28',1),(12,'25802580','09e03c011b90c38b252659fa515cf000','三两六钱',0,21,'lsgsj@lsgsj.xyz','15366335555','/images/avatar/avatar-1667996748459.jpg','2022-11-09 20:25:14',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'register'
--

--
-- Dumping routines for database 'register'
--
/*!50003 DROP PROCEDURE IF EXISTS `getArrange` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`register`@`localhost` PROCEDURE `getArrange`(IN `Intime` DATE, IN `Inpage` INT, IN `Inlimit` INT)
begin
select 
     a.id,a.doctorName,a.doctorId,a.hosName,a.hosId,a.depName,
    (select id from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as id1,
	(select time from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as time1,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as MtimeSegment1,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Mnum1,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Msurplus1,
	(select Mstate from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Mstate1,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as AtimeSegment1,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Anum1,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Asurplus1,
	(select Astate from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Astate1,
    (select id from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as id2,
    (select time from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as time2,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as MtimeSegment2,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Mnum2,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Msurplus2,
	(select Mstate from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Mstate2,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as AtimeSegment2,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Anum2,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Asurplus2,
	(select Astate from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Astate2,
    (select id from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as id3,
    (select time from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as time3,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as MtimeSegment3,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Mnum3,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Msurplus3,
	(select Mstate from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Mstate3,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as AtimeSegment3,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Anum3,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Asurplus3,
	(select Astate from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Astate3,
    (select id from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as id4,
    (select time from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as time4,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as MtimeSegment4,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Mnum4,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Msurplus4,
	(select Mstate from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Mstate4,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as AtimeSegment4,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Anum4,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Asurplus4,
	(select Astate from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Astate4,
    (select id from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as id5,
    (select time from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as time5,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as MtimeSegment5,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Mnum5,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Msurplus5,
	(select Mstate from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Mstate5,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as AtimeSegment5,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Anum5,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Asurplus5,
	(select Astate from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Astate5,
    (select id from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as id6,
    (select time from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as time6,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as MtimeSegment6,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Mnum6,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Msurplus6,
	(select Mstate from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Mstate6,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as AtimeSegment6,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Anum6,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Asurplus6,
	(select Astate from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Astate6,
    (select id from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as id7,
    (select time from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as time7,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as MtimeSegment7,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Mnum7,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Msurplus7,
	(select Mstate from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Mstate7,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as AtimeSegment7,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Anum7,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Asurplus7,
	(select Astate from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Astate7
 from arrange a where time between Intime and date_add(Intime,interval 6 day) and doctorId = a.doctorId  group by doctorId limit Inpage,Inlimit;
 end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getArrangeById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`register`@`localhost` PROCEDURE `getArrangeById`(IN `Intime` DATE, IN `Inid` INT)
begin
select 
    a.id,a.doctorName,a.doctorId,a.hosName,a.hosId,a.depName,
    (select id from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as id1,
	(select time from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as time1,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as MtimeSegment1,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Mnum1,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Msurplus1,
	(select Mstate from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Mstate1,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as AtimeSegment1,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Anum1,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Asurplus1,
	(select Astate from arrange where time = date_add(Intime,interval 0 day) and doctorId = a.doctorId) as Astate1,
    (select id from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as id2,
    (select time from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as time2,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as MtimeSegment2,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Mnum2,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Msurplus2,
	(select Mstate from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Mstate2,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as AtimeSegment2,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Anum2,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Asurplus2,
	(select Astate from arrange where time = date_add(Intime,interval 1 day) and doctorId = a.doctorId) as Astate2,
    (select id from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as id3,
    (select time from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as time3,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as MtimeSegment3,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Mnum3,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Msurplus3,
	(select Mstate from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Mstate3,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as AtimeSegment3,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Anum3,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Asurplus3,
	(select Astate from arrange where time = date_add(Intime,interval 2 day) and doctorId = a.doctorId) as Astate3,
    (select id from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as id4,
    (select time from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as time4,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as MtimeSegment4,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Mnum4,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Msurplus4,
	(select Mstate from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Mstate4,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as AtimeSegment4,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Anum4,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Asurplus4,
	(select Astate from arrange where time = date_add(Intime,interval 3 day) and doctorId = a.doctorId) as Astate4,
    (select id from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as id5,
    (select time from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as time5,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as MtimeSegment5,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Mnum5,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Msurplus5,
	(select Mstate from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Mstate5,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as AtimeSegment5,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Anum5,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Asurplus5,
	(select Astate from arrange where time = date_add(Intime,interval 4 day) and doctorId = a.doctorId) as Astate5,
    (select id from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as id6,
    (select time from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as time6,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as MtimeSegment6,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Mnum6,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Msurplus6,
	(select Mstate from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Mstate6,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as AtimeSegment6,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Anum6,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Asurplus6,
	(select Astate from arrange where time = date_add(Intime,interval 5 day) and doctorId = a.doctorId) as Astate6,
    (select id from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as id7,
    (select time from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as time7,
	(select if(Mstate = 1,'休息',MtimeSegment) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as MtimeSegment7,
	(select if(Mstate = 1,'休息',Mnum) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Mnum7,
	(select if(Mstate = 1,'休息',Msurplus) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Msurplus7,
	(select Mstate from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Mstate7,
	(select if(Astate = 1,'休息',AtimeSegment) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as AtimeSegment7,
	(select if(Astate = 1,'休息',Anum) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Anum7,
	(select if(Astate = 1,'休息',Asurplus) from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Asurplus7,
	(select Astate from arrange where time = date_add(Intime,interval 6 day) and doctorId = a.doctorId) as Astate7
 from arrange a where time between Intime and date_add(Intime,interval 6 day) and doctorId = Inid  group by doctorId;
 end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getStatistics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`register`@`localhost` PROCEDURE `getStatistics`()
begin
select 
    (select count(id) from make where datediff(createTime,now()) = 0) as appointments,
    (select if(sum(money),sum(money),0) from refund where datediff(time,now()) = 0) as refund,
    (select if(sum(auantity),sum(auantity),0) from recorder where datediff(time,now()) = 0) as recharge,
    (select if(sum(price),sum(price),0) from make where datediff(createTime,now()) = 0) as outpatient,
    (select count(id) from users where datediff(createTime,now()) = 0) as users
;
 end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `patDefMod` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`register`@`localhost` PROCEDURE `patDefMod`(IN `uid` INT, IN `pid` INT)
begin
	update patient set isdefault = 2 where userId = uid;
   select * from patient where userId = uid;
   update patient set isdefault = 1 where id = pid;
 end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-02 22:14:57
