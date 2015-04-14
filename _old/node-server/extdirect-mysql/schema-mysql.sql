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
