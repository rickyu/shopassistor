#encoding:utf-8
from shoplist.utils.mysql_agent import MysqlAgent
import hashlib

def md5sum(s):
    m = hashlib.md5()
    m.update(s)
    digest = m.digest()
    news = ''
    for a in digest:
        intval = ord(a)
        news += '%02X' % (intval)
    return news
class UserModel(object):
    __DB = 'shoplist'
    def __init__(self, db):
        self.db = db
    def create_user(self, user_info):
        """
        创建一个新用户
        @param user_info dict, user_info的属性值.
        @return 新创建的用户.
        """
        #检查user_info的有效性.
        sql = 'INSERT INTO user(email, nickname, password)'
        sql += ' VALUES("%s", "%s", "%s")' % (
                user_info['email'], user_info['nickname'], user_info['passwd'])
        lastid = self.db.write(UserModel.__DB, sql)
        user_info['userid'] =  lastid
        return user_info

    def query_user(self, keyname, keyvalue, fields):
        if keyname == 'userid':
            str_key = '%d' % (keyvalue)
        else:
            str_key = '"' + keyvalue + '"'
        sql = 'SELECT %s FROM user WHERE %s=%s' % (','.join(fields),
                keyname, str_key)
        res = self.db.query(UserModel.__DB, sql)
        if len(res) == 1:
            return res[0]
        else:
            return None


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
    user_model = UserModel(db)
    user = user_model.query_user('userid', 10, ['nickname', 'password']) 
    print user['nickname']
    user = {}
    user = user_model.query_user('email', 'abc@s.com', ['nickname', 'password']) 
    print user

