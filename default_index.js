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
		console.log("getting chats from database");
		$.getJSON(get_Title, {}, function(data){

				self.vue.chats = data.chats;

				setTimeout(function(){
					if(self.vue.isServer == false && self.vue.isRandom == false)
						self.getTitle();
				}, 500);

			});


	};

	self.getChat = function(){
		console.log("getting the chat box of chosen chat room");	
		$.getJSON(get_box, {
		
				ID: self.vue.serverId	

			}, function(data){	
				self.vue.currentChat = data;

				setTimeout(function(){
					if(self.vue.isServer == true && self.vue.isRandom == false)
						self.getChat();
				}, 500);

			});
	};

	self.editChat = function(chat_id){
		console.log("adding new chat to chat box");
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

/////////////////////////////////////// functions for queue //////////////////////////////////


	self.insertQueue = function (){
		$.post(insert_queue, {}, function(){



		});

	}

	self.listOfQueue = function (){
		$.getJSON(get_list_of_queue, {}, function(data){

			self.vue.queueLength = data;

			if(self.vue.isRandom){
				setTimeout(function(){
					self.listOfQueue();
				}, 500);
			}

		});

	}

	self.removeQueue = function (){
		$.post(remove_queue, {}, function(){



		});

	}

	// Complete as needed.
	self.vue = new Vue({
        	el: "#vue-div",
        	delimiters: ['${', '}'],
        	unsafeDelimiters: ['!{', '}'],
       		data: {
		
			//These arrays are used to store retrived data from database
			chats: [],
			currentChat: null,

			newTitle: null,       //variable to temp store a new title
			newChatting: null,    //variable to temp store new text

			//variables to check if user has joined chat server
			isServer: false,
			serverId: null,

			searching: "", //variable user to store search string

			//variable to check whether user is group chatting or seraching for random people
			isRandom: false,

			queueLength: 0,


        	},
        	methods: {
		
			//functions for chat
			makeNewChat: self.makeNewChat,
			
			getChat:     self.getChat,
			getTitle:    self.getTitle,

			editChat:    self.editChat,
			delChat:     self.delChat,


			//functions for queue
			insertQueue: self.insertQueue,
			listOfQueue: self.listOfQueue,
			removeQueue: self.removeQueue,

        	}


    	});

	//-------- IF YOU WANT SOMETHING TO HAPPEN WHEN WEBPAGE IS LOADED, CALL FUNCTION BELOW ---------------
	self.getTitle();
   	$("#vue-div").show();
    	return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});



