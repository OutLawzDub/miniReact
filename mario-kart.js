// Pilote

function driver(origin) {
  this.origin = origin;
  var state = "ready";
  var oldData = "";

  this.receiveData = function(data) {
    oldData = { origin: this.origin, state: state };
    this.origin = data.origin || this.origin;
    state = data.state || state;
  };

  this.needUpdate = function() {
    return oldData.origin !== this.origin || oldData.state !== state;
  };

  this.getState = function() {
    return state;
  };

  this.speak = function() {
    switch (this.getState()) {
      case "ready":
        return "Here we go!";
        break;

      case "happy":
        return "Let's have some fun!";
        break;

      case "sad":
        return "Outch!!! Damn " + this.origin;
        break;

      case "normal":
        return "";
        break;

      default:
        return "no state";
    }
  };
}

let test = new driver("sami");

console.log("Turn 0");
if (test.needUpdate()) console.log(test.speak());

console.log("Turn 1");
test.receiveData({ state: "normal" });
if (test.needUpdate()) console.log(test.speak());

console.log("Turn 2");
test.receiveData({ state: "normal" });
if (test.needUpdate()) console.log(test.speak());

console.log("Turn 3");
test.receiveData({ state: "happy" });
if (test.needUpdate()) console.log(test.speak());

console.log("Turn 4");
test.receiveData({ state: "happy" });
if (test.needUpdate()) console.log(test.speak());

console.log("Turn 5");
test.receiveData({ state: "normal" });
if (test.needUpdate()) console.log(test.speak());

console.log("Turn 6");
test.receiveData({ state: "normal", origin: "Mario" });
if (test.needUpdate()) console.log(test.speak());

console.log("Turn 7");
test.receiveData({ state: "sad" });
if (test.needUpdate()) console.log(test.speak());

// Véhicule
weapons = ["tank", "bubble", "banana", "switch"];
confExample = {
  name: "Mario",
  number: "1",
  maxVelocity: "12"
};

function vehicle(conf) {
  var driver = conf.name;
  this.number = conf.number;
  const maxVelocity = conf.maxVelocity;
  let onFire = victim => {
    return victim;
  };

  var oldData = "";

  this.event = "start";
  this.value = null;
  this.competitors = {};
  this.distance = 0;

  var weapon = null;

  this.receiveData = function(data) {
    oldData = {
      event: this.event,
      value: this.value,
      competitors: this.competitors,
      distance: this.distance
    };

    this.event = data.event || this.event;
    this.value = data.value || this.value;
    this.competitors = data.competitors || this.competitors;
    this.distance = data.distance || this.distance;
  };

  this.needUpdate = function() {
    return (
      oldData.event !== this.event ||
      oldData.value !== this.value ||
      oldData.competitors !== this.competitors ||
      oldData.distance !== this.distance
    );
  };

  var ride = function(x) {
    this.distance = this.distance + x;
    // todo : signale au pilote le status "normal" si aucun autre status soulevé
    if (!driver.needUpdate()) {
      driver.receiveData({ state: "normal" });
    }
  };

  var getWeapon = function(weaponPickedUp) {
    weapon = weaponPickedUp;
    driver.receiveData({ state: "happy" });
    driver.needUpdate();
    ride(this.maxVelocity);
  };

  var fireWeapon = function() {
    ride(this.maxVelocity);
    //onFire revoir
    return onFire();
  };

  var touched = function(data) {
    if (this.event === "attack") {
      driver.receiveData({ state: "sad", origin: data.origin });
      driver.needUpdate();
    }
  };

  this.display = function() {
    return {
      distance: this.distance,
      weapon: weapons[Math.floor(Math.random() * 4)],
      pilote: driver,
      velocity: maxVelocity
    };
  };
}

let velicule = new vehicle(confExample);

velicule.receiveData({
  event: "weapon",
  weapon: true,
  competitors: {
    Mario: 132,
    Luigi: 140
  },
  distance: 147
});
if (test.needUpdate()) console.log(velicule.display());
