# Here go your api methods.

def add_textBox():
    p = db.textBox.insert(
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
                chatter = r.chatter,
                id = r.id
        )
        chats.append(t)
    return response.json(dict(chats=chats))


def edit_textBox():
    chat = db(db.textBox.id == request.vars.chat_id).select().first()
    
    #updating the text in the box
    temp = chat.chat
    temp.append(request.vars.NEW)

    #updating the names that sent the text
    temp2 = chat.chatter
    if auth.user is None:
        temp2.append("Anonymous")

    else:
        temp2.append(auth.user.first_name)

    chat.update_record(chat = temp, chatter = temp2)
    return "ok"

def del_textBox():
    db(db.textBox.id == request.vars.chat_id).delete()
    return "ok"
