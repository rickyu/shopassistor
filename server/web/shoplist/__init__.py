from flask import Flask, url_for
app = Flask(__name__)

import view.index
import view.regist
import view.login
import view.logout
import view.watch
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

