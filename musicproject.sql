/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : musicproject

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-05-05 18:25:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article_release`
-- ----------------------------
DROP TABLE IF EXISTS `article_release`;
CREATE TABLE `article_release` (
  `Article_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `Fixed_link` varchar(255) DEFAULT NULL,
  `Article_Status` varchar(255) DEFAULT NULL,
  `Degree_Openness` varchar(255) DEFAULT NULL,
  `Release_Time` varchar(255) DEFAULT NULL,
  `Article_Content` longtext,
  `Label` varchar(255) DEFAULT NULL,
  `Position` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Article_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_release
-- ----------------------------
INSERT INTO `article_release` VALUES ('11', 'http://localhost:8080/MusicWebProject/', '发布', 'Head menu', '2018-06-14 23:38:21', '                                                         啊\nasfas              0 \nasf\n\n\n\n\n啊啊啊', 'TRACKS', 'head');
INSERT INTO `article_release` VALUES ('12', 'http://localhost:8080/MusicWebProject/Article_Page/Article?article_name=RELEASES', '发布', 'Head menu', '2018-06-14 23:36:19', '<p style=\"color:red;\">啊师傅哈是放假哦评价i偶怕谁覅静安寺哦皮肤就</p>', 'RELEASES', 'head');
INSERT INTO `article_release` VALUES ('13', 'javascript:void(0)', '发布', 'Friendship link', '2018-06-13 12:05:05', 'http://localhost:8080/MusicWebProject/Controller/Go_BackstagePage?User_ID=13', 'CHARTS', 'tail');
INSERT INTO `article_release` VALUES ('14', 'http://localhost:8080/MusicWebProject/Controller/Go_BackstagePage?User_ID=13', '发布', 'COMPANY', '2018-06-14 23:39:41', 'http://localhost:8080/MusicWebProject/Controller/Go_BackstagePage?User_ID=13', 'STEMS', 'tail');
INSERT INTO `article_release` VALUES ('15', 'javascript:void(0)', '发布', 'NETWORK', '2018-06-13 12:04:52', 'http://localhost:8080/MusicWebProje\n           ct/Controller/Go_BackstagePage?User_ID=13', 'INFO', 'tail');
INSERT INTO `article_release` VALUES ('18', '2', '发布', null, '2018-06-14 23:39:52', '2', '2', 'head');
INSERT INTO `article_release` VALUES ('19', 'top100', '发布', null, '2019-02-21 15:31:40', '', 'TOP 100', 'head');

-- ----------------------------
-- Table structure for `download_info`
-- ----------------------------
DROP TABLE IF EXISTS `download_info`;
CREATE TABLE `download_info` (
  `Genre_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `User_ID` bigint(255) DEFAULT NULL,
  `Genre_Name` varchar(255) DEFAULT NULL,
  `All_DownloadNum` bigint(255) DEFAULT NULL,
  `Surplus_Number` bigint(255) DEFAULT '0',
  PRIMARY KEY (`Genre_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of download_info
-- ----------------------------
INSERT INTO `download_info` VALUES ('40', '13', '', '1', '4');
INSERT INTO `download_info` VALUES ('41', '10', 'DJ', '4', '1');
INSERT INTO `download_info` VALUES ('42', '13', '中国风', '1', '1009');
INSERT INTO `download_info` VALUES ('43', '11', '动漫', '4', '1008');
INSERT INTO `download_info` VALUES ('44', '3', 'DJ', '3', '3');
INSERT INTO `download_info` VALUES ('45', '3', '', '3', '17');
INSERT INTO `download_info` VALUES ('47', '3', '动漫', '3', '0');
INSERT INTO `download_info` VALUES ('72', '3', '中国风', '3', '17');
INSERT INTO `download_info` VALUES ('73', '3', '套曲', '3', '6');

-- ----------------------------
-- Table structure for `historical_download`
-- ----------------------------
DROP TABLE IF EXISTS `historical_download`;
CREATE TABLE `historical_download` (
  `Historical_DownloadID` bigint(255) NOT NULL AUTO_INCREMENT,
  `User_ID` bigint(255) DEFAULT NULL,
  `Song_ID` bigint(255) DEFAULT NULL,
  PRIMARY KEY (`Historical_DownloadID`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of historical_download
-- ----------------------------
INSERT INTO `historical_download` VALUES ('2', '13', '32');
INSERT INTO `historical_download` VALUES ('6', '13', '31');
INSERT INTO `historical_download` VALUES ('7', '13', '30');
INSERT INTO `historical_download` VALUES ('8', '13', '28');
INSERT INTO `historical_download` VALUES ('9', '13', '27');
INSERT INTO `historical_download` VALUES ('10', '13', '26');
INSERT INTO `historical_download` VALUES ('11', '13', '35');
INSERT INTO `historical_download` VALUES ('12', '13', '25');
INSERT INTO `historical_download` VALUES ('13', '13', '24');
INSERT INTO `historical_download` VALUES ('14', '13', '29');
INSERT INTO `historical_download` VALUES ('15', '13', '23');
INSERT INTO `historical_download` VALUES ('16', '13', '34');
INSERT INTO `historical_download` VALUES ('17', '13', '33');
INSERT INTO `historical_download` VALUES ('25', '13', '21');
INSERT INTO `historical_download` VALUES ('26', '13', '20');
INSERT INTO `historical_download` VALUES ('27', '13', '19');
INSERT INTO `historical_download` VALUES ('32', '17', '32');
INSERT INTO `historical_download` VALUES ('37', '3', '31');
INSERT INTO `historical_download` VALUES ('38', '3', '32');
INSERT INTO `historical_download` VALUES ('39', '3', '33');
INSERT INTO `historical_download` VALUES ('40', '3', '2');
INSERT INTO `historical_download` VALUES ('69', '3', '26');

-- ----------------------------
-- Table structure for `membership_order`
-- ----------------------------
DROP TABLE IF EXISTS `membership_order`;
CREATE TABLE `membership_order` (
  `Order_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `Order_Number` varchar(255) NOT NULL,
  `Quantity_of_goods` int(25) NOT NULL DEFAULT '1',
  `Order_Name` varchar(255) DEFAULT NULL,
  `Commodity_Description` varchar(255) DEFAULT NULL,
  `Alipay_Order_Id` varchar(255) DEFAULT NULL,
  `Order_Amount` int(255) NOT NULL,
  `Order_Status` varchar(255) DEFAULT NULL,
  `User_ID` bigint(255) NOT NULL,
  `PriceID` bigint(255) DEFAULT NULL,
  `Actual_payment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Order_ID`),
  UNIQUE KEY `Unique` (`Order_ID`,`Order_Number`,`Alipay_Order_Id`) USING BTREE,
  KEY `All` (`Quantity_of_goods`,`Order_Name`,`Commodity_Description`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of membership_order
-- ----------------------------
INSERT INTO `membership_order` VALUES ('20', '1527237365313U5998Tv1', '1', '音乐网包月会员', '开通包包月会员', '2018052521001004440200318684', '98', '已支付', '13', '1', '98');
INSERT INTO `membership_order` VALUES ('21', '152723753641855398st0', '1', '音乐网包月会员', '开通包包月会员', '2018052521001004440200319286', '98', '已支付', '13', '1', '98');
INSERT INTO `membership_order` VALUES ('23', '1527237608378G4G688535', '1', '音乐网包年会员', '开通包包年会员', '2018052521001004440200319287', '688', '已支付', '13', '4', '688');
INSERT INTO `membership_order` VALUES ('24', '1527237654080430688CfK', '1', '音乐网包年会员', '开通包包年会员', '2018052521001004440200318685', '688', '已支付', '13', '4', '688');
INSERT INTO `membership_order` VALUES ('25', '15272377116447176885k0', '1', '音乐网包年会员', '开通包包年会员', '2018052521001004440200318686', '688', '已支付', '13', '4', '688');
INSERT INTO `membership_order` VALUES ('28', '152734678563131798q92', '1', '音乐网包月会员', '开通包包月会员', '2018052621001004440200323014', '98', '已支付', '7', '1', '68');
INSERT INTO `membership_order` VALUES ('29', '1527346846196ve038870X', '1', '音乐网半年会员', '开通包半年会员', '2018052621001004440200322722', '388', '已支付', '12', '3', '388');
INSERT INTO `membership_order` VALUES ('31', '152740098629515R688FKW', '1', '音乐网包年会员', '开通包包年会员', '2018052721001004440200325556', '688', '已支付', '9', '4', '688');
INSERT INTO `membership_order` VALUES ('33', '1527401783620P88688360', '1', '音乐网包年会员', '开通包包年会员', '2018052721001004440200325770', '688', '已支付', '8', '4', '688');
INSERT INTO `membership_order` VALUES ('34', '1527469476610YV46887a0', '1', '音乐网包年会员', '开通包包年会员', '2018052821001004440200327280', '688', '已支付', '14', '4', '688');
INSERT INTO `membership_order` VALUES ('35', '1527479416974x6768807P', '1', '音乐网包年会员', '开通包包年会员', '2018052821001004440200328433', '688', '已支付', '9', '4', '688');
INSERT INTO `membership_order` VALUES ('38', '1528829931311K4o688R64', '1', '音乐网包年会员', '开通包包年会员', '2018061321001004440200386335', '688', '已支付', '13', '4', '688');
INSERT INTO `membership_order` VALUES ('40', '1528830641185Y02688795', '1', '音乐网包年会员', '开通包包年会员', '2018061321001004440200386337', '688', '已支付', '13', '4', '688');
INSERT INTO `membership_order` VALUES ('47', '15288500165295wQ98783', '1', '音乐网包月会员', '开通包包月会员', '', '98', '等待用户支付', '13', '1', '98');
INSERT INTO `membership_order` VALUES ('48', '1528850368585WC3987OQ', '1', '音乐网包月会员', '开通包包月会员', '2018061321001004440200385431', '98', '已支付', '13', '1', '98');
INSERT INTO `membership_order` VALUES ('49', '152885216633048Q688Oi2', '1', '音乐网包年会员', '开通包包年会员', '2018061321001004440200385432', '688', '已支付', '13', '4', '688.00');
INSERT INTO `membership_order` VALUES ('50', '1528852253569VN4688aE9', '1', '音乐网包年会员', '开通包包年会员', '2018061321001004440200385433', '688', '已支付', '17', '4', '688.00');
INSERT INTO `membership_order` VALUES ('51', '152937228303506F6889O7', '1', '音乐网包年会员', '开通包包年会员', '', '688', '等待用户支付', '1', '4', null);
INSERT INTO `membership_order` VALUES ('52', '1529372396518n8r688f42', '1', '音乐网包年会员', '开通包包年会员', '', '688', '等待用户支付', '1', '4', null);
INSERT INTO `membership_order` VALUES ('53', '15293725213145oB688x5y', '1', '音乐网包年会员', '开通包包年会员', '2018061921001004440200424078', '688', '已支付', '1', '4', '688.00');
INSERT INTO `membership_order` VALUES ('54', '1529372633273FVt688615', '1', '音乐网包年会员', '开通包包年会员', '2018061921001004440200424079', '688', '已支付', '3', '4', '688.00');
INSERT INTO `membership_order` VALUES ('55', '1529372735835445688W6s', '1', '音乐网包年会员', '开通包包年会员', '2018061921001004440200424080', '688', '已支付', '7', '4', '688.00');
INSERT INTO `membership_order` VALUES ('56', '1529374972434h3D6887wm', '1', '音乐网包年会员', '开通包包年会员', '2018061921001004440200418785', '688', '已支付', '16', '4', '688.00');
INSERT INTO `membership_order` VALUES ('58', '1530443454793JM2689A51', '1', '音乐网包年会员', '开通包包年会员', '', '689', '等待用户支付', '3', '3', null);
INSERT INTO `membership_order` VALUES ('59', '15504565144566o5689h60', '1', '音乐网包年会员', '开通包包年会员', '', '689', '等待用户支付', '3', '3', null);
INSERT INTO `membership_order` VALUES ('60', '1550738266119eGa98573', '1', '音乐网包月会员', '开通包包月会员', '', '98', '等待用户支付', '3', '1', null);
INSERT INTO `membership_order` VALUES ('61', '1557050925304N829891i', '1', '音乐网包月会员', '开通包包月会员', '', '98', '等待用户支付', '3', '1', null);

-- ----------------------------
-- Table structure for `membership_price`
-- ----------------------------
DROP TABLE IF EXISTS `membership_price`;
CREATE TABLE `membership_price` (
  `Price_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `Membership_Name` varchar(255) DEFAULT NULL,
  `Membership_Price` int(255) DEFAULT NULL,
  `Membership_Date` varchar(255) DEFAULT NULL,
  `Membership_Days` varchar(255) DEFAULT NULL,
  `Downloads` bigint(255) DEFAULT '1000' COMMENT '下载量',
  PRIMARY KEY (`Price_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of membership_price
-- ----------------------------
INSERT INTO `membership_price` VALUES ('1', '包月', '98', '1个月', '30', '1009');
INSERT INTO `membership_price` VALUES ('2', '包季', '198', '3个月', '90', '1003');
INSERT INTO `membership_price` VALUES ('3', '包年', '689', '12个月', '365', '1005');

-- ----------------------------
-- Table structure for `member_info`
-- ----------------------------
DROP TABLE IF EXISTS `member_info`;
CREATE TABLE `member_info` (
  `Member_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `User_ID` bigint(255) DEFAULT NULL,
  `Opening_Time` varchar(255) DEFAULT NULL,
  `Expiry_Time` varchar(255) DEFAULT NULL,
  `Member_Type` varchar(255) DEFAULT NULL,
  `Member_DownloadID` bigint(255) DEFAULT NULL,
  PRIMARY KEY (`Member_ID`),
  UNIQUE KEY `MemberUnique` (`Member_ID`,`User_ID`),
  KEY `ALL` (`Opening_Time`,`Expiry_Time`,`Member_Type`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member_info
-- ----------------------------
INSERT INTO `member_info` VALUES ('6', '12', '2018-05-26 11:01:10', '2018-06-25 11:01:10', '包月会员生效中', null);
INSERT INTO `member_info` VALUES ('8', '8', '2018-05-27 02:16:59', '2019-05-27 02:16:59', '包年会员生效中', null);
INSERT INTO `member_info` VALUES ('11', '17', '2018-06-13 09:11:16', '2019-06-13 09:11:16', '包年会员生效中', null);
INSERT INTO `member_info` VALUES ('12', '1', '2018-06-19 09:42:23', '2020-06-18 09:42:23', '包年会员生效中', null);
INSERT INTO `member_info` VALUES ('28', '3', '2018-05-26 11:01:10', '2019-05-26 11:01:10', '包年会员生效中', null);

-- ----------------------------
-- Table structure for `setting`
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `Setting_ID` int(25) NOT NULL AUTO_INCREMENT,
  `IsLandingAuditions` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`Setting_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of setting
-- ----------------------------

-- ----------------------------
-- Table structure for `song_info`
-- ----------------------------
DROP TABLE IF EXISTS `song_info`;
CREATE TABLE `song_info` (
  `Song_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `Song_Name` varchar(1000) DEFAULT NULL,
  `Song_Artists` varchar(1000) DEFAULT NULL,
  `Song_Label` varchar(1000) DEFAULT NULL,
  `Song_Genre` varchar(1000) DEFAULT '',
  `Song_ReleasedTime` varchar(1000) DEFAULT NULL,
  `Song_Type` varchar(1000) DEFAULT NULL,
  `Song_AuditionAddress` varchar(1000) DEFAULT NULL,
  `Song_DownloadAddress` varchar(1000) DEFAULT NULL,
  `Song_Imge` varchar(1000) DEFAULT NULL,
  `download_count` int(255) unsigned NOT NULL DEFAULT '0' COMMENT '歌曲的下载量',
  PRIMARY KEY (`Song_ID`),
  UNIQUE KEY `Song_ID` (`Song_ID`),
  UNIQUE KEY `Song_Address` (`Song_AuditionAddress`),
  UNIQUE KEY `Song_Download` (`Song_DownloadAddress`),
  KEY `Song_Name` (`Song_Name`),
  KEY `Song_Artists` (`Song_Artists`),
  KEY `Song_Label` (`Song_Label`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of song_info
-- ----------------------------
INSERT INTO `song_info` VALUES ('24', '哼', '冯提莫', '哼', 'Big Room', '2018-5-14 19:22:35', 'Promo', '/MusicFile/Auditions/哼.m4a', '/MusicFile/Auditions/哼.m4a', 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=4a639e9b7a094b36cf9f13bfc2a517bc/80cb39dbb6fd5266abd85c50a718972bd5073686.jpg', '3');
INSERT INTO `song_info` VALUES ('25', '七月上', 'Jam', null, '', '2018-6-04 10:44:54', 'Promo', '/MusicFile/Auditions/July.m4a', '/MusicFile/Auditions/July.m4a', 'https://y.gtimg.cn/music/photo_new/T001R300x300M0000023ni2j3F9CpN.jpg', '3');
INSERT INTO `song_info` VALUES ('26', 'BINGBIAN病变', '鞠文娴', 'BINGBIAN病变（女声版）', '', '2018-6-04 10:47:39', '123', '/MusicFile/Auditions/BINGBIAN病变.m4a', '/MusicFile/Auditions/BINGBIAN病变.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000zFECL2iqwch.jpg', '4');
INSERT INTO `song_info` VALUES ('27', '逆流成河', '金南玲', '来生', '', '2018-6-04 10:50:44', '123', '/MusicFile/Auditions/逆流成河.m4a', '/MusicFile/Auditions/逆流成河.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002HvsDN3KTdRX.jpg', '3');
INSERT INTO `song_info` VALUES ('28', '突然的自我', '伍佰/China Blue', '忘情1015精选辑', '', '2018-6-04 10:55:16', 'Exclusive', '/MusicFile/Auditions/突然的自我.m4a', '/MusicFile/Auditions/突然的自我.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004JF1BR18UKuH.jpg', '3');
INSERT INTO `song_info` VALUES ('29', '左手右手', '杨沛宜', '喜羊羊与灰太狼之虎虎生威 动画电影原声带', '', '2018-6-04 10:56:57', null, '/MusicFile/Auditions/左手右手.m4a', '/MusicFile/Auditions/左手右手.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002eIBob2CyY41.jpg', '3');
INSERT INTO `song_info` VALUES ('30', '水手', '郑智化', '私房歌', '', '2018-6-05 08:50:15', null, '/MusicFile/Auditions/水手.m4a', '/MusicFile/Auditions/水手.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002uGyPT1oYzxV.jpg', '3');
INSERT INTO `song_info` VALUES ('31', '皇冠一刻钟', '7妹', '77李思琦', '', '2018-6-05 09:05:36', null, '/MusicFile/Auditions/皇冠一刻钟.m4a', '/MusicFile/Auditions/皇冠一刻钟.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Q7Uyx2C3S2e.jpg', '4');
INSERT INTO `song_info` VALUES ('32', '别看我只是一只羊', '古倩敏/杨沛宜', '喜羊羊与灰太狼 动漫原声带', '套曲', '2018-6-05 09:31:32', null, '/MusicFile/Auditions/别看我只是一只羊.m4a', '/MusicFile/Auditions/别看我只是一只羊.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000040kDlQ3BBJ66.jpg', '11');
INSERT INTO `song_info` VALUES ('33', '凉凉', '杨宗纬/张碧晨', '三生三世十里桃花 电视剧原声带', '中国风', '2018', null, '/MusicFile/Auditions/凉凉.m4a', '/MusicFile/Auditions/凉凉.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000011IIJE3XYf9L.jpg', '5');
INSERT INTO `song_info` VALUES ('34', '金达莱花', '安浩辰', '还有梦想', 'DJ', '2017', null, '/MusicFile/Auditions/金达莱花.m4a', '/MusicFile/Auditions/金达莱花.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003WkDqt0nVE0r.jpg', '1');
INSERT INTO `song_info` VALUES ('35', '짜라빠빠', 'YJ Family', '참 좋은 최신 유아동요 베스트 80', '', '2018', null, '/MusicFile/Auditions/132.mp3', 'https://novel-file-1255518771.cos.ap-shanghai.myqcloud.com/Auditions/July.m4a', 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003GoRXz4PuNvc.jpg', '1');

-- ----------------------------
-- Table structure for `token`
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token` (
  `Token_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `User_ID` bigint(255) NOT NULL,
  `Token_Value` varchar(255) NOT NULL,
  `TokenExpireIn_Time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Token_ID`),
  UNIQUE KEY `All` (`User_ID`,`Token_Value`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of token
-- ----------------------------
INSERT INTO `token` VALUES ('13', '13', '217af2514f3c0023f08177dc8c004d14', '2018061910');
INSERT INTO `token` VALUES ('14', '15', '8f6c310c489be485add6745426759163', '2018061023');
INSERT INTO `token` VALUES ('15', '16', 'a454c40e35df3735300846645b50d635', '2018061912');
INSERT INTO `token` VALUES ('16', '9', '469e4dbd1b55c4937c893dc4537e7a26', '2018063020');
INSERT INTO `token` VALUES ('17', '17', '3213a1c39f58a64c081213bd3a3e65df', '2018061314');
INSERT INTO `token` VALUES ('18', '1', 'bc731debe952378b4f5c2c64fdc2aa71', '2018061911');
INSERT INTO `token` VALUES ('19', '3', 'fae57ddbb841967f0317ff23ed29d1be', '2019050520');
INSERT INTO `token` VALUES ('20', '7', '6e1f7319d1ce00a1441e02e2f445c90c', '2018061911');
INSERT INTO `token` VALUES ('21', '18', 'dfee288aa93472c291e57eff22ab9b76', '2018061912');

-- ----------------------------
-- Table structure for `user_collection`
-- ----------------------------
DROP TABLE IF EXISTS `user_collection`;
CREATE TABLE `user_collection` (
  `Collection_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `User_ID` bigint(255) DEFAULT NULL,
  `Song_ID` bigint(255) DEFAULT NULL,
  PRIMARY KEY (`Collection_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_collection
-- ----------------------------
INSERT INTO `user_collection` VALUES ('1', '1', '2');
INSERT INTO `user_collection` VALUES ('29', '16', '31');
INSERT INTO `user_collection` VALUES ('67', '3', '32');

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `User_ID` bigint(255) NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(255) DEFAULT NULL,
  `User_Password` varchar(255) DEFAULT NULL,
  `User_Image` varchar(1000) DEFAULT NULL,
  `User_Sex` varchar(255) DEFAULT '',
  `User_Job` varchar(255) DEFAULT NULL,
  `Is_Administrators` varchar(10) DEFAULT '',
  `User_Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_ID` (`User_ID`),
  UNIQUE KEY `User_Name` (`User_Name`),
  UNIQUE KEY `User_Email` (`User_Email`),
  KEY `User_Password` (`User_Password`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('3', 'zuidaima', '111111111', '/MusicFile/UserImg/3/7d187i99m32.jpg', '男', '开发者', 'Y', '1224073217@qq.com');
