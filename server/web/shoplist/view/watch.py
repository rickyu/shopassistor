#coding:utf-8
import time
from shoplist import app
from flask import render_template, request, session, jsonify

from shoplist.model.user import UserModel
from shoplist.model.goods import GoodsModel
from shoplist.model.watchlist import WatchListModel
from shoplist.utils.mysql_agent import Row

@app.route('/addwatch')
def addwatch():
    if not 'uid' in session:
        return jsonify(code=1)
    goodsid = int(request.args['goodsid'])
    watchprice = float(request.args['watchprice'])
    watchlist = WatchListModel(app.config['MYSQL_AGENT'])
    watch = Row()
    watch.userid = int(session['uid'])
    watch.goodsid = goodsid
    watch.notify = 1
    watch.notify_param = 'price:%f' % (watchprice)
    watchlist.add_watch(watch)
    return jsonify(code=0)


@app.route('/getwatch')
def getwatch():
    if not 'uid' in session:
        return jsonify(code=1)
    watchlist = WatchListModel(app.config['MYSQL_AGENT'])
    mywatch = watchlist.get_goods(session['uid'])
    goodsids = []
    for w in mywatch:
        goodsids.append(w['goodsid'])
    goods_model = GoodsModel(app.config['MYSQL_AGENT'])
    goods = goods_model.query_goods_byid(goodsids, ['title', 'url', 'goodsid',
        'picurl', 'price'])
    goods_map = {}
    for item in goods:
        goods_map[ item['goodsid'] ] = item
    results = []
    for w in mywatch:
        gid = w['goodsid']
        if not gid in goods_map:
            continue
        good = goods_map[gid]
        w.update(good)
        w['create_time'] = time.mktime(w['create_time'].timetuple())
        results.append(w)
    return jsonify(code=0, watchlist=results)


@app.route('/delwatch')
def delwatch():
    if not 'uid' in session:
        return jsonify(code=1)
    goodsid = int(request.args['goodsid'])
    goods_model = GoodsModel(app.config['MYSQL_AGENT'])
    watchlist = WatchListModel(app.config['MYSQL_AGENT'])
    watchlist.del_watch(session['uid'], goodsid)
    return jsonify(code=0)

@app.route('/getgoodsinfo', methods=['POST', 'GET'])
def get_goods_info():
    if not 'uid' in session:
        print 'session uid not have'
        return jsonify(code=1)
    url = request.args['url']
    print url
    goods_model = GoodsModel(app.config['MYSQL_AGENT'])
    goods = goods_model.add_goods(url)
    str = jsonify(code=0, goods=goods[0])
    print str
    return str


