const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  _id: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  first_name: { type: String, required: true },
  last_name: { type: String, require: true },
  perms: { type: String, enum: ['user', 'admin'], default: 'user' },
  created_at: { type: String, require: true },
  updated_at: { type: String }
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next()
})

module.exports = model('users', UserSchema);