# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.

import datetime

def get_user_email():
    return auth.user.email if auth.user is not None else None

db.define_table('textBox',
        Field('Title'),
        Field('is_group_chat', 'boolean'),

        Field('chat',             'list:string',  default=[]),
        Field('chatter',          'list:string',  default=[]),
        Field('chat_time',        'list:string',  default=[]),
        Field('list_of_chatters', 'list:integer', default=[]),
        Field('password',         'string')
        )

db.define_table('queue',
        Field('person_id', 'integer')
        )

db.textBox.id.readable = True
