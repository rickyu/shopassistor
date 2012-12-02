#coding:utf-8
from shoplist import app
from flask import render_template, request, session, redirect
from shoplist.model.user import UserModel

@app.route('/login')
def login():
    print 'we are login'
    return render_template("login.tpl.html")
@app.route('/dologin', methods=['POST'])
def dologin():
    email = request.form['email']
    passwd = request.form['password']
    user_model = UserModel(app.config['MYSQL_AGENT'])
    user = user_model.query_user('email', email, ['email', 'password', 'userid'])
    if user:
        session['uid'] = user['userid']
        return redirect('/')
    return "用户名不存在"


