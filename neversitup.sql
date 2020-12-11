/*
 Navicat Premium Data Transfer

 Source Server         : mariadb_local
 Source Server Type    : MariaDB
 Source Server Version : 100505
 Source Host           : localhost:3306
 Source Schema         : neversitup

 Target Server Type    : MariaDB
 Target Server Version : 100505
 File Encoding         : 65001

 Date: 11/12/2020 07:25:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `productId` int(11) NULL DEFAULT NULL,
  `receiptId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_88991860e839c6153a7ec878d39`(`productId`) USING BTREE,
  INDEX `FK_fb8ea7905b70de898a37c001b98`(`receiptId`) USING BTREE,
  CONSTRAINT `FK_88991860e839c6153a7ec878d39` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_fb8ea7905b70de898a37c001b98` FOREIGN KEY (`receiptId`) REFERENCES `receipt` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, 100, 7, 0, 1, 1, 1);
INSERT INTO `order` VALUES (2, 120, 5, 0, 1, 2, 1);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int(11) NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 'Product 0', 'Product 0 detail', 100, 'https://picsum.photos/200/300', 1);
INSERT INTO `product` VALUES (2, 'Product 1', 'Product 1 detail', 120, 'https://picsum.photos/200/300', 1);
INSERT INTO `product` VALUES (3, 'Product 4', 'Product 4 detail', 499, 'https://picsum.photos/200/300', 1);
INSERT INTO `product` VALUES (4, 'Product 5', 'Product 5 detail', 500, 'https://picsum.photos/200/300', 1);
INSERT INTO `product` VALUES (5, 'Product 6', 'Product 6 detail', 600, 'https://picsum.photos/200/300', 1);
INSERT INTO `product` VALUES (6, 'Product 2', 'Product 2 detail', 250, 'https://picsum.photos/200/300', 1);
INSERT INTO `product` VALUES (7, 'Product 3', 'Product 3 detail', 350, 'https://picsum.photos/200/300', 1);

-- ----------------------------
-- Table structure for receipt
-- ----------------------------
DROP TABLE IF EXISTS `receipt`;
CREATE TABLE `receipt`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createDate` timestamp(0) NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `userId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_e011d4704c491f4d821d7ebb6ca`(`userId`) USING BTREE,
  CONSTRAINT `FK_e011d4704c491f4d821d7ebb6ca` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of receipt
-- ----------------------------
INSERT INTO `receipt` VALUES (1, 'PR11607630673818', '2020-12-10 20:04:33', '1', 1, 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'my_username', 'dda8c3468860dcb24e228ab8ee44208d43eb2f5fd2a3a538bafbd39db4ff114c9829a64bd1a4710e0c021f8a4134b6a2f8b17eccc87ffe79d8459e2df294fb01', 'Myname', 'Mylastname', 1);

SET FOREIGN_KEY_CHECKS = 1;
