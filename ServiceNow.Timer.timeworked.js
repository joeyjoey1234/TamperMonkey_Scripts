// ==UserScript==
// @name         ServiceNow.Timer.timeworked.js
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tracks timeworked and adds it automatically.
// @author       joejoe1234#6650
// @match        https://*.service-now.com/incident.do*
// @match        https://*.service-now.com/sc_req_item.do*
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://raw.githubusercontent.com/Lexxus/jq-timeTo/master/jquery.time-to.min.js
// ==/UserScript==

(function() {
    'use strict';

    //This is just a start button that starts the start_Time function
    var button=document.createElement("button");
    button.type="button";
    button.innerHTML="Start";
    button.id="penguin"
    button.onclick =start_Timer;
    //button.setAttribute("style", "font-size:12px;position:absolute;top:0px;right:450px;");
    button.setAttribute("style", "font-size:12px;position:absolute;top:50px;right:50px;");
    document.body.appendChild(button);


    var button2=document.createElement("button");
    button2.type="button";
    button2.innerHTML="Stop";
    //button2.setAttribute("style", "font-size:12px;position:absolute;top:0px;right:450px;");
    button2.setAttribute("style", "font-size:12px;position:absolute;top:50px;right:50px;");
    document.body.appendChild(button2);
    button2.style.visibility = "hidden";

    function start_Timer(){
        button.style.visibility = "hidden";
        console.log("grabbing var");
        var current_time = g_form.getValue('u_time_worked');

        console.log(current_time);
        //var current_time = document.getElementById("incident.u_time_worked").value;

        console.log("converting to string");
        var str = current_time;
        str = str.toString();
        str = current_time;
        var timearry = str.split(":");

        console.log("printing to array");
        console.log(timearry[2]);

        console.log("assinging to vars");
        var current_hour = parseInt(timearry[0], 10);
        var current_min = parseInt(timearry[1], 10)
        var current_sec = parseInt(timearry[2], 10)
        console.log(current_sec, current_min, current_hour);

        if (current_time == "") {
            current_hour = 0;
            current_min = 0;
            current_sec = 0;
            //This is an atempt to change the place holder color to red
            //timerwaittime.placeholder.style.color="#b2cde0";
            console.log("time was at zero resetting time.")
            button2.onclick = stop_Timer;
            button2.style.visibility = "visible";
            var id12345 = setInterval(timer,1000);
        } else {
            button2.onclick = stop_Timer;
            button2.style.visibility = "visible";

            var id1234 = setInterval(timer,1000);

            }
            //current_min= current_min * 60000; // Min to Miliseconds
            //console.log("starting Timer")
            //var timer = setInterval(function(){TableRefresh()}, current_min) // Starts interveral timer, calling the function every x seconds
            //Below is a stop button for the timer, Transparent once clicked
        function timer() {
                if (current_sec < 60) {
                    current_sec = current_sec + 1;
                    console.log(" adding an second");
                } else if (current_sec == 60) {
                    if (current_min < 60) {
                        current_min = current_min + 1;
                        current_sec = 0;
                        console.log(" adding an min");
                    } else if (current_min == 60) {
                        current_hour = current_hour + 1;
                        current_min = 0
                        console.log(" adding an hour");
                    }
                } else {
                    console.log(current_sec, current_min, current_hour);
                    console.log(" you broke something");
                  }
                }

            function stop_Timer()
            {
                //console.log("stoping Timer")
                button.style.visibility = "visible";
                const elements = [current_hour, current_min, current_sec];
                var final_time = elements.join(':');
                console.log(final_time);
                g_form.setValue('u_time_worked', final_time);
                console.log(current_hour,current_min,current_sec);
                clearInterval(id1234);
                clearInterval(id12345);
                //clearInterval(timer) //Stops the timer interval timer
                button2.style.visibility = "hidden"; // Hides the stop button
            }
        }
    }






)();
