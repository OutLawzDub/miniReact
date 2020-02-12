export class Router {
  routes = [];

  // Concat le path avec les paramètres
  getParams(path) {
    path = path + decodeURI(location.search);
    return this.cleanPath(path);
  }

  // Nettoie le chemin
  cleanPath(path) {
    var startsWithSlash = /^\//;
    var endsWithSlash = /\/$/;

    return path
      .toString()
      .replace(startsWithSlash, "")
      .replace(endsWithSlash, "");
  }

  // Ajout le chemin et la fonction associé à l'array routes
  addToRoute(path, callback) {
    if (typeof path == "function") {
      callback = path;
      path = "";
    }
    this.routes.push({ path: path ? path : "", callback: callback });
    return this;
  }

  // Gère la navigation, on check si le path fait bien partie de notre array routes, puis on change d'url
  navigate(path) {
    path = path ? this.getParams(path) : "";
    let m2,
      m3,
      m4,
      t = [];
    let reg1 = /\?([^=&]*)/;
    let reg2 = /\&([^=]*)/g;
    let reg3 = /\=([^=&]*)/g;

    let route = this.routes.filter(route => {
      m2 = path.match(reg1) ? path.match(reg1) : [];
      m3 = path.match(reg2) ? path.match(reg2) : [];
      m4 = path.match(reg3) ? path.match(reg3) : [];
      t = [m2[0]].concat(m3);

      let params = m4
        .map((m, index) => {
          return { [t[index].replace(/\?|&/, "")]: m.replace("=", "") };
        })
        .reduce(function(result, current) {
          return Object.assign(result, current);
        }, {});

        if (t[0] != undefined)
        t.forEach(x => {
          let rg = new RegExp(`${x.replace(/\?|&/, "")}`, "g");
          let rg2 = new RegExp(`${x.replace(/\?|&/, "")}={{val}}`, "g");
          if (rg.test(this.cleanPath(route.path))) {
            route.path = this.cleanPath(route.path).replace(
              rg2,
              x + "=" + params[x.replace(/\?|&/, "")]
            );
          }
        });

      route.path = this.cleanPath(route.path).replace("&&", "&");
      route.path = this.cleanPath(route.path).replace("??", "?");

      route.params = this.cleanPath(route.path) == path ? params : [];

      return this.cleanPath(route.path) == path;

    });

    if (route.length > 0) {
      history.pushState(null, null, path);
      route[0].callback(); // permet appel la fonction permettant de générer le component
    } else {
      return false;
    }
    return this;
  }
}
