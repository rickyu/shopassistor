#coding:utf-8
from shoplist import app
from flask import render_template, request, session, redirect
from shoplist.model.user import UserModel

@app.route('/logout')
def logout():
    if 'uid' in session:
        session.pop('uid', None)
    return redirect('/')

