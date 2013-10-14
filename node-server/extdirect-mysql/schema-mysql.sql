-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 13, 2013 at 10:07 PM
-- Server version: 5.5.29
-- PHP Version: 5.4.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `extdirectnode`
--

-- --------------------------------------------------------

--
-- Table structure for table `todoitem`
--

CREATE TABLE `todoitem` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(128) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `todoitem`
--

INSERT INTO `todoitem` (`id`, `text`, `complete`) VALUES
(1, 'Wake up', 0),
(2, 'Go to Foothill College', 0),
(3, 'Have fun', 0);