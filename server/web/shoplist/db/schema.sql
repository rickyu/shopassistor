CREATE TABLE IF NOT EXISTS `user` (
	  `userid` int NOT NULL AUTO_INCREMENT COMMENT 'user id ',
	  `email` char(32) NOT NULL COMMENT 'email address',
	  `nickname` char(64) NOT NULL COMMENT 'nickname：display name',
	  `password` char(32) NOT NULL COMMENT 'password',
	  `regist_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'regist time',
	  `login_times` int NOT NULL DEFAULT '1' COMMENT '用户登录次数',
	  PRIMARY KEY (`userid`),
	  UNIQUE KEY `nickname` (`nickname`),
	  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_watchlist` (
	  `userid` INTEGER NOT NULL COMMENT '用户id',
	  `goodsid` INTEGER UNSIGNED NOT NULL COMMENT '商品id',
	  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
	  `notify` TINYINT DEFAULT 0 COMMENT ' 通知类型, 0 价格低于',
	  `notify_param` VARCHAR(128) COMMENT '通知的参数,比如价格小于，这里存的就是价格',
	  PRIMARY KEY (`userid`, `goodsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `goods` (
	  `goodsid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id',
	  `urlhash` BIGINT UNSIGNED NOT NULL COMMENT 'urlhash,fnv1a算法',
	  `url` varchar(2048) NOT NULL COMMENT '商品url',
	  `price` FLOAT NOT NULL COMMENT '当前价格',
	  `currency` SMALLINT DEFAULT 0 COMMENT '价格货币，0表示人民币', 
	  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	  `title` VARCHAR(128) NOT NULL COMMENT '标题',
	  `brand` VARCHAR(32) NOT NULL COMMENT '品牌',
	  `picurl` VARCHAR(1024) NOT NULL COMMENT '图片url',
	  PRIMARY KEY (`goodsid`),
	  KEY `urlhash` (`urlhash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `goods_price_history` (
	  `goodsid` INTEGER UNSIGNED NOT NULL COMMENT '商品id',
	  `updatetime` TIMESTAMP NOT NULL COMMENT '价格更新时间',
	  `price` FLOAT NOT NULL COMMENT '价格',
	  PRIMARY KEY (`goodsid`, `updatetime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
