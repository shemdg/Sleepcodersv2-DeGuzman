-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Oct 09, 2024 at 03:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ias2`
--

-- --------------------------------------------------------

--
-- Table structure for table `attempt_logs`
--

CREATE TABLE `attempt_logs` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `browser_info` text NOT NULL,
  `attempt_count` int(11) NOT NULL,
  `time_restriction` datetime DEFAULT NULL,
  `locked` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attempt_logs`
--

INSERT INTO `attempt_logs` (`id`, `ip_address`, `browser_info`, `attempt_count`, `time_restriction`, `locked`, `createdAt`, `updatedAt`) VALUES
(1, '112.200.238.187', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0', 1, NULL, 0, '2024-10-09 13:33:46', '2024-10-09 13:33:46'),
(2, '112.200.238.187', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 5, '2024-10-09 13:38:38', 1, '2024-10-09 13:34:46', '2024-10-09 13:37:38');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `imghref` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL,
  `time` varchar(100) DEFAULT NULL,
  `member` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `imghref`, `date`, `time`, `member`, `address`) VALUES
(1, 'Sayawan with Bini Maloi', 'Loremqweqweqweqweqweqweqw ewqeqweqweqw ewqeqweqweqw eqwe', 'https://logos-world.net/wp-content/uploads/2022/05/SM-Mall-of-Asia-Logo.png', '2024-10-02 00:00:00', '9:00 am to 3:00 pm', 'Bini Maloi', 'BLK 15 LT 3 Banda Rito, Banda Roon ST. Catmon, Malabon City.'),
(2, 'Paalaga kay Stacey', 'WHWAHAWHAWHA MAY SALTIK', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Valenzuela_People%27s_Park%2C_Mar_2024.jpg/1200px-Valenzuela_People%27s_Park%2C_Mar_2024.jpg', '2024-10-03 00:00:00', '9:00 am to 3:00 pm', 'Bini Stacey', 'Peoples Park MacArthur Hwy, Valenzuela, Metro Manila'),
(3, 'Sayawan with Bini Maloi', 'Loremqweqweqweqweqweqweqw ewqeqweqweqw ewqeqweqweqw eqwe', 'https://logos-world.net/wp-content/uploads/2022/05/SM-Mall-of-Asia-Logo.png', '2024-10-02 00:00:00', '9:00 am to 3:00 pm', 'Bini Maloi', 'BLK 15 LT 3 Banda Rito, Banda Roon ST. Catmon, Malabon City.');

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `id` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `browser_info` varchar(255) DEFAULT NULL,
  `verify` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`id`, `session_id`, `user_id`, `ip_address`, `browser_info`, `verify`, `createdAt`, `updatedAt`) VALUES
(1, '0LXcNqzwZHWsfJpcCVxkNq66noOZzUUb', 1, '112.200.238.187', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0', 1, '2024-10-09 13:33:46', '2024-10-09 13:33:46');

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `valid_code` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `expiresAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `valid_code`, `mail`, `createdAt`, `expiresAt`) VALUES
(1, '577530', 'melcoschool@gmail.com', '2024-10-09 13:34:46', '2024-10-09 13:37:46');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(32) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('0LXcNqzwZHWsfJpcCVxkNq66noOZzUUb', '2024-10-09 14:33:46', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-10-09T14:33:46.285Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1},\"expires\":\"2024-10-09T14:33:46.285Z\"}', '2024-10-09 13:33:46', '2024-10-09 13:33:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'Unique identifier for each user',
  `username` varchar(255) NOT NULL COMMENT 'Username for user authentication',
  `password` varchar(255) NOT NULL COMMENT 'Password for user authentication',
  `email` varchar(255) NOT NULL COMMENT 'Email address for user communication',
  `name` varchar(255) NOT NULL COMMENT 'Full name of the user',
  `profileImage` varchar(255) DEFAULT NULL COMMENT 'File name of the profile picture',
  `status` varchar(255) NOT NULL COMMENT 'Current status of the user (e.g., active, inactive)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `name`, `profileImage`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'gwen', '123', 'melcoschool@gmail.com', 'Gwen', 'profile1.jpg', 'active', '2024-10-09 13:16:42', '2024-10-09 13:16:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attempt_logs`
--
ALTER TABLE `attempt_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `otp_valid_code` (`valid_code`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attempt_logs`
--
ALTER TABLE `attempt_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for each user', AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
