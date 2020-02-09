import { createElem, mountElement, unMountElement } from "./element.js";
import { Home } from "./src/Home.js";
import { Hello } from "./src/Hello.js";
import { Bye } from "./src/Bye.js";
import { NotFound } from "./src/NotFound.js";
import { Router } from "./router.js";

// console.log("{{user.name}}".interpolate({ user: { name: "tomas" } }));

const home = createElem(Home, {});
const hello = name => createElem(Hello, { user: { name: name || "" } });
const bye = name => createElem(Bye, { user: { name: name || "" } });
const notFound = createElem(NotFound, {});
// mountElement(myApp, document.getElementById("root"));
// mountElement(test, document.getElementById("root"));

// dans mount element quand tu tombes sur un type element tu fais un document create element
// text = document create text node

// et ceux la j'append child à mon élement
const Routing = new Router();
Routing.addToRoute(function() {
  unMountElement(home);
  mountElement(home, document.getElementById("root"));
})
  .addToRoute(/hello/, function() {
    unMountElement(hello());
    mountElement(hello(), document.getElementById("root"));
  })
  .addToRoute("/bye", function() {
    unMountElement(bye());
    mountElement(bye(), document.getElementById("root"));
  })
  //todo make a way to inject params or maybe do it with regex
  .addToRoute(/hello?user=sami/, function() {
    unMountElement(hello("sami"));
    mountElement(hello("sami"), document.getElementById("root"));
  })
  .addToRoute(/bye?user=sami/, function() {
    unMountElement(bye("sami"));
    mountElement(bye("sami"), document.getElementById("root"));
  })

Routing.navigate(location.pathname);
if (!Routing.navigate(location.pathname)) {
  unMountElement(notFound);
  mountElement(notFound, document.getElementById("root"));
}
