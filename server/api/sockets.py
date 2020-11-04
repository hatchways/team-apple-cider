from flask_socketio import SocketIO, emit

def attach_events(socketio):
    @socketio.on("connect")
    def handle_message():
        print("I'm connected")
        emit("someEvent", "OKOKOK")