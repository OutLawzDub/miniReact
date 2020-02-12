import { createElem, mountElement, unMountElement } from "./element.js";
import { Home } from "./src/Home.js";
import { Hello } from "./src/Hello.js";
import { Bye } from "./src/Bye.js";
import { NotFound } from "./src/NotFound.js";
import { Router } from "./router.js";

const home = createElem(Home, {});
const hello = user => {
  return createElem(Hello, {
    user: { name: user.user || "", age: user.age || "", sexe: user.sexe || "" }
  });
};
const bye = user => createElem(Bye, { user: { name: user.user || "" } });
const notFound = createElem(NotFound, {});

const Routing = new Router();
Routing.addToRoute("/", function() {
  mountElement(home, document.getElementById("root"));
})
  .addToRoute(/hello/, function() {
    mountElement(hello(this.params), document.getElementById("root"));
  })
  .addToRoute("/bye", function() {
    mountElement(bye(), document.getElementById("root"));
  })
  .addToRoute(/hello?user={{val}}/, function() {
    unMountElement();
    mountElement(hello(this.params), document.getElementById("root"));
  })
  .addToRoute(/bye?user={{val}}/, function() {
    mountElement(bye(this.params), document.getElementById("root"));
  });

Routing.navigate(location.pathname);

if (!Routing.navigate(location.pathname)) {
  unMountElement();
  mountElement(notFound, document.getElementById("root"));
}
