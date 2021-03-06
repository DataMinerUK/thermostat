var Thermostat = function() {

  this.temperature = 20;
  this.powerSaveMode = true;
};

Thermostat.prototype.show = function () {
  return this.temperature;
};

Thermostat.prototype.up = function () {
  if (this.powerSaveMode && this.temperature < 25) { this.temperature ++ };
  if (!this.powerSaveMode && this.temperature < 32) { this.temperature ++ };
};

Thermostat.prototype.down = function () {
  if (this.temperature > 10) {
    this.temperature -- ;
  }
};

Thermostat.prototype.changeMode = function () {
  this.powerSaveMode = !this.powerSaveMode;
};

Thermostat.prototype.reset = function() {
  this.temperature = 20;
};

Thermostat.prototype.setting = function() {
  if (this.temperature < 18){ return 'low'};
  if (this.temperature >= 18 && this.temperature <= 25 ){ return 'medium'};
  if (this.temperature > 25){ return 'high'};
};
