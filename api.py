# Here go your api methods.

def add_textBox():
    p = db.textBox.insert(
            Title         = request.vars.Title,
            is_group_chat = request.vars.is_group_chat
            )
    return "ok"


def get_textBox():
    t = db(db.textBox.id == request.vars.ID).select().first()
    temp = dict(
            Title   = t.Title,
            chat    = t.chat,
            chatter = t.chatter,
            id      = t.id
            )
            
    return response.json(temp)

def get_textTitle():
    chats = []
    for r in db().select(db.textBox.ALL):
        if r.is_group_chat == True:
            t = dict(
                    Title = r.Title,
                    id    = r.id
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

###################################### FOR QUEUE ############################################

def insert_queue():
    p = db.queue.insert(
            person_id = auth.user.id
            )
    return "ok"

def get_list_of_queue():
    amount_of_people = 0

    for r in db().select(db.queue.ALL):
        amount_of_people = amount_of_people + 1

    return amount_of_people

def remove_queue():
    db(db.queue.person_id == auth.user.id).delete()
    return "ok"
