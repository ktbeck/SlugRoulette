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

	

	self.makeNewChat = function() {
		console.log("new chat added");

		$.post(new_box,
			{
				Title: self.vue.newTitle

			}, function(){
				self.vue.newTitle = null;
				self.getChat();
			});
	};
   
	self.getChat = function(){
		console.log("getting chats from database");

		$.getJSON(get_box, {}, function(data){
				self.vue.chats = data.chats;
				console.log(self.vue.chats);

			});


	};

	self.editChat = function(chat_id){
		console.log("adding new chat to chat box");
		$.post(edit_box,{
				chat_id: chat_id,
				NEW: self.vue.newChatting
			}, function(){
				self.getChat();
				self.vue.newChatting = null;
			
			});

	};

	// Complete as needed.
	self.vue = new Vue({
        	el: "#vue-div",
        	delimiters: ['${', '}'],
        	unsafeDelimiters: ['!{', '}'],
       		data: {
		
			//These arrays are used to store retrived data from database
			chats: [],

			newTitle: null,
			newChatting: null,


        	},
        	methods: {
		
			makeNewChat: self.makeNewChat,
			getChat:     self.getChat,
			editChat:    self.editChat

        	}


    	});

	self.getChat();
   	$("#vue-div").show();
    	return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});



