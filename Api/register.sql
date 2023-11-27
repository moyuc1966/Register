-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2022-11-10 17:29:58
-- 服务器版本： 5.6.50-log
-- PHP 版本： 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `register`
--

DELIMITER $$
--
-- 存储过程
--
CREATE PROCEDURE `getArrange` (IN `Intime` DATE, IN `Inpage` INT, IN `Inlimit` INT)  begin
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
 end$$

CREATE  PROCEDURE `getArrangeById` (IN `Intime` DATE, IN `Inid` INT)  begin
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
 end$$

CREATE  PROCEDURE `getStatistics` ()  begin
select 
    (select count(id) from make where datediff(createTime,now()) = 0) as appointments,
    (select if(sum(money),sum(money),0) from refund where datediff(time,now()) = 0) as refund,
    (select if(sum(auantity),sum(auantity),0) from recorder where datediff(time,now()) = 0) as recharge,
    (select if(sum(price),sum(price),0) from make where datediff(createTime,now()) = 0) as outpatient,
    (select count(id) from users where datediff(createTime,now()) = 0) as users
;
 end$$

CREATE  PROCEDURE `patDefMod` (IN `uid` INT, IN `pid` INT)  begin
	update patient set isdefault = 2 where userId = uid;
   select * from patient where userId = uid;
   update patient set isdefault = 1 where id = pid;
 end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `gender` int(11) NOT NULL DEFAULT '1',
  `email` varchar(50) DEFAULT NULL,
  `grade` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `name`, `username`, `password`, `gender`, `email`, `grade`) VALUES
(1, '超级管理员', '123456', 'E50DE14051AFD6AACD8D1560F2F08579', 1, NULL, 1);

-- --------------------------------------------------------

--
-- 表的结构 `arrange`
--

CREATE TABLE `arrange` (
  `id` int(11) NOT NULL,
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
  `Astate` int(11) DEFAULT '0' COMMENT '0排班，1休息'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `readNum` int(11) NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL,
  `author` varchar(20) NOT NULL DEFAULT '佚名',
  `cat` varchar(50) NOT NULL DEFAULT '分享',
  `imgUrl` varchar(50) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `code`
--

CREATE TABLE `code` (
  `id` int(11) NOT NULL,
  `code` char(6) NOT NULL,
  `time` varchar(13) DEFAULT NULL COMMENT '操作开始时间戳',
  `state` int(11) DEFAULT '1' COMMENT '1表示操作中，2表示已失效',
  `uid` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `depHospital`
--

CREATE TABLE `depHospital` (
  `id` int(11) NOT NULL,
  `minname` varchar(6) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `depInclude`
--

CREATE TABLE `depInclude` (
  `id` int(11) NOT NULL,
  `depId` int(11) NOT NULL COMMENT '所属科室id',
  `hosId` int(11) NOT NULL COMMENT '分院id',
  `depName` varchar(50) DEFAULT NULL COMMENT '科室名称',
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL COMMENT '楼层地址',
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `depOwn`
--

CREATE TABLE `depOwn` (
  `id` int(11) NOT NULL,
  `hosId` int(11) NOT NULL COMMENT '所属医院id',
  `name` varchar(50) DEFAULT NULL,
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `hosId` int(11) NOT NULL,
  `depId` int(11) NOT NULL,
  `depTwoId` int(11) NOT NULL,
  `position` varchar(10) NOT NULL COMMENT '职称',
  `reg` varchar(5) DEFAULT NULL COMMENT '挂号费',
  `dia` decimal(10,2) DEFAULT '0.00' COMMENT '诊查费',
  `brief` varchar(500) DEFAULT NULL,
  `state` int(11) DEFAULT '1' COMMENT '开关，0表示关闭'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `type` varchar(5) NOT NULL,
  `content` varchar(200) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `make`
--

CREATE TABLE `make` (
  `id` int(11) NOT NULL,
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
  `remarks` varchar(30) DEFAULT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL DEFAULT '0' COMMENT '接收消息的用户id，0表示全部用户',
  `source` varchar(20) DEFAULT NULL COMMENT '来源',
  `time` datetime DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `isread` int(11) DEFAULT '0' COMMENT '是否已读，0为未读',
  `title` varchar(20) NOT NULL,
  `content` varchar(800) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `navigation`
--

CREATE TABLE `navigation` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `reco` varchar(150) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `navigationFloor`
--

CREATE TABLE `navigationFloor` (
  `id` int(11) NOT NULL,
  `hosId` int(11) NOT NULL,
  `floorName` varchar(10) NOT NULL,
  `content` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `docType` varchar(10) NOT NULL DEFAULT '身份证',
  `certificate` varchar(18) NOT NULL,
  `relation` varchar(2) NOT NULL,
  `card` varchar(20) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `isdefault` int(11) DEFAULT '2' COMMENT '1默认，2非默认',
  `balance` decimal(10,2) DEFAULT '0.00' COMMENT '账户余额',
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `payOrder`
--

CREATE TABLE `payOrder` (
  `id` int(11) NOT NULL,
  `orderId` varchar(20) NOT NULL,
  `time` datetime DEFAULT NULL,
  `price` int(11) DEFAULT NULL COMMENT '总价',
  `type` varchar(10) DEFAULT NULL,
  `dep` varchar(10) DEFAULT NULL COMMENT '科室',
  `patName` varchar(10) DEFAULT NULL COMMENT '就诊人姓名',
  `card` varchar(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `patId` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT '0' COMMENT '0待支付，1已支付'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `payOrderList`
--

CREATE TABLE `payOrderList` (
  `id` int(11) NOT NULL,
  `orderId` varchar(20) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL COMMENT '单价',
  `num` int(11) DEFAULT '1',
  `total` int(11) DEFAULT NULL COMMENT '小计'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `recorder`
--

CREATE TABLE `recorder` (
  `id` int(11) NOT NULL,
  `auantity` decimal(10,2) NOT NULL COMMENT '充值金额',
  `card` varchar(20) NOT NULL,
  `payType` varchar(10) DEFAULT '在线支付',
  `time` datetime DEFAULT NULL,
  `orderId` varchar(35) DEFAULT NULL COMMENT '支付订单号',
  `patName` varchar(10) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `patId` int(11) NOT NULL COMMENT '就诊人id',
  `balance` decimal(10,2) NOT NULL COMMENT '充值完成余额'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `refund`
--

CREATE TABLE `refund` (
  `id` int(11) NOT NULL,
  `time` datetime DEFAULT NULL,
  `orderId` varchar(20) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `card` varchar(20) NOT NULL,
  `balance` decimal(10,2) NOT NULL COMMENT '余额',
  `money` decimal(10,2) NOT NULL COMMENT '退款金额',
  `userId` int(11) DEFAULT NULL,
  `patId` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT '0' COMMENT '0待处理，1已退款，2驳回'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `swiper`
--

CREATE TABLE `swiper` (
  `id` int(11) NOT NULL,
  `imgUrl` varchar(50) DEFAULT NULL,
  `detId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `name` varchar(20) NOT NULL,
  `gender` int(11) NOT NULL DEFAULT '0',
  `age` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `state` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转储表的索引
--

--
-- 表的索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 表的索引 `arrange`
--
ALTER TABLE `arrange`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctorId` (`doctorId`,`doctorName`,`depName`,`depTwoId`,`time`);

--
-- 表的索引 `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_cat` (`cat`);

--
-- 表的索引 `code`
--
ALTER TABLE `code`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `depHospital`
--
ALTER TABLE `depHospital`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state` (`state`);

--
-- 表的索引 `depInclude`
--
ALTER TABLE `depInclude`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state` (`state`,`depId`);

--
-- 表的索引 `depOwn`
--
ALTER TABLE `depOwn`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state` (`state`,`hosId`);

--
-- 表的索引 `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `make`
--
ALTER TABLE `make`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`,`card`,`idCard`,`state`,`doctorId`,`patId`,`depTwoId`);

--
-- 表的索引 `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- 表的索引 `navigation`
--
ALTER TABLE `navigation`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `navigationFloor`
--
ALTER TABLE `navigationFloor`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `card` (`card`);

--
-- 表的索引 `payOrder`
--
ALTER TABLE `payOrder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`,`state`,`patId`);

--
-- 表的索引 `payOrderList`
--
ALTER TABLE `payOrderList`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`);

--
-- 表的索引 `recorder`
--
ALTER TABLE `recorder`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `refund`
--
ALTER TABLE `refund`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`);

--
-- 表的索引 `swiper`
--
ALTER TABLE `swiper`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `arrange`
--
ALTER TABLE `arrange`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `code`
--
ALTER TABLE `code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `depHospital`
--
ALTER TABLE `depHospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `depInclude`
--
ALTER TABLE `depInclude`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `depOwn`
--
ALTER TABLE `depOwn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `make`
--
ALTER TABLE `make`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `navigation`
--
ALTER TABLE `navigation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `navigationFloor`
--
ALTER TABLE `navigationFloor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `payOrder`
--
ALTER TABLE `payOrder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `payOrderList`
--
ALTER TABLE `payOrderList`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `recorder`
--
ALTER TABLE `recorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `swiper`
--
ALTER TABLE `swiper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
