-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2024 at 07:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `blouse`
--

CREATE TABLE `blouse` (
  `customer_id` int(11) DEFAULT NULL,
  `length` float DEFAULT NULL,
  `chest` float DEFAULT NULL,
  `shoulder_finish` float DEFAULT NULL,
  `sleeve_length` float DEFAULT NULL,
  `sleeve_round` float DEFAULT NULL,
  `middle_hand_round` float DEFAULT NULL,
  `front_neck_height` float DEFAULT NULL,
  `back_neck_round` float DEFAULT NULL,
  `waist_loose` float DEFAULT NULL,
  `front_dart_point` float DEFAULT NULL,
  `full_shoulder` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chudi`
--

CREATE TABLE `chudi` (
  `customer_id` int(11) DEFAULT NULL,
  `height` float DEFAULT NULL,
  `front_point_center` float DEFAULT NULL,
  `body_loose` float DEFAULT NULL,
  `hip_loose` float DEFAULT NULL,
  `first_low_hip_height` float DEFAULT NULL,
  `first_low_hip_loose` float DEFAULT NULL,
  `bottom_open_from_top` float DEFAULT NULL,
  `second_low_hip_loose` float DEFAULT NULL,
  `front_neck_height` float DEFAULT NULL,
  `back_neck_height` float DEFAULT NULL,
  `hand_height` float DEFAULT NULL,
  `middle_hand_loose` float DEFAULT NULL,
  `pant_height` float DEFAULT NULL,
  `seat_loose` float DEFAULT NULL,
  `bottom_loose` float DEFAULT NULL,
  `body_to_knee_height` float DEFAULT NULL,
  `knee_loose` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dressbooking`
--

CREATE TABLE `dressbooking` (
  `customer_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `dress_type` enum('blouse','chudi') DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `paid` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dressbooking`
--

INSERT INTO `dressbooking` (`customer_id`, `order_id`, `dress_type`, `booking_date`, `deadline`, `description`, `price`, `paid`) VALUES
(NULL, 8, 'chudi', '2024-05-03', '2024-05-04', '', 0.00, 600.00),
(NULL, 9, 'blouse', '0000-00-00', '0000-00-00', '', 0.00, 0.00),
(NULL, 10, 'blouse', '0000-00-00', '0000-00-00', '', 0.00, 0.00),
(NULL, 11, 'blouse', '0000-00-00', '0000-00-00', '', 0.00, 0.00),
(NULL, 12, 'chudi', '0000-00-00', '0000-00-00', '', 0.00, 0.00),
(NULL, 13, 'chudi', '0000-00-00', '0000-00-00', '', 0.00, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('', '$2b$10$h9bDhidV4ujZ.BcHEvytQ.NWLpcWmaq6EKVqCGVEJ/Geu8RUB0Dkm'),
('priya', '$2b$10$qhFMWePKP0b9jbY89MUIm.Td33aZGtWB9oD20n2G.KHlzM9FPz0b.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blouse`
--
ALTER TABLE `blouse`
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `chudi`
--
ALTER TABLE `chudi`
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `dressbooking`
--
ALTER TABLE `dressbooking`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `dressbooking`
--
ALTER TABLE `dressbooking`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blouse`
--
ALTER TABLE `blouse`
  ADD CONSTRAINT `blouse_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `chudi`
--
ALTER TABLE `chudi`
  ADD CONSTRAINT `chudi_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `dressbooking`
--
ALTER TABLE `dressbooking`
  ADD CONSTRAINT `dressbooking_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
