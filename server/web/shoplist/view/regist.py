#coding:utf-8
from shoplist import app
from flask import render_template, request, session, redirect, url_for

from shoplist.model.user import UserModel

@app.route('/regist', methods=['POST', 'GET'])
def regist():
    if request.method == 'GET':
        return render_template("regist.tpl.html")
    user_model = UserModel(app.config['MYSQL_AGENT'])
    user_info = {'email' : request.form['email'],
             'nickname' : request.form['nickname'],
             'passwd' : request.form['password']
             }
    user = user_model.create_user(user_info)
    session['uid'] = user['userid']
    return redirect(url_for('/'))
