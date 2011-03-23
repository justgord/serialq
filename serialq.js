//
// serialq- chain functions together for sequential processing
//

exports.SerialQueue = function()
{
    var sq = 
    {
        funcs : [],
        next : function()
        {
            var Q = this;
            var f = Q.funcs.shift();
            if (f)
                f(function() {Q.next();});    
        },
        add : function(f)
        {
            this.funcs.push(f);
        },
        run : function()
        {
            this.next();
        }
    };
    return sq;
}


