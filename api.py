# Here go your api methods.

def add_textBox():
    trys = []
    trys.append('new')
    trys.append('one')
    p = db.textBox.insert(
            chat = trys,
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
                chat = r.chat
        )
        chats.append(t)
    return response.json(dict(chats=chats))


def edit_textBox():
    chat =  db(db.textBox.id == 70).select().first()
    temp = chat.chat
    temp.append(request.vars.NEW)
    chat.update_record(Title = 's', chat = temp)
    return "ok"
