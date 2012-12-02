#encoding:utf-8

class UserModel:
    def __init__(self, dbproxy):
        self.dbproxy = dbproxy
    def register(self, user_info):
        """
        查询用户名是否存在.
        """
        if self.is_username_exist(user_info['username']):
            raise 1
        uid = self.create_user(user_info)

    def is_username_exist(self, username):
        res = self.dbproxy.query('user',
                'select username, userid from user where username=%s' % (username))
        if len(res) >= 1:
            return true
        return false
    def create_user(self, user_info):
        self.dbproxy.insert('user',
                """insert into user(username, email, passwd) values(%d, %s, %s, %s)"""
                % (user_info['username'], user_info['email'], user_info['passwd']))
        pass
        
