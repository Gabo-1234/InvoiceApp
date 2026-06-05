const NewItemMake = (callback) => {
  if (typeof callback === "function") {
    callback();
  }
};

const showOptions = (setState) => {
  if (typeof setState === "function") {
    setState((prev) => !prev);
  }
};

const selectedOption = (value, callback) => {
  if (typeof callback === "function") {
    callback(value);
  }
};

export { NewItemMake, showOptions, selectedOption };
