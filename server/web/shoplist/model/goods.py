#coding:utf-8
import hashlib
import json
import urllib
from shoplist.utils.http import http_query


def fnv1a(s):
    prime = 0x01000193
    h = 0x811c9dc5
    for c in s:
        h ^= ord(c)
        h = (h * prime) & 0xffffffff
    return h
def fnv1a64(s):
    return 123
_GoodsModel__DB = 'shoplist'
class GoodsModel(object):
    def __init__(self, db):
        self.db = db
    def query_goods_byid(self, goodsids, fields):
        """
        """
        if not goodsids:
            return []
        sql = 'SELECT %s FROM goods WHERE goodsid IN (%s)' % (
                ','.join(fields), ','.join([str(k) for k in goodsids]))
        res = self.db.query(__DB, sql)
        return res
    def query_goods_byurl(self, url, fields):
        urlhash = fnv1a(url)
        sql = 'SELECT %s FROM goods WHERE urlhash=%d' % (
            ','.join(fields), urlhash)
        results = self.db.query(__DB, sql)
        if results is None:
            return None
        ret = []
        for row in results:
            if row['url'] == url:
                ret.append(row)
        return ret


    def grab_goods(self, url):
        params = urllib.urlencode({'url':url})
        http_resp = http_query('http://127.0.0.1:2000/goods/grab?'+params, 5000)
        return json.loads(http_resp['body'])
    def add_goods(self, url):
        res = self.query_goods_byurl(url, ['goodsid', 'url', 'urlhash',
            'price', 'currency', 'title', 'brand', 'picurl'])
        if res:
            return res
        urlhash = fnv1a(url)
        grab_result = self.grab_goods(url)
        if grab_result['code'] != 0:
            raise Exception('fail to grab')
        goods = grab_result['goods']
        price = goods.get('price', 0.0)
        currency = 0
        title = goods.get('title', '')
        brand = ''
        picurl = goods.get('image', '')
        sql = 'INSERT INTO goods(urlhash, url, price, currency, title, brand, picurl) \
               VALUES(%d, "%s", %f, %d, "%s", "%s", "%s")' % (
                urlhash, url, price, currency, title, brand, picurl)
        lastid = self.db.write(__DB, sql)
        goods = {'goodsid':lastid, 'url':url, 'urlhash':urlhash, 'price':price,
                'currency': currency, 'title':title, 'brand':brand, 'picurl':picurl}
        return [goods]


if __name__ == '__main__':
    import sys
    import os
    path = os.path.dirname(os.path.abspath(__file__))+'/../'
    print path
    sys.path.append(path)
    from utils.mysql_agent import MysqlAgent
    config = {'shoplist' : {
        'master': {'host':'192.168.56.101', 'user':'rick', 'passwd':'123456', 'port':3306},
        'slave': {'host':'192.168.56.101', 'user':'rick', 'passwd':'123456', 'port':3306},
         }
        }
    db = MysqlAgent(config)
    goods_model = GoodsModel(db)
    goods = goods_model.grab_goods('http://www.gap.cn/baby-boy/toddler-boys/partytime-favorites/000773103.html?color=3297')
    print goods
    goods = goods_model.query_goods_byid([1,2], ['goodsid', 'url', 'urlhash']) 
    print goods

