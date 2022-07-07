/**
 * @typedef {Object} UsersType
 * @prop {string} _id
 * @prop {string} email
 * @prop {string} password
 * @prop {string} first_name
 * @prop {string} last_name
 * @prop {'user' | 'admin'} perms
 * @prop {string} created_at
 * @prop {string | null} updated_at
 * @param {UsersType[]} usersArray

 * @typedef {Object} UsersReturn
 * @prop {string} email
 * @prop {'user' | 'admin'} perms
 * @prop {string} created_at
 * @prop {string | null} updated_at
 * @returns {UsersType[]}
 */

module.exports = (usersArray) => {
  const users = [];
  let amount = 20;

  for (let num = 0; num < usersArray.length; num += 20) {
    const current = usersArray.slice(num, amount);
    let position = num;
    amount += 20;

    const description = current.map((user) => {
      return {
        position: ++position,
        email: user.email,
        perms: user.perms,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }
    });

    users.push(description);
  } return users;
};
