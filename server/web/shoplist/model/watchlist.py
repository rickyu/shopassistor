#coding:utf-8
from shoplist.utils.mysql_agent import MysqlAgent
import hashlib

class WatchListModel(object):
    __DB = 'shoplist'
    def __init__(self, db):
        self.db = db
    def add_watch(self, data):
        """
         data是一个row对象
        """

        #检查user_info的有效性.
        sql = 'INSERT INTO user_watchlist(userid, goodsid, notify, notify_param)'
        sql += ' VALUES(%d, %d, %d, "%s") ON DUPLICATE KEY UPDATE notify=%d, notify_param="%s"' % (
                data.userid, data.goodsid, data.notify, data.notify_param, data.notify, data.notify_param)
        self.db.write(WatchListModel.__DB, sql)

    def del_watch(self, userid, goodsid):
        sql = 'DELETE FROM user_watchlist where userid=%d and goodsid=%d' % (
                userid, goodsid)
        res = self.db.write(WatchListModel.__DB, sql)

    def get_goods(self, userid):
        sql = 'SELECT goodsid, create_time, notify, notify_param FROM user_watchlist WHERE userid=%d' % (
                userid)
        res = self.db.query(WatchListModel.__DB, sql)
        return res

    def get_user(self, goodsid):
        sql = 'SELECT userid, create_time, notify, notify_param FROM user_watchlist WHERE goodsid=%d' % (
                goodsid)
        res = self.db.query(WatchListModel.__DB, sql)
        return res


if __name__ == '__main__':
    import sys
    sys.path.append('.')
    from utils.mysql_agent import MysqlAgent
    config = {'shoplist' : {
        'master': {'host':'192.168.56.101', 'user':'rick', 'passwd':'123456', 'port':3306},
        'slave': {'host':'192.168.56.101', 'user':'rick', 'passwd':'123456', 'port':3306},
         }
        }
    db = MysqlAgent(config)
    user_model = Model(db)
    user = user_model.query_user('userid', 10, ['nickname', 'password']) 
    print user['nickname']
    user = {}
    user = user_model.query_user('email', 'abc@s.com', ['nickname', 'password']) 
    print user

