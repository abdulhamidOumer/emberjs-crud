module.exports = function (environment) {
  let ENV = {
    // Add options here
    fontawesome: {
      warnIfNoIconsIncluded: false,
      icons: {
        "free-solid-svg-icons": "all",
      },
    },
  };
  // ...
  return ENV;
};
