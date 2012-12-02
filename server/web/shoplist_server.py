from shoplist import app
from shoplist.utils.mysql_agent import MysqlAgent
MYSQL_CONFIG = {'shoplist':{'master':{'host': '127.0.0.1', 'user': 'rick', 'passwd':'123456', 'port':3306},
                    'slave': {'host': '127.0.0.1', 'user': 'rick', 'passwd':'123456','port':3306}}}

MYSQL_AGENT=MysqlAgent(MYSQL_CONFIG)
app.config.from_object(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.run(host='0.0.0.0', port=5000, debug=True)
