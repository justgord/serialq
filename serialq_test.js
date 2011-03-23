#!/usr/bin/env node
//
// serialq_test - compare async 'parallel' default processing with sequential calls using 'serialq'
//
var sys = require('sys'),
    SerialQueue = require('./serialq').SerialQueue;


function slowfunc(msg, ms, done)
{
    var t0=new Date().getTime();
    console.log(">"+msg);

    setTimeout(function() { 
        var td=new Date().getTime()-t0;
        console.log("<"+msg+" took "+td+"ms");
        done(); 
    }, ms);
}


function do_aaa(next)
{
    slowfunc("aaa", 220, next);
}

function do_bbb(next)
{
    slowfunc("bbb",  50, next);
}

function do_ccc(next)
{
    slowfunc("ccc", 120, next);
}


function run_interleaved()
{
    console.log("\nRUNNING INTERLEAVED / ASYNC\n");

    function empty() {};
    var info = {};

    do_aaa(empty);
    do_bbb(empty);
    do_ccc(empty);
}

function run_sequential()
{
    console.log("\n\nRUNNING SEQUENTIALLY\n");

    var Q = SerialQueue();

    Q.add(do_aaa);
    Q.add(do_bbb);
    Q.add(do_ccc);
    Q.add(function(next) { 
        console.log('\nall done\n'); 
        next();
    });

    Q.run();                        // call do_aaa, do_bbb, do_ccc sequentially
}

setTimeout(run_interleaved, 0);
setTimeout(run_sequential, 800);
