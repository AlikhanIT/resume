module.exports = class {
  email;
  name;
  id;
  role;
  phoneNumber;
  iin;
  avatar;
  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.id = model.id;
    this.role = model.role;
    this.phoneNumber = model.phoneNumber;
    this.iin = model.iin;
    this.avatar = model.avatar;
  }
};
