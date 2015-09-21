'use strict';

/*
Put any interaction code here
 */

var initOptions = function() {
	  document.getElementById('table summary').style.display = 'block';
    document.getElementById('bar graph').style.display = 'none';
}

/*var initData = function() {

}*/

window.addEventListener('load', function() {
  // You should wire up all of your event handling code here, as well as any
  // code that initiates calls to manipulate the DOM (as opposed to responding
  // to events)
  var tabView = new TabView(new TabModel()); 
  var acModel = new ActivityCollectionModel();
  var dataView = new DataView(acModel);
  var gModel = new GraphModel();
  var optionView = new OptionView(gModel);
  var graphView = new GraphView(acModel);
  
  initOptions();
  //console.log(document.getElementById('bar graph'));
  var dataInput = document.getElementById('dataInput');
  dataInput.addEventListener('submit', function(event) {
      var type = document.getElementById('allactivity');
      var index = type.selectedIndex;
      var option = type.options[index].text;

      var el = document.getElementById('energy').value;
      var sl = document.getElementById('stress').value;
      var hl = document.getElementById('happiness').value;
      var time = document.getElementById('time').value;
      console.log(el);
      var dict = {
      	EnergyLevel: el,
      	StressLevel: sl,
      	HappinessLevel: hl
      };

      //create new input
      var newInput = new ActivityData(option, dict, time);
      acModel.addActivityDataPoint(newInput);

      //get last data entry
      var dateNow = new Date();
      document.getElementById('lastsubmit').innerHTML = "Last data entry: " + 
                                                        [dateNow.toDateString(), 
                                                        dateNow.toLocaleTimeString()].join(' ');

      //reset the input
      dataInput.reset();
    }
  );

  var optionView = document.getElementById('viewoption');
  optionView.addEventListener('change', function() {
      var index = optionView.selectedIndex;
      var option = optionView.options[index].text;
      console.log(option);
      gModel.selectGraph(option);
    }
  );
  // Instantiate a TabView and a TabModel, then bind them together.
  //var tabView = new TabView(new TabModel()); 
});

