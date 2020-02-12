function type_check_v1(arg1, arg2) {
    // if (typeof arg1 === arg2.toLowerCase()) {
    //   if (arg2.toLowerCase() === "object" && Array.isArray(arg1)) return false;
    //   if (arg2.toLowerCase() === "object" && arg1 === null) return false;
    //   else return true;
    // } else {
    //   if (arg2.toLowerCase() === "array" && Array.isArray(arg1)) return true;
    //   if (arg2.toLowerCase() === "null" && arg1 === null) return true;
    //   else return false;
    // }
  
    switch (typeof arg1) {
      case "object":
        if (Array.isArray(arg1)) return type === "array";
        if (arg1 === null) return type === "null";
      default:
        return typeof arg1 === arg2.toLowerCase();
    }
  }
  
  export function type_check_v2(arg1, object) {
      for (key in object) {
        console.log(key);
      switch (key) {
        case "type":
          if (!type_check_v1(arg1, object[key])) return false;
          break;
        case "value":
          if (JSON.stringify(arg1) !== JSON.stringify(object[key])) return false;
          break;
        case "enum":
          if (
            object[key].filter(obj => {
              JSON.stringify(arg1) !== JSON.stringify(obj);
            })
          )
            return false;
          break;
      }
    }
    return true;
  }