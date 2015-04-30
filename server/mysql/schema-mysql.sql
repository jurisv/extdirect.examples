-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 13, 2013 at 05:28 PM
-- Server version: 5.5.33
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `extdirectnode`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dueDate` date NOT NULL,
  `priority` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1679 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `dueDate`, `priority`) VALUES
  (1, 'Task 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2013-12-12', 'High'),
  (2, 'Task 2', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '2013-12-13', 'High'),
  (3, 'Task 3', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', '2013-12-14', 'High'),
  (4, 'Task 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.''', '2013-12-11', 'Normal'),
  (5, 'Task 5', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '2013-12-10', 'Normal'),
  (6, 'Task 6', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', '2013-12-23', 'Normal'),
  (7, 'Task 7', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2013-12-01', 'Normal'),
  (8, 'Task 8', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '2013-12-27', 'Low'),
  (9, 'Task 9', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', '2013-12-08', 'Low'),
  (10, 'Task 10', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2013-12-25', 'Low');

-- --------------------------------------------------------

--
-- Table structure for table `todoitem`
--

CREATE TABLE `todoitem` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(128) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `todoitem`
--

INSERT INTO `todoitem` (`id`, `text`, `complete`) VALUES
  (1, 'Set up alarm to 6am', 1),
  (2, 'Get some rest and sleep well', 1),
  (3, 'Wake up refreshed', 1),
  (4, 'Take shower', 1),
  (5, 'Prepare breakfast', 0),
  (6, 'Read morning newspapers', 0),
  (7, 'Watch Good Morning America', 0),
  (8, 'Dress up for the meeting', 0),
  (9, 'Check email', 0),
  (10, 'Head to the office', 0);

--
-- Table structure for table `satodoitem`
--

CREATE TABLE `satask` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dueDate` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `priority` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `details` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `updatedAt` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `assignedTo` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Sample table for Sencha Architect 3.2 project' AUTO_INCREMENT=893 ;

--
-- Dumping data for table `satodoitem`
--

INSERT INTO `satask` (`id`, `description`, `dueDate`, `priority`, `details`, `createdAt`, `updatedAt`, `assignedTo`) VALUES
(761, 'Schedule changes as required', '1/8/2011', 'High', '<b>aliquam<\\/b> et.<U><b>iste<\\/b><\\/u> architecto harum vel eum.', '2/18/2008', '6/26/2001', 'hdiaz'),
(892, 'Identify event sources by resource type.', '2/13/2014', 'Normal', '<U><u>aut<\\/u><\\/u> et quibusdam minima fuga.', '11/10/2011', '10/16/2013', 'jtucker'),
(24, 'Create databases on the history server.', '8/28/2011', 'Normal', '<b>sed<\\/b> quia nobis.', '10/25/2014', '1/16/2011', 'hdiaz'),
(838, 'Monitor system performance and adjust hardware as required', '11/12/2009', 'Low', '<b>pariatur<\\/b> assumenda.', '12/1/2010', '1/17/2006', 'ryoung'),
(164, 'Database backup and maintenance', '7/13/2013', 'Low', '<b>eum<\\/b> et.', '1/3/2012', '8/22/2010', 'jallen');
