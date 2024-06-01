-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 01, 2024 at 08:32 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `attachments`
--

CREATE TABLE `attachments` (
  `id` bigint(13) NOT NULL,
  `filename` varchar(60) NOT NULL,
  `size` int(11) NOT NULL,
  `type` varchar(5) NOT NULL,
  `message_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`id`, `filename`, `size`, `type`, `message_id`, `post_id`) VALUES
(1694782183483, '1540970939593.jpg', 45781, 'image', 50, NULL),
(1694782184407, '1540970939593.jpg', 45781, 'image', 51, NULL),
(1694782203739, '1540970939593.jpg', 45781, 'image', 52, NULL),
(1695050367764, '1540970939593.jpg', 45781, 'image', 59, NULL),
(1695050380629, '1540970939593.jpg', 45781, 'image', 60, NULL),
(1717259697671, 'Screenshot_20240530_135721_YouTube.webp', 8906, 'image', 72, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `channels`
--

CREATE TABLE `channels` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `community_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `channels`
--

INSERT INTO `channels` (`id`, `name`, `community_id`) VALUES
(1, 'test', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `communities`
--

CREATE TABLE `communities` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `icon` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `communities`
--

INSERT INTO `communities` (`id`, `name`, `icon`) VALUES
(1, 'Botnet', 'default_avatar.png');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `community_features`
--

CREATE TABLE `community_features` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL,
  `community_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `community_features`
--

INSERT INTO `community_features` (`id`, `name`, `type`, `community_id`) VALUES
(1, 'Chat', 'chat', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `community_members`
--

CREATE TABLE `community_members` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `since` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `community_members`
--

INSERT INTO `community_members` (`id`, `user_id`, `community_id`, `since`) VALUES
(1, 1, 1, '2023-08-05 23:04:52');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  `reference_id` int(11) DEFAULT NULL,
  `content` varchar(200) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `channel_id`, `reference_id`, `content`, `created`, `author_id`) VALUES
(1, 1, NULL, 'test message', '2023-09-04 14:28:46', 1),
(2, 1, NULL, 'test message', '2023-09-04 14:31:02', 1),
(3, 1, NULL, 'test message', '2023-09-04 14:55:35', 1),
(4, 1, NULL, 'test message', '2023-09-04 14:56:18', 1),
(5, 1, NULL, 'test message', '2023-09-04 15:09:18', 1),
(6, 1, NULL, 'test message', '2023-09-04 15:10:03', 1),
(7, 1, NULL, 'test message', '2023-09-04 15:10:47', 1),
(8, 1, NULL, 'test message', '2023-09-15 13:45:42', 1),
(9, 1, NULL, 'test message', '2023-09-15 13:45:58', 1),
(10, 1, NULL, 'test message', '2023-09-15 13:47:29', 1),
(11, 1, NULL, 'test message', '2023-09-15 13:47:30', 1),
(12, 1, NULL, 'test message', '2023-09-15 13:47:32', 1),
(13, 1, NULL, 'test message', '2023-09-15 13:47:46', 1),
(14, 1, NULL, 'test message', '2023-09-15 13:47:47', 1),
(15, 1, NULL, 'test message', '2023-09-15 13:47:48', 1),
(16, 1, NULL, 'test message', '2023-09-15 13:47:48', 1),
(17, 1, NULL, 'test message', '2023-09-15 13:48:17', 1),
(18, 1, NULL, 'test message', '2023-09-15 13:50:02', 1),
(19, 1, NULL, 'test message', '2023-09-15 13:52:07', 1),
(20, 1, NULL, 'test message', '2023-09-15 13:52:43', 1),
(21, 1, NULL, 'test message', '2023-09-15 13:54:54', 1),
(22, 1, NULL, 'test message', '2023-09-15 13:55:49', 1),
(23, 1, NULL, 'test message', '2023-09-15 13:57:17', 1),
(24, 1, NULL, 'test message', '2023-09-15 13:57:36', 1),
(25, 1, NULL, 'test message', '2023-09-15 13:58:20', 1),
(26, 1, NULL, 'test message', '2023-09-15 13:58:28', 1),
(27, 1, NULL, 'test message', '2023-09-15 13:58:33', 1),
(28, 1, NULL, 'test message', '2023-09-15 14:02:37', 1),
(29, 1, NULL, 'test message', '2023-09-15 14:24:30', 1),
(30, 12, 169, 'Attachments', '2023-09-15 14:28:54', 1),
(31, 12, 169, 'Attachments', '2023-09-15 14:29:50', 1),
(32, 12, 169, 'Attachments', '2023-09-15 14:33:11', 1),
(33, 12, 169, 'Attachments', '2023-09-15 14:33:52', 1),
(34, 12, 169, 'Attachments', '2023-09-15 14:34:40', 1),
(35, 12, 169, 'Attachments', '2023-09-15 14:35:08', 1),
(36, 1, NULL, 'test message', '2023-09-15 14:35:40', 1),
(37, 12, 169, 'Attachments', '2023-09-15 14:35:47', 1),
(38, 12, 169, 'Attachments', '2023-09-15 14:36:04', 1),
(39, 1, NULL, 'test message', '2023-09-15 14:36:12', 1),
(40, 1, 169, 'Attachments', '2023-09-15 14:36:25', 1),
(41, 12, 139, 'test message with reference', '2023-09-15 14:43:03', 1),
(42, 1, 169, 'Attachments', '2023-09-15 14:43:10', 1),
(43, 1, 169, 'Attachments', '2023-09-15 14:45:43', 1),
(44, 1, 169, 'Attachments', '2023-09-15 14:46:30', 1),
(45, 1, 169, 'Attachments', '2023-09-15 14:47:15', 1),
(46, 1, 169, 'Attachments', '2023-09-15 14:47:33', 1),
(47, 1, 169, 'Attachments', '2023-09-15 14:47:49', 1),
(48, 1, 169, 'Attachments', '2023-09-15 14:48:44', 1),
(49, 1, 169, 'Attachments', '2023-09-15 14:48:58', 1),
(51, 1, 169, 'Attachments', '2023-09-15 14:49:44', 1),
(52, 1, 50, 'Attachments', '2023-09-15 14:50:03', 1),
(53, 1, NULL, 'test message', '2023-09-18 16:45:10', 1),
(54, 1, NULL, 'test message', '2023-09-18 16:52:27', 1),
(55, 1, NULL, '', '2023-09-18 17:17:55', 1),
(56, 1, NULL, '', '2023-09-18 17:18:18', 1),
(57, 1, NULL, '', '2023-09-18 17:18:32', 1),
(58, 1, NULL, 'Attachments', '2023-09-18 17:19:25', 1),
(59, 1, NULL, 'Attachments', '2023-09-18 17:19:27', 1),
(61, 1, NULL, 'test message', '2023-09-18 17:23:06', 1),
(62, 1, NULL, 'test message', '2023-09-18 17:23:07', 1),
(63, 1, NULL, 'test message', '2023-09-18 17:23:08', 1),
(64, 1, NULL, 'test message', '2023-09-18 17:23:08', 1),
(65, 1, NULL, 'test message', '2023-09-18 17:23:09', 1),
(66, 12, 139, 'test message with reference', '2023-09-19 14:03:31', 1),
(67, 12, 139, 'test message with reference', '2023-09-19 14:03:46', 1),
(68, 1, 139, 'test message with reference', '2023-09-19 14:05:05', 1),
(69, 1, 60, 'test message with reference', '2023-09-19 14:05:32', 1),
(70, 1, NULL, 'test message', '2023-09-20 18:31:10', 1),
(71, 1, NULL, 'ds', '2024-06-01 18:34:50', 1),
(72, 1, NULL, '', '2024-06-01 18:34:57', 1),
(73, 1, NULL, 'ds', '2024-06-01 20:05:37', 1),
(74, 1, NULL, 'fdsf', '2024-06-01 20:05:40', 1),
(75, 1, NULL, 'fdfd', '2024-06-01 20:05:42', 1),
(76, 1, NULL, 'f', '2024-06-01 20:05:43', 1),
(77, 1, NULL, 'ds', '2024-06-01 20:05:50', 1),
(78, 1, NULL, 'ds', '2024-06-01 20:05:50', 1),
(79, 1, NULL, 'sd', '2024-06-01 20:05:51', 1),
(80, 1, NULL, 'dd', '2024-06-01 20:05:52', 1),
(81, 1, NULL, 'fd', '2024-06-01 20:05:52', 1),
(82, 1, NULL, 'fg', '2024-06-01 20:05:53', 1),
(83, 1, NULL, 'fd', '2024-06-01 20:05:53', 1),
(84, 1, NULL, 'df', '2024-06-01 20:05:53', 1),
(85, 1, NULL, 'ds', '2024-06-01 20:06:07', 1),
(86, 1, NULL, 'ds', '2024-06-01 20:06:09', 1),
(87, 1, NULL, 'd', '2024-06-01 20:06:17', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `community_id` int(11) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `has_attachment` tinyint(1) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `author_id`, `community_id`, `content`, `has_attachment`, `created`) VALUES
(1, 1, NULL, '', 0, '0000-00-00 00:00:00'),
(2, 1, NULL, '', 0, '0000-00-00 00:00:00'),
(3, 1, NULL, '', 0, '0000-00-00 00:00:00'),
(4, 1, NULL, '', 0, '0000-00-00 00:00:00'),
(5, 1, NULL, '', 0, '0000-00-00 00:00:00'),
(6, 1, NULL, '', 0, '0000-00-00 00:00:00'),
(7, 1, NULL, '', 0, '0000-00-00 00:00:00'),
(8, 1, NULL, 'something', 0, '2023-09-20 17:56:51');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post_tags`
--

CREATE TABLE `post_tags` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_tags`
--

INSERT INTO `post_tags` (`id`, `post_id`, `tag_id`) VALUES
(1, 5, 1),
(2, 5, 2),
(3, 6, 1),
(4, 6, 2),
(5, 7, 1),
(6, 7, 2),
(7, 8, 1),
(8, 8, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(1, 'memes'),
(2, 'wallpaper');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nick` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `avatar` varchar(32) NOT NULL DEFAULT 'default_avatar.png',
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nick`, `email`, `avatar`, `password`) VALUES
(1, 'aearedo', 'aearedo@aearedo.pl', '1693824117422.jpg', '$2b$10$Iw4LUTl2qD0Smyd/f8e./.lzMWsib6Y6vt6Z2UO..izHj8WU7a4IO');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `community_features`
--
ALTER TABLE `community_features`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `community_members`
--
ALTER TABLE `community_members`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `channels`
--
ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `communities`
--
ALTER TABLE `communities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `community_features`
--
ALTER TABLE `community_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `community_members`
--
ALTER TABLE `community_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `post_tags`
--
ALTER TABLE `post_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
