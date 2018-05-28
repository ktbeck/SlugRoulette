# Here go your api methods.

def add_textBox():
    p = db.textBox.insert(
            chat = [],
            Title = request.vars.Title
            )
    p2 = db.textBox(p)
    print p
    return "ok";


def get_textBox():
    chats = []
    for r in db().select(db.textBox.ALL):
        t = dict(
                Title = r.Title,
                chat = r.chat,
                id = r.id
        )
        chats.append(t)
    return response.json(dict(chats=chats))


def edit_textBox():
    chat =  db(db.textBox.id == request.vars.chat_id).select().first()
    temp = chat.chat
    temp.append(request.vars.NEW)
    chat.update_record(chat = temp)
    return "ok"

def del_textBox():
    db(db.textBox.id == request.vars.chat_id).delete()
    return "ok"
