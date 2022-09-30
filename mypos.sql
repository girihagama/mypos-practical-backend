-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2022 at 08:24 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mypos`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice_details`
--

CREATE TABLE `invoice_details` (
  `Invoice_Details_Id` int(11) NOT NULL,
  `Invoice_Details_qty` int(11) NOT NULL,
  `Invoice_Details_Amount` double NOT NULL,
  `Invoice_Hed_Invoice_Hed_id` int(11) NOT NULL,
  `Products_Products_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice_details`
--

INSERT INTO `invoice_details` (`Invoice_Details_Id`, `Invoice_Details_qty`, `Invoice_Details_Amount`, `Invoice_Hed_Invoice_Hed_id`, `Products_Products_id`) VALUES
(20, 1, 545.5, 55, 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_hed`
--

CREATE TABLE `invoice_hed` (
  `Invoice_Hed_id` int(11) NOT NULL,
  `Invoice_Hed_Date` datetime NOT NULL DEFAULT current_timestamp(),
  `Invoice_Hed_Amount` double NOT NULL DEFAULT 0,
  `Invoice_Hed_customer` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice_hed`
--

INSERT INTO `invoice_hed` (`Invoice_Hed_id`, `Invoice_Hed_Date`, `Invoice_Hed_Amount`, `Invoice_Hed_customer`) VALUES
(1, '2022-09-28 13:01:48', 2750.25, 'Danushka'),
(2, '2022-09-29 08:20:04', 3750, 'Indunil'),
(3, '2022-09-27 08:20:04', 7378.5, 'Thilina'),
(55, '2022-09-30 07:34:45', 545.5, 'test'),
(324, '2022-09-30 07:17:14', 345, 'Hello'),
(546, '2022-09-30 07:32:34', 650, 'sad'),
(3242, '2022-09-30 07:27:10', 3995.5, 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Products_id` int(11) NOT NULL,
  `Products_Name` varchar(45) NOT NULL,
  `Products_price` double NOT NULL,
  `Products_qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Products_id`, `Products_Name`, `Products_price`, `Products_qty`) VALUES
(1, 'Sun Light 55G', 125.55, 30),
(2, 'Viva 400g', 545.5, 20),
(3, 'Comfort 500ml', 1275, 23),
(5, 'Ceylonta 500g', 650, 55),
(333, 'Araliya Sugar 1kg Pack', 345, 26);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`Invoice_Details_Id`),
  ADD KEY `Invoice_Hed_Invoice_Hed_id` (`Invoice_Hed_Invoice_Hed_id`),
  ADD KEY `Products_Products_id` (`Products_Products_id`),
  ADD KEY `Invoice_Hed_Invoice_Hed_id_2` (`Invoice_Hed_Invoice_Hed_id`),
  ADD KEY `Products_Products_id_2` (`Products_Products_id`);

--
-- Indexes for table `invoice_hed`
--
ALTER TABLE `invoice_hed`
  ADD PRIMARY KEY (`Invoice_Hed_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Products_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `Invoice_Details_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD CONSTRAINT `Invoice_HedLink` FOREIGN KEY (`Invoice_Hed_Invoice_Hed_id`) REFERENCES `invoice_hed` (`Invoice_Hed_id`),
  ADD CONSTRAINT `productLink` FOREIGN KEY (`Products_Products_id`) REFERENCES `products` (`Products_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
