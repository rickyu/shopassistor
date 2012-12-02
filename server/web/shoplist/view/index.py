#encoding:utf-8
from shoplist import app
from flask import render_template, session
from shoplist.model.user import UserModel
@app.route('/')
def main():
    user = None
    if 'uid' in session:
        uid = session['uid']
        user_model = UserModel(app.config['MYSQL_AGENT'])
        user = user_model.query_user('userid', uid, ['email', 'userid', 'nickname'])
    return render_template('index.html', user=user)
