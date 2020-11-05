from server import create_app,socketio,attach_events


if __name__ == "__main__":
    app = create_app()
    socketio.run(app)
    attach_events(socketio)
