# SlugRoulette

-----------------------------------------------------------------------------------------------------------------------------------------
(Version 1.0)                                                                                                                             
  Add button creates a new chat and anyone including people that are logged off can chat. The chat is a type in the tables.py called textBox and my current idea for storing the text is using an array. The 'chat' Field is an Array and any new line that someone sends into the chat will be stored as an new index in the array. The Chat as of now CANNOT update its text UNLESS the send button is clicked OR the page is refreshed. 
  
(version 1.1)                                                                                                                             
  Delete button added and delete function added to api.py and default_index.js. Chats can now be deleted.

(version 1.2)                                                                                                                             
  Now the chat will list the user that typed the text.

PROBLEM:

  (SOLVED) id of textBox is always null. As a result, I can only edit one textBox right now.                                               
  (SOLVED) Currently, the array 'chat' CANNOT be displayed. As a result, I cannot work on the edit chat too. Someone fix please. 
  
--------------------------------------------------- JOBS --------------------------------------------------------------------------------
  Frank: UI looks like complete shit right now. You will need to change myapp.css, layout.html, and index.html to improve upon the website design. I want the page to just be a list of chats titles with buttons that you can click to join them. When you click, that chat box appears and the list of titles disappear. From there you can participate in chat or leave by pressing a button. 
  
  Shreya: Look into how to refresh the page realtime. Probably some sort of threading but since threading does not exist in js, you will have to look for alternatives. Also, you can design the logo as I am too lazy to
  
  Kyler: Look into the scroll wheel for the chatbox. 
  
-----------------------------------------------------------------------------------------------------------------------------------------
Try to get this done by this thursday. We are running low on time and I hope you guys take this seriously.
