function autoReply() {
  var interval = 5;    //  if the script runs every 5 minutes; change otherwise
  var date = new Date();
  var day = date.getDay();
  var hour = date.getHours();
  var noReply = ["ls@compass.com",
                 "rl@compass.com",
                 "robert@compass.com",
                 "feedback@compass.com",
                 "drew@compass.com",
                 "melanie.lowenberg@compass.com"];
  var replyMessage = "Hello!\n\nYou have reached me during non-business hours. I will respond by 9 AM next business day.\n\nIf you have any Compass.com related questions, check out Compass Academy! Learn about Compass' tools and get your questions answered at academy.compass.com.\n\nBest,\n\nShamir Wehbe";
  
  if ([6,0].indexOf(day) > -1 || (hour < 9) || (hour >= 17)) {
    var timeFrom = Math.floor(date.valueOf()/1000) - 60 * interval;
    var threads = GmailApp.search('from:@compass.com is:inbox after:' + timeFrom);
    var label = GmailApp.getUserLabelByName("autoReplied");
    
    for (var i = 0; i < threads.length; i++) {
          
      var messagesFrom = threads[i].getMessages()[0].getFrom();
      var email = messagesFrom.substring(messagesFrom.lastIndexOf("<") + 1, messagesFrom.lastIndexOf(">"));
          
         if (threads[i].isUnread() && noReply.indexOf(email) == -1){            
            threads[i].reply(replyMessage);
            threads[i].addLabel(label);
      }
    }
  }
}
