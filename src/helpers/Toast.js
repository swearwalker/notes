export default (vm, options) => {
  vm.$toast[options.type](options.title, options.options);
};
