from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.auth_handler import auth_blueprint
from api.scrape_handler import scrape_handler
from server import app, db

from server import create_app

if __name__ == "__main__":
    app = create_app()

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(auth_blueprint)
app.register_blueprint(scrape_handler)
