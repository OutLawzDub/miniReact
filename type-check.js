function type_check_v1(arg1, arg2) {
  switch (typeof arg1) {
    case "object":
      if (Array.isArray(arg1)) return type === "array";
      if (arg1 === null) return type === "null";
    default:
      return typeof arg1 === arg2.toLowerCase();
  }
}

export function type_check_v2(arg1, object) {
  for (const key in object) {
    switch (key) {
      case "type":
        if (!type_check_v1(arg1, object[key]))
          return { res: false, msg: "Type incorrect" };
        break;
      case "value":
        if (JSON.stringify(arg1) !== JSON.stringify(object[key]))
          return { res: false, msg: "Les valeurs ne correspondent pas" };
        break;
      case "enum":
        if (
          object[key].filter(obj => {
            JSON.stringify(arg1) !== JSON.stringify(obj);
          })
        )
          return { res: false, msg: "ENUM INCORRECT" };
        break;
    }
  }
  return { res: true, msg: "Tout est carré!" };
}
