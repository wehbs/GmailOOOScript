function autoReply() {
  var interval = 5;    // if the script runs every 5 minutes; change otherwise
  var date = new Date();
  var day = date.getDay();
  var hour = date.getHours();
  var noReply = ["ls@compass.com",
                 "rl@compass.com",
                 "robert@compass.com",
                 "neda@compass.com",
                 "drew@compass.com",
                 "melanie.lowenberg@compass.com",
                 "lookernotification@compass.com",
                 "productexperts-all@compass.com",
                 "productexperts@compass.com",
                 "feedback@compass.com",
                 "",
                 "regionalopssurvey@compass.com"];
  var replyMessage = "Hello!\n\nYou have reached me during non-business hours. I will respond by 9 AM next business day.\n\nIf you have any Compass.com related questions, check out Compass Academy! Learn about Compass' tools and get your questions answered at academy.compass.com.\n\nBest,\n\nShamir Wehbe";
  var noReplyId = [];
    
  if ([6,0].indexOf(day) > -1 || (hour < 9) || (hour >= 17)) {
    var timeFrom = Math.floor(date.valueOf()/1000) - 60 * interval;
    var threads = GmailApp.search('from:@compass.com is:inbox after:' + timeFrom);
    var label = GmailApp.getUserLabelByName("autoReplied");
    var repliedThreads = GmailApp.search('label:autoReplied newer_than:4d');
    
    // loop through emails from the last 4 days that have already been replied to
    for (var i = 0; i < repliedThreads.length; i++) {  
      var repliedThreadsId = repliedThreads[i].getMessages()[0].getId();
      noReplyId.push(repliedThreadsId);
    }
    
    for (var i = 0; i < threads.length; i++) {     
      var message = threads[i].getMessages()[0];
      var messagesFrom = message.getFrom();
      var email = messagesFrom.substring(messagesFrom.lastIndexOf("<") + 1, messagesFrom.lastIndexOf(">"));
      var threadsId = message.getId();
      var rawMessage = message.getRawContent();
      var searchForList = rawMessage.search("Mailing-list:");
      var searchForUnsubscribe = rawMessage.search("Unsubscribe");

         // if the message is unread, not on the no reply list, hasn't already been replied to, doesn't come from a mailing list, and not a marketing email then auto reply
         if (message.isUnread() && noReply.indexOf(email) == -1 && noReplyId.indexOf(threadsId) == -1 && searchForList === -1 && searchForUnsubscribe === -1){
            message.reply(replyMessage);
            threads[i].addLabel(label);
      }     
    }
  }
}
