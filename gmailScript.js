function autoReply() {
  var interval = 5;    //  if the script runs every 5 minutes; change otherwise
  var date = new Date();
  var day = date.getDay();
  var hour = date.getHours();
  var replyMessage = "Hello!\n\nYou have reached me during non business hours. I will respond by 9 AM next business day.\n\nIf you have any Compass.com related questions, check out Compass Academy! Learn about Compass' tools and get your questions answered at academy.compass.com.\n\nBest,\n\nShamir Wehbe";
  
  if ([6,0].indexOf(day) > -1 || (hour < 9) || (hour >= 17)) {
    var timeFrom = Math.floor(date.valueOf()/1000) - 60 * interval;
    var threads = GmailApp.search('from:@compass.com is:inbox after:' + timeFrom);
    var label = GmailApp.getUserLabelByName("autoReplied");
    
    for (var i = 0; i < threads.length; i++) {
      if (threads[i].isUnread()){
      threads[i].reply(replyMessage);
      threads[i].markRead();
      threads[i].addLabel(label);
      }
    }
  } 
}
