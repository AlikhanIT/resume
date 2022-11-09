module.exports = class {
  email;
  name;
  id;
  role;
  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.id = model.id;
    this.role = model.role;
  }
};
