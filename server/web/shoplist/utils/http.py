#coding:utf-8
import pycurl
from pycurl import Curl
from StringIO import StringIO
def http_query(url, timeout=1000):
    print url
    c = Curl()
    c.setopt(pycurl.URL, url)
    c.setopt(pycurl.FOLLOWLOCATION, 1)
    c.setopt(pycurl.TIMEOUT_MS, timeout)
    body_writer = StringIO()
    head_writer = StringIO()
    c.setopt(pycurl.WRITEFUNCTION, body_writer.write)
    c.setopt(pycurl.HEADERFUNCTION, head_writer.write)
    result = {}
    c.perform()
    head_writer.seek(0)
    first = head_writer.readline()
    result['header'] = {}
    for line in head_writer:
        parts = line.split(':' , 1)
        if len(parts) == 2:
            result['header'][parts[0]] = parts[1].strip()
    result['code'] = c.getinfo(pycurl.HTTP_CODE) 
    result['body'] = body_writer.getvalue()
    return result

if __name__ == '__main__':
    resp = http_query('http://www.baidu.com')
    print resp['header']
              



