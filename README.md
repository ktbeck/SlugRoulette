# SlugRoulette

(Version 1.0)
Add button creates a new chat and anyone including people that are logged off can chat. The chat is a type in the tables.py called textBox and my current idea for storing the text is using an array. The 'chat' Field is an Array and any new line that someone sends into the chat will be stored as an new index in the array. The Chat as of now CANNOT update its text UNLESS the send button is clicked OR the page is refreshed.

(version 1.1)
Delete button added and delete function added to api.py and default_index.js. Chats can now be deleted.

(version 1.2)
Now the chat will list the user that typed the text.

(version 1.3)
Now the chat box will update realtime. If another user has texted, the texted will be displayed without any inputs to all other devices.

(version 1.4) The chat list begins by showing a list of Titles and gives the user an option to join a chat box. If the user joins, they will be shown only the chat box where they can either participate in the chat or leave the chat. DELETE BUTTON DOES NOT WORK RIGHT NOW AND DOESNT NEED TO WORK.
(version 1.41): No more loading screen

(version 1.5)
Search function for chats. RANDOM CHAT AND CHAT SERVER BUTTON DONT WORK RIGHT NOW

(version 1.6)
Now added a new tab where user can enter a Queue. QUEUE DOES NOT CURRENTLY DO ANYTHING.

(version 1.7) Password field added to the Join button.

(version 2.0)
Random Chat now works. PLEASE IF YOU FIND BUG LIST IT UNDER PROBLEM.
(UPDATE): fixed an issue where send button would not disappear in random chat after the chat was disconnected

(versions 2.1)
Readded README. Queue works, usernames work, and chat works. UI not totally connected.

(version 2.2)
Uploaded main UI for main page. Content is mostly complete aside from some images needed and minor adjustments to bottom elements.
Chat has been migrated to another page.

(version 2.3)                                                                                                                           
Chat box now dislays in same page as title page. Fixed bugs that occured because of git merge. Several api functions were broken as a result.

PROBLEM: Windows Explorer cannot run website. Double check to see if this happens elsewhere.

(SOLVED)Queue will not remove user if user has logged off or exited page.
(SOLVED) id of textBox is always null. As a result, I can only edit one textBox right now.
(SOLVED) Currently, the array 'chat' CANNOT be displayed. As a result, I cannot work on the edit chat too. Someone fix please.

POTENTIAL UPGRADES:

--------------------------------------------------- JOBS -------------------------------------------------------------------------------- Frank: UI looks like complete shit right now. You will need to change myapp.css, layout.html, and index.html to improve upon the website design. I want the page to just be a list of chats titles with buttons that you can click to join them. When you click, that chat box appears and the list of titles disappear. From there you can participate in chat or leave by pressing a button.

Shreya: I have used a timeOut function so that the website will get a new version of the chatbox every so often. Try to find a better way to implement this. Also, you will have to give user the option to add a password when they make a chat server. THIS PASSWORD CANNOT BE NORMALLY STORED IN A STRING OR ELSE IT CAN BE EASILY STEALED. After all this, help Kyler with his task.

Kyler: Look into the scroll wheel for the chatbox. Also look into how we are going to upload images. In charge of FriendsList.
