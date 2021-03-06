var temperatureOnSite = $('#temperature_on_site');
var thermostatInterface = new ThermostatInterface();

$(document).ready(function() {
  thermostatInterface.setTemperature();
  thermostatInterface.changeColour();

  $('#up').click(function() {
    thermostatInterface.thermostat.up();
    thermostatInterface.showTemp();
    postTemperatureToServer();
  });

  $('#down').click(function() {
    thermostatInterface.thermostat.down();
    thermostatInterface.showTemp();
    postTemperatureToServer();
  });

  $('label[for=power_save_mode').click(function() {
    thermostatInterface.thermostat.changeMode();
  });

  $('#reset').click(function() {
    thermostatInterface.thermostat.reset();
    thermostatInterface.showTemp();
  });

  $('#myonoffswitch').change(function() {
    $('div.thermostat').visibilityToggle();
  });

  var postTemperatureToServer = function() {
    $.post('/', { temperature: thermostatInterface.thermostat.show() });
  };

  jQuery.fn.visibilityToggle = function() {
      return this.css('visibility', function(i, visibility) {
          return (visibility == 'visible') ? 'hidden' : 'visible';
      });
  };

});

function ThermostatInterface() {
  this.thermostat = new Thermostat();
};

ThermostatInterface.prototype.setTemperature = function() {
  this.thermostat.temperature = temperatureOnSite.text();
};

ThermostatInterface.prototype.showTemp = function() {
  temperatureOnSite.html(this.thermostat.show());
  this.changeColour();
  this.shakeThatThang();
};

ThermostatInterface.prototype.changeColour = function() {
  if(this.thermostat.setting() === "low") { temperatureOnSite.css({'color': 'green'}) }
  if(this.thermostat.setting() === "medium") { temperatureOnSite.css({'color': 'orange'}) }
  if(this.thermostat.setting() === "high") { temperatureOnSite.css({'color': 'red'}) }
};

ThermostatInterface.prototype.shakeThatThang = function() {
  var temp = $('#temp');
  if(this.thermostat.temperature < 15) { temp.effect("shake") };
  if(this.thermostat.temperature > 29) { temp.effect("shake",{'direction':'up'}) };
};
