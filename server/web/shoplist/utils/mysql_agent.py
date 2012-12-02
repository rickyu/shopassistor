#coding=utf8
import MySQLdb
class Row(dict):
    def __getitem__(self, name):
        return self[name]
    def __setitem__(self, name, val):
        self[name] = val

class MysqlAgent(object):
    def __init__(self, config):
        self.connections = {}
        self.config = config 
        
    def __get_connection(self, dbname, master = False):
        str = 'slave'
        if master:
            str = 'master'
        if self.connections.has_key(dbname) and self.connections[dbname].has_key(str):
            return self.connections[dbname][str]['cursor']
        
        self.connections[dbname]  = {}
        self.connections[dbname][str] = {}
        dbinfo = self.config[dbname][str]
        self.connections[dbname][str]['conn'] = MySQLdb.connect(
                    host = dbinfo['host'], 
                    user = dbinfo['user'], 
                    passwd = dbinfo['passwd'], 
                    db = dbname,
                    port = dbinfo['port'], 
                    charset = 'utf8')
        #except MySQLdb.Error,e:    
        self.connections[dbname][str]['cursor'] = self.connections[dbname][str]['conn'].cursor(MySQLdb.cursors.DictCursor)
        self.connections[dbname][str]['cursor'].execute("set names 'utf8'")
        return self.connections[dbname][str]['cursor']

    def query(self, db, sql):
        cursor_slave = self.__get_connection(db, False)
        cursor_slave.execute(sql)
        res = cursor_slave.fetchall()
        return res

    def write(self, db, sql):
        cursor_master = self.__get_connection(db, True)
        cursor_master.execute(sql)
        self.connections[db]['master']['conn'].commit()
        return cursor_master.lastrowid
def test():
    print 'hhh'
    config = {'dolphin':{'master':{'host': '192.168.1.198', 'user': 'dolphin', 'passwd':'dolphin', 'port':3306},
                    'slave': {'host': '172.16.0.131', 'user': 'dbreader', 'passwd':'wearefashions','port':3306}}}
    mysql = MysqlAgent(config)
    res = mysql.read('dolphin',
                            "select max(goods_id) as max_gid from t_dolphin_goods_stat")
    id_max = res[0]['max_gid']
    #res = mysql.read('whale', """
     #        select t0.group_id, t0.group_id group_id, t0.name, if(t3.count, count,0) count
      #       from t_whale_topic_group t0 left join (select t1.group_id group_id, name, count(*)
       #      count from t_whale_topic_group t1 , t_whale_topic_group_twitter t2
        #     where t1.group_id = t2.group_id and have_picture=1 and show_type = 0
         #    and t1.group_id>=0 and t1.group_id<=1000 group by t1.group_id ) t3 
          #   on t3.group_id=t0.group_id where t0.group_id>=0 and t0.group_id<=1000""")
    print 'dfs'
    print id_max
    #print res2

if __name__ == '__main__':
    test()
