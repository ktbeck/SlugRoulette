# Here go your api methods.
import time

def add_textBox():
    p = db.textBox.insert(
            Title         = request.vars.Title,
            is_group_chat = request.vars.is_group_chat
            )
    return "ok"


def get_textBox():
    t = db(db.textBox.id == request.vars.ID).select().first()

    if (t is not None and request.vars.current is -1) or int(request.vars.current) is not len(t.chat):
        temp = dict(
                Title   = t.Title,
                chat    = t.chat,
                chatter = t.chatter,
                id      = t.id,
                )
            
        return response.json(temp)
    return 0

def get_textTitle():
    temp = 0
    chats = []
    for r in db().select(db.textBox.ALL):
        if r.is_group_chat == True:
            t = dict(
                    Title = r.Title,
                    id    = r.id
                    )
            chats.append(t)
            temp = temp + 1

    if int(request.vars.current) is not temp:
        return response.json(dict(chats=chats))
    return 0

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

    #updating the time that the text was sent
    temp3 = chat.chat_time
    temp3.append(request.now)

    chat.update_record(chat = temp, chatter = temp2, chat_time = temp3)
    return "ok"

def del_textBox():
    db(db.textBox.id == request.vars.chat_id).delete()
    return "ok"

###################################### FOR QUEUE ############################################

def insert_queue():
    #for r in db().select(db.queue.ALL):
    #    if auth.user.id == r.person_id:
    #        return "not ok"

    p = db.queue.insert(
            person_id = auth.user.id
            )
    return "ok"


def get_list_of_queue():
    queue = []

    #gets logged in users data
    queue.append(db(db.queue.person_id == auth.user.id).select().first())
    #queue.append(request.vars.isChatting)
    #queue.append(False)

    #gets the data of every other user that isnt chatting with another random person
    if request.vars.isChatting == 'false':
        for r in db().select(db.queue.ALL):
            if r.person_id != auth.user.id and r.is_chatting == False:
                temp = dict(

                        person_id   = r.person_id,
                        is_chatting = r.is_chatting,

                    )   
                queue.append(temp)

    return response.json(queue)


def match_users():

    user1 =      db(db.queue.person_id == auth.user.id).select().first()
    user2 =      db(db.queue.person_id == request.vars.person_id).select().first()
    user2_info = db(db.auth_user.id    == request.vars.person_id).select().first()

    if user1 is not None and user2 is not None and user1.is_chatting == False and user2.is_chatting == False:
    
        #adding new textBox for first user
        temp = user1.chats
        p = db.textBox.insert(
                    chat = ['You are now chatting with ' + user2_info.first_name]
                )
        temp.append(p)

        #adding new textBox for second user
        temp2 = user2.chats
        p2 = db.textBox.insert(
                    chat = ['you are now chatting with ' + auth.user.first_name]
               )
        temp2.append(p2)

        tmp = time.time()
        user1.update_record(is_chatting = True, chats = temp,  chatting_with = p2, time_limit = tmp)
        user2.update_record(is_chatting = True, chats = temp2, chatting_with = p , time_limit = tmp)

        return response.json(p)
        
    return "n"

def countdown():
    you = db(db.queue.person_id == auth.user.id).select().first()

    if you is not None:

        #check if other user is still in random chat. If not, leave this chat and find new one
        check =db(db.textBox.id == you.chatting_with).select().first()
        if check is None:
            you.update_record(is_chatting = False, chatting_with = 0)

        #if other user is still in chat, then keep track of time
        else:
            you.update_record(time_remain = time.time() - you.time_limit)

        #if time is up, split pair and make them avaliable
        if you.time_remain > 60:
            you.update_record(is_chatting = False, chatting_with = 0)

    return "ok"


def remove_queue():

    #deletes all textBox in this array so that we dont have memory leaks
    user = db(db.queue.person_id == auth.user.id).select().first()
    if user is not None:
        for r in user.chats:
            db(db.textBox.id == r.id).delete();
        

    db(db.queue.person_id == auth.user.id).delete()
    return "ok"
