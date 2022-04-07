const notAllowSpaces = (value, valueName) => {
  if (value.includes(" ")) {
    throw new Error(`${valueName} should not include spaces`);
  } else {
    return true;
  }
};

module.exports = {
  notAllowSpaces,
};
