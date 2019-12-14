function autoReply() {
  var interval = 5;    //  if the script runs every 5 minutes; change otherwise
  var date = new Date();
  var day = date.getDay();
  var hour = date.getHours();
  var noReply = ["ls@compass.com", "feedback@compass.com", "jenkins@compass.com", "shamirwehbe@me.com"];
  var fromEmails = [];
  var replyMessage = "Hello!\n\nYou have reached me during non business hours. I will respond by 9 AM next business day.\n\nIf you have any Compass.com related questions, check out Compass Academy! Learn about Compass' tools and get your questions answered at academy.compass.com.\n\nBest,\n\nShamir Wehbe";
  
  if ([6,0].indexOf(day) > -1 || (hour < 9) || (hour >= 17)) {
    var timeFrom = Math.floor(date.valueOf()/1000) - 60 * interval;  
    var threads = GmailApp.search('is:inbox after:' + timeFrom);
    var label = GmailApp.getUserLabelByName("autoReplied");
    
    for (var i = 0; i < threads.length; i++) {
    
      var messages = threads[i].getMessages()[0];
      var from = messages.getFrom();
      var email = from.substring(
        from.lastIndexOf("<") + 1, 
        from.lastIndexOf(">"));
      fromEmails.push(email);
      
      for (var t = 0; t < email.length; t++) {
    
        for (var e = 0; e < noReply.length; e++) {
              
          if ((threads[i].isUnread()) && (email[t] !== noReply[e])){
            
            threads[i].reply(replyMessage);
            threads[i].markRead();
            threads[i].addLabel(label);
      		
          }
      	}
      }
    }    
  } 
}
