# Here go your api methods.

def add_textBox():
    db.textBox.insert( 
            chat = ["what happened"],
            Title = request.vars.Title
            )

    return "ok";

def get_textBox():
    chats = []
    for r in db().select(db.textBox.ALL):
        t = dict(
                Title = r.Title,
                chat = r.chat
        )
        chats.append(t)

    return response.json(dict(chats=chats))


def edit_textBox():
    print db(db.textBox.id == request.vars.chat_id).select().first()
    print "testing"
    return "ok"
