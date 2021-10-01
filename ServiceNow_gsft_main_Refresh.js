// ==UserScript==
// @name         ServiceNow.Timer.Refresh.w/Button.Manual.IFrame.Refresh.(gsft_main)
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Script to Refresh(Timer or button ) the IFRAME window in Service Now that contains the dashboard, incident table etc. Does not refresh anything outside of the IFRAME window allowing usuage of Service Now add-ons with out constatinly Refreshing them. (Agent Six Softphone addon etc.)
// @author       joejoe1234#6650
// @match        https://*.service-now.com/navpage.do*
// @exclude      https://*.service-now.com/nav_to.do?uri=%2Fincident_list.do*
// @exclude      https://*.service-now.com/incident_list.do?*
// @exclude      https://*.service-now.com/nav_to.do?uri=%2F$pa_dashboard.do*
// @exclude      https://*.service-now.com/$pa_dashboard.do*
// @exclude      https://*.service-now.com/$pa_dashboard*
// @exclude      https://*.service-now.com/nav_to.do?uri=%2Fhome.do
// @exclude      https://*.service-now.com/nav_to.do?*
// @exclude      https://*.service-now.com/home.do
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://raw.githubusercontent.com/Lexxus/jq-timeTo/master/jquery.time-to.min.js
// ==/UserScript==

(function() {
    'use strict';
    //This is me expiremnting with timers using Jqery
    //var $ = window.jQuery;
    //$('#countdown').timeTo(100, function(){ alert('Countdown finished'); });
    //Call the gsft_main AKA the iframe window in the document to refres


    var background_bar=document.createElement("background_bar")
    background_bar.id="background_bar"
    background_bar.setAttribute("style", "width:5.0%;height:20px;background-color:#ddd;position:absolute;top:0px;right:650px;");
    document.body.appendChild(background_bar);

    var progress_bar=document.createElement("prog_bar1234")
    progress_bar.id="prog_bar1234"
    progress_bar.setAttribute("style", "background-color:#4CAF50;width:.000%;height:20px;position:absolute;top:0px;right:650px;"); //
    document.body.appendChild(progress_bar);

    var bar = document.getElementById("prog_bar1234");
    var width = 0;
    //Just a input field for the timer
    var timerwaittime=document.createElement("input");
    timerwaittime.type="number";
    timerwaittime.placeholder="Refresh Timer (Min)";
    timerwaittime.autocomplete="on"
    timerwaittime.id="timerwaittime"
    timerwaittime.setAttribute("style", "color:#909;font-size:12px;position:absolute;top:0px;right:500px;");
    document.body.appendChild(timerwaittime);

    // Grabs the value in the timerwaittime input box

    //This is just a start button that starts the start_Time function
    var button=document.createElement("button");
    button.type="button";
    button.innerHTML="Start";
    button.id="penguin"
    button.onclick =start_Timer;
    button.setAttribute("style", "font-size:12px;position:absolute;top:0px;right:450px;");
    document.body.appendChild(button);

    function TableRefresh(){
        document.getElementById('gsft_main').contentWindow.location.reload();
    }

    var button2=document.createElement("button");
    button2.type="button";
    button2.innerHTML="Stop";
    button2.setAttribute("style", "font-size:12px;position:absolute;top:0px;right:450px;");
    document.body.appendChild(button2);
    button2.style.visibility = "hidden";

    function start_Timer(){
        var input_color = document.getElementById("timerwaittime")
        var Refresh_timer= document.getElementById("timerwaittime").value;
        if (Refresh_timer === "") {
            timerwaittime.placeholder="ENTER A TIMER FIRST";
            input_color.style.color = "red"
            //This is an atempt to change the place holder color to red
            //timerwaittime.placeholder.style.color="#b2cde0";
            return
        } else {
            button2.onclick = stop_Timer;
            button2.style.visibility = "visible";

            var id1234 = setInterval(frame,1000);
            function frame() {
                var prec_increase = Refresh_timer * 60;
                prec_increase = 10 / prec_increase ///10 is the magic number here
                prec_increase = prec_increase / 2
                if (width >= 5) {
                    bar.style.width = "0.00%";
                    width = 0;
                    TableRefresh();
                } else {
                    width = width + prec_increase;
                    bar.style.width = width + "%";
                }
            }
            //Refresh_timer= Refresh_timer * 60000; // Min to Miliseconds
            //console.log("starting Timer")
            //var timer = setInterval(function(){TableRefresh()}, Refresh_timer) // Starts interveral timer, calling the function every x seconds
            //Below is a stop button for the timer, Transparent once clicked
            function stop_Timer()
            {
                //console.log("stoping Timer")
                bar.style.width = "0.0%"
                width = 0
                clearInterval(id1234)
                //clearInterval(timer) //Stops the timer interval timer
                button2.style.visibility = "hidden"; // Hides the stop button
            }
        }
    }

    //Quick and dirty manual refresh button
    var button3=document.createElement("input");
    button3.type="button";
    button3.value="Refresh Table";
    button3.id="button3stop"
    button3.onclick = TableRefresh;
    button3.setAttribute("style", "font-size:12px;position:absolute;top:0px;right:350px;");
    document.body.appendChild(button3);

    /*         function progress_bar_move_it() {
            var bar = document.getElementById("prog_bar1234");
            var width = 0;
            var id = setInterval(frame,1000);
            function frame() {
                if (width >= 10) {
                    bar.style.width = 0;
                } else {
                    width = width + (((Refresh_timer * 60) / 100) * 0.01)
                    bar.style.width = width + "%";
                }
            }
        }
    below is my aptempt to make a quick incidnt resolve button */
    //     var state = document.getElementById("incident.state")
    //     var assignment_group = document.getElementById("sys_display.incident.assignment_group")
    //     var assgined_to = document.getElementById("sys_display.incident.assigned_to")
    //     var current_user = document.getElementsByClassName("user-name hidden-xs hidden-sm hidden-md").innerHTML

    //     var time_worked = document.getElementById("incident.u_time_worked") //// Example Value "0 00:15:00" <--- 15 min
    //     var customer_notes = document.getElementById("activity-stream-work_notes-textarea")
    //     var internal_notes = document.getElementById("activity-stream-comments-textarea")

    //     var button4=document.createElement("button");
    //     button4.type="button";
    //     button4.innerHTML="Resolve Prep";
    //     button4.id="penguin"
    //     button4.onclick =resolve_prep;
    //     button4.setAttribute("style", "font-size:15px;position:absolute;top:0px;right:1300px;");
    //     document.body.appendChild(button4);
    //     function resolve_prep(){
    //         state.value = "Resolved"
    //         assignment_group.value = "Tier 1 - Service Desk"
    //         assgined_to.value = current_user
    //         customer_notes.innerHTML = "Resolving incident / Sending Customer Note"
    //     }







})();
