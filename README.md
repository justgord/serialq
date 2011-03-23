#serialq - simple Node.js work Q for cooperative sequential processing


a list of work functions is provided, each calling next
The implementation of next takes the frontmost work function off the list and executes it

Handy for database processing where sequence needs to be preserved
run serialq_test to compare default async processing with serial processing

##Usage

    var SerialQueue = require('serialq').SerialQueue;

    var Q = SerialQueue();
    Q.add(fn_first);
    Q.add(fn_second);
    Q.run();


##Contact

e : justgord@gmail.com
b : quantblog.wordpress.com         
w : treeblurb.com
