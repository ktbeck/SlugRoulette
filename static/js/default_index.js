// This is the js for the default/index.html view.

var app = function() {

    var self = {};
    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    //var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});}k0;

	
////////////////////////////////////// functions for chat box///////////////////////////////////////

	self.makeNewChat = function(data) {
		console.log("new chat added");
		console.log(data);

		$.post(new_box,
			{
				Title: self.vue.newTitle,
				is_group_chat: data

			}, function(data){
				
				self.vue.newTitle = null;
			});
	};
   
	self.getTitle = function(){
		//console.log("getting chats from database");
		//console.log(self.vue.currentChat);

		$.getJSON(get_Title, {}, function(data){

				self.vue.chats = data.chats;

				setTimeout(function(){
					if(self.vue.isRandom == false)
						self.getTitle();
				}, self.vue.normalDelay);
			});
	};

	self.getChat = function(){
		//console.log("getting the chat box of chosen chat room");
		//console.log(self.vue.currentChat);
		

		temp = -1;
		if(self.vue.currenChat != null)
			temp = self.vue.currentChat.chat.length;

		if(self.vue.isRandom){
			$.getJSON(get_box,{
				ID: self.vue.rserverId,
				current: temp
			}, function(data){
				self.vue.rcurrentChat = data;
			});
		}
		else{
			$.getJSON(get_box, {
		
				ID:      self.vue.serverId,
				current: temp

			}, function(data){
			
				console.log(data);
				if(data != 0){
						self.vue.currentChat = data;

				}	

				setTimeout(function(){
					if(self.vue.isServer == true && self.vue.isRandom == false)
						self.getChat();
				}, self.vue.chatDelay);

			});
		}
	};

	self.editChat = function(chat_id){
		console.log("adding new chat to chat box");
		//alert(chat_id);
		$.post(edit_box,{

				chat_id: chat_id,
				NEW: self.vue.newChatting

			}, function(){
				
				self.vue.newChatting = null;
			
			});

	};

	self.delChat = function(chat_id){
		console.log("deleting a chat");
		$.post(del_box, {

				chat_id: chat_id	

			}, function (){});
	};

	self.refresh = function(){

	};
/////////////////////////////////////// functions for queue //////////////////////////////////


	self.insertQueue = function (){
		$.post(insert_queue, {}, function(data){

			self.listOfQueue();

		});

	}

	//Gets information from database about queue
	self.listOfQueue = function (){
		$.getJSON(get_list_of_queues, {
					
				isChatting: self.vue.isChatting
	
			}, function(data){
			/*The array passed in from the api function (data) will have all the
			  queue Fields stored in the 0th index. After that, it will store
			  every user in the queue ONLY IF they are waiting to find someone else
			  to chat with*/
				
			console.log(data);
			if(data != "n"){	
				//gives the amount of people that are current in queue
				self.vue.queueLength = data.length;

				//is current user in chat
				if(data[0] != null){
					self.vue.isChatting  = data[0].is_chatting;
				}



				/*if user has not been matched, we will pick a person through a list of 
				  other people that also havent been matched*/
				if(self.vue.isChatting == false){

					//only searches IF there is anyone to be found
					if(data.length > 1){

						//pairs the users 
						var randomUser = Math.floor(Math.random()*(data.length - 1)) + 1;
						$.post(match_users,{
							
								person_id: data[randomUser].person_id
	
							}, function(data) {
									
								//console.log(data);
							
							});
					}
					else{
						self.vue.searchingForChat += ".";
						if(self.vue.searchingForChat.length > 5)
							self.vue.searchingForChat = ".";
					}
	
				}



				//user is curently chatting
				else if(data[0] != null){

					
					//gets time remaining for chat
					self.vue.time = 60 - Math.floor(data[0].time_remain);

					//gets the length of queue
					length = data[0].chats.length - 1;
					
				
					//if user has started new chat, then we add new chat to listChat array
					if(self.vue.rserverId != data[0].chats[length]){

						//getting id of your chat box
						self.vue.rserverId  = data[0].chats[length];

						//making space in array for random chat box
						self.vue.listChats.push(null);
	
						//getting id of other user's chat box
						self.vue.randomBox = data[0].chatting_with;
					}

					//if chat is not new, then update latest that
					else if(self.vue.isRandom && data[0].chats[length] == self.vue.rserverId){
						self.getChat();
						self.vue.listChats[length] = self.vue.rcurrentChat;
					}
	
					//keeps track of whether a user has left and time limit
					$.post(countdown,{}, function(){});
					
				}
			}

			//periodically retrieve updates about textBox and queue
			if(self.vue.isRandom){
				setTimeout(function(){
					self.listOfQueue();
					//console.log(data);
				}, self.vue.chatDelay);
			}
			else{
				self.vue.rcurrentChat = null;
			}

		});


	};

	self.removeQueue = function (){
		$.post(remove_queues, {}, function(data){});
	};
	
	//username functions	
	self.set_username = function(){
		$.get(check_repeats, {
			username: self.vue.username
		}, function(data) {
			if(self.vue.username == ""){
				alert("Please enter a valid username");
			}
			else{
                console.log(data);
                if (data == 0) {
                    $.post(setUsername,
                        {
                            username: self.vue.username
                        }, function (data) {
                            self.get_username();
                        });
                }
                else {
                    alert("Username already taken");
                }
            }
        })
	};

	self.get_username = function(){
		$.get(getUsername, {}, function(data){
				if(data == null){
					self.vue.needs_username =  true;
				}
				else{
					// console.log(data);
					self.vue.needs_username = false;
				}
			});
	};

	self.request_friend = function(){
		self.vue.requested = true;
		self.vue.acc_or_rej = false;
	};

	self.reject_friend = function(){
		self.vue.acc_or_rej = true;
		self.vue.requested = false;
		for(var i = 0; i<self.vue.friends.length; i++) {
            console.log(self.vue.friends[i]);
        }
	};

	self.accept_friend = function(){
		$.get(show_friends, function(data){
			self.vue.friends = data;
			self.vue.data = data;
			console.log("FRIENDS LEN =" + self.vue.friends.length);
			for(var i = 0; i<self.vue.friends.length; i++) {
                console.log(self.vue.friends[i]);
            }
		self.vue.acc_or_rej = true;
		self.vue.requested = false;
		})
	};

	// Complete as needed.
	self.vue = new Vue({
        	el: "#vue-div",
        	delimiters: ['${', '}'],
        	unsafeDelimiters: ['!{', '}'],
       		data: {
		
			//These arrays are used to store retrived data from database
			chats: [],
			listChats: [],

			rcurrentChat: null,
			currentChat:  null,

			newTitle: null,       //variable to temp store a new title
			newChatting: null,    //variable to temp store new text

			//variables to check if user has joined chat server
			isServer:  false,
			serverId:  null,
			rserverId: null,

			searching: "", //variable user to store search string

			//variable to check whether user is group chatting or seraching for random people
			isRandom: false,

			queueLength: 0,
			isChatting:  false,
			friends: [],

			/*stores the id of your chat box and the chat box of the person you are chatting 
			  to in the random chat*/
			randomBox: null,
			time:      0,

			//the intertval btwn pinging servers in milliseconds
			chatDelay:   2000, //100
			normalDelay: 2000, //500

			searchingForChat: "",
			
			username: null,
			needs_username: false,
			requested: false,
			acc_or_rej: false,

        	},
        	methods: {

        	refresh: self.refresh,
		
			//functions for chat
			makeNewChat: self.makeNewChat,
			
			getChat:     self.getChat,
			getTitle:    self.getTitle,

			editChat:    self.editChat,
			delChat:     self.delChat,

		
			//username functions
			set_username: self.set_username,
			get_username: self.get_username,
			request_friend: self.request_friend,
			reject_friend: self.reject_friend,
			accept_friend: self.accept_friend,

			//functions for queue
			insertQueue: self.insertQueue,
			listOfQueue: self.listOfQueue,
			removeQueue: self.removeQueue,

        	}


    	});

	//-------- IF YOU WANT SOMETHING TO HAPPEN WHEN WEBPAGE IS LOADED, CALL FUNCTION BELOW ---------------
	if(self.vue.has_username !== null){
		self.get_username();
	}
	self.getTitle();
   	$("#vue-div").show();
    	return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
