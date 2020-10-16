from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.auth_handler import auth_blueprint
from server import app


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(auth_blueprint)
