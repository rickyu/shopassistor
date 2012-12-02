#encoding:utf-8
import tornado.ioloop
import tornado.web
import jinja2

template_env = jinja2.Environment(loader=jinja2.FileSystemLoader('template'))
class UserRegisterHandler(tornado.web.RequestHandler):
    def get(self):
        template = template_env.get_template('register.tpl.html')
        html = template.render()
        self.write(html)
application = tornado.web.Application([
    (r"/user/register", UserRegisterHandler),
    (r"/css/(.*)", tornado.web.StaticFileHandler, {"path":"shoplist/static/css"}),
    (r"/js/(.*)", tornado.web.StaticFileHandler, {"path":"shoplist/static/js"}),
    (r"/images/(.*)", tornado.web.StaticFileHandler, {"path":"shoplist/static/images"}),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
