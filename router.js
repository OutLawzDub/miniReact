export class Router {
  routes = [];

  // Concat le path avec les paramètres
  getParams(path) {
    path = path + location.search;

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

    let route = this.routes.filter(route => this.cleanPath(route.path) == path);
    if (route.length > 0) {
      history.pushState(null, null, path);
      route[0].callback(); // permet appel la fonction permettant de générer le component
    } else {
      return false;
    }
    return this;
  }
}
