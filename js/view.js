'use strict';

// Put your view code here (e.g., the graph renderering code)
var DataView = function(model) {
    var self = this;

    this.model = model;
    
    this.model.addListener(function(eventType, eventTime, eventData) {
        console.log("DataView");
        if (eventType === ACTIVITY_DATA_ADDED_EVENT) {
          console.log('Data added');
          console.log(eventData.activityType);
          console.log(eventData.activityDurationInMinutes)
          switch(eventData.activityType) {
            case 'Writing Code':
              var time = document.getElementById('WritingCodeTime');
              console.log(time);
              var curTime = parseInt(time.innerHTML);
              time.innerHTML = curTime + parseInt(eventData.activityDurationInMinutes);
              console.log(time.innerHTML);
              break;
            case 'Eating Dinner':
              var time = document.getElementById('EatingDinnerTime');
              var curTime = parseInt(time.innerHTML);
              time.innerHTML = curTime + parseInt(eventData.activityDurationInMinutes);
              break;
            case 'Playing Sports':
              var time = document.getElementById('PlayingSportsTime');
              var curTime = parseInt(time.innerHTML);
              time.innerHTML = curTime + parseInt(eventData.activityDurationInMinutes);
              break;
            case 'Studying for Exams':
              var time = document.getElementById('StudyingForExamsTime');
              var curTime = parseInt(time.innerHTML);
              time.innerHTML = curTime + parseInt(eventData.activityDurationInMinutes);
              break;
            case 'Attending Lectures':
              var time = document.getElementById('AttendingLecturesTime');
              var curTime = parseInt(time.innerHTML);
              time.innerHTML = curTime + parseInt(eventData.activityDurationInMinutes);
              break;
            case 'Watching TV':
              var time = document.getElementById('WatchingTVTime');
              var curTime = parseInt(time.innerHTML);
              time.innerHTML = curTime + parseInt(eventData.activityDurationInMinutes);
              break;
          }
        }
        else {}
    });
};

var OptionView = function(model) {
    console.log("OptionView");
    var self = this;

    this.model = model;

    this.model.addListener(function(eventType, eventTime, eventData) {
      console.log("OptionViewListener");
      console.log("eventData is " + eventData);
      if (eventType === GRAPH_SELECTED_EVENT){
        var viewType1 = document.getElementById('table summary');
        var viewType2 = document.getElementById('bar graph');
        if(viewType1.id === eventData) {
            viewType1.style.display = 'block';
            viewType2.style.display = 'none';
        }
        else if(viewType2.id === eventData){
            viewType1.style.display = 'none';
            viewType2.style.display = 'block';
        }
      }
    });
}

var GraphView = function(model) {
    var self = this;

    this.model = model;

    this.model.addListener(function(eventType, eventTime, eventData) {
        if (eventType === ACTIVITY_DATA_ADDED_EVENT) {
          var energyLevel = 0;
          var stressLevel = 0;
          var happinessLevel = 0;

          var el = "EnergyLevel";
          var sl = "StressLevel";
          var hl = "HappinessLevel";
          var totalDataPoints = 0;
          var haveItem = false;
          var elacc = 0;
          var slacc = 0;
          var hlacc = 0;
          var avgel = 0;
          var avgsl = 0;
          var avghl = 0;

          var allDataPoints = model.getActivityDataPoints();
          var len = allDataPoints.length;
          for (var i = 0; i < len; i++) {
              var elint = parseInt(allDataPoints[i].activityDataDict[el]);
              var slint = parseInt(allDataPoints[i].activityDataDict[sl]);
              var hlint = parseInt(allDataPoints[i].activityDataDict[hl]);
              elacc += elint;
              slacc += slint;
              hlacc += hlint;
              totalDataPoints ++;
          }
          if (totalDataPoints > 0) {
            haveItem = true;
            energyLevel += elacc;
            stressLevel += slacc;
            happinessLevel += hlacc;
            elacc = 0;
            slacc = 0;
            hlacc = 0;
            avgel = Math.round(energyLevel/totalDataPoints);
            avgsl = Math.round(stressLevel/totalDataPoints);
            avghl = Math.round(happinessLevel/totalDataPoints);
            console.log("el: " + avgel);
            console.log("sl: " + avgsl);
            console.log("hl: " + avghl);
          }

          var canvas = document.getElementById('bargraph');
          if(canvas.getContext) {
            console.log("Get it");
            var context = canvas.getContext('2d');
            //context.fillRect(50,50,100,100);
            //context.clearRect(45,45,60,60);
            //context.strokeRect(50,50,50,50);
            console.log(context);
            var cwidth = canvas.width;
            var cheight = canvas.height;
            var offset = 20;
            var interval = (cheight - offset)/5
            var xinterval = cwidth / 3;

            context.clearRect(0, 0, cwidth, cheight);

            context.fillText("Energy Level", xinterval - 100, cheight - 10);
            context.fillText("Stress Level", xinterval * 2 - 100, cheight - 10);
            context.fillText("Happiness Level", xinterval * 3 - 100, cheight - 10);
            context.fillText("5", 0, offset);
            context.fillText("4", 0, interval * 1);
            context.fillText("3", 0, interval * 2);
            context.fillText("2", 0, interval * 3);
            context.fillText("1", 0, interval * 4);
            context.fillText("0", 0, interval * 5);

            context.moveTo(offset - 10, offset - 10);
            context.lineTo(offset - 10, cheight - offset);
            context.strokeStyle = "#000";
            context.stroke();
            context.moveTo(offset - 10, cheight - offset);
            context.lineTo(cwidth, cheight - offset);
            context.strokeStyle = "#000";
            context.stroke();

            if(haveItem) {
              var eBarH = cheight - offset;
              var eYCoor = 0;
              var sBarH = cheight - offset;
              var sYCoor = 0;
              var hBarH = cheight - offset;
              var hYCoor = 0;
              switch(avgel) {
                case 1:
                  eYCoor = interval * 4;
                  break;
                case 2:
                  eYCoor = interval * 3;
                  break;
                case 3:
                  eYCoor = interval * 2;
                  break;
                case 4:
                  eYCoor = interval * 1;
                  break;
                case 5:
                  eYCoor = offset;
                  break;

              }
              eBarH -= eYCoor;
              console.log("eBarH: " + eBarH);
              console.log("eYCoor " + eYCoor);

              switch(avgsl) {
                case 1:
                  sYCoor = interval * 4;
                  break;
                case 2:
                  sYCoor = interval * 3;
                  break;
                case 3:
                  sYCoor = interval * 2;
                  break;
                case 4:
                  sYCoor = interval * 1;
                  break;
                case 5:
                  sYCoor = offset;
                  break;

              }
              sBarH -= sYCoor;
              console.log("sBarH: " + sBarH);
              console.log("sYCoor " + sYCoor);

              switch(avghl) {
                case 1:
                  hYCoor = interval * 4;
                  break;
                case 2:
                  hYCoor = interval * 3;
                  break;
                case 3:
                  hYCoor = interval * 2;
                  break;
                case 4:
                  hYCoor = interval * 1;
                  break;
                case 5:
                  hYCoor = offset;
                  break;

              }
              hBarH -= hYCoor;
              console.log("hBarH: " + hBarH);
              console.log("hYCoor " + hYCoor);

              drawBar(context,xinterval - 122, eYCoor, eBarH);
              drawBar(context,xinterval * 2 - 122, sYCoor, sBarH);
              drawBar(context,xinterval * 3 - 118, hYCoor, hBarH);
            }
            else {}
          }
        }
    });
}


var drawBar = function(con, val1, val2, val3) {
  con.fillStyle = '#444';
  con.fillRect(val1,val2,100,val3);
}


/**
 *  TabView  
 */
var TabView = function(model) {
    // Obtains itself   
    var self = this;

    // Stores the model
    this.model = model;

    // Available tabs and divs
    this.nav_input_tab = document.getElementById('nav-input-tab');
    this.input_div = document.getElementById('input-div');

    this.nav_analysis_tab = document.getElementById('nav-analysis-tab');
    this.analysis_div = document.getElementById('analysis-div');

    // Binds tab view with model  
    this.nav_input_tab.addEventListener('click', function() {
        console.log('changing tab');
        model.selectTab('InputTab');
    });

    this.nav_analysis_tab.addEventListener('click', function() {
        model.selectTab('AnalysisTab');
    });

    // Binds model change with view
    this.model.addListener(function(eventType, eventTime, eventData) {
        if (eventType === TAB_SELECTED_EVENT)   {
            console.log(eventData);
            switch (eventData) {
                case 'InputTab':
                    self.nav_input_tab.className = "active";
                    self.nav_analysis_tab.className = "";
                    self.input_div.className = '';
                    self.analysis_div.className = 'hidden';
                    break;
                case 'AnalysisTab':
                    self.nav_analysis_tab.className = "active";
                    self.nav_input_tab.className = "";
                    self.input_div.className = 'hidden';
                    self.analysis_div.className = '';
                    break;
            }
        }
    });
}