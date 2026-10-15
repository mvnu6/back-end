const { Client } = require('pg');

function getConnection(username, database) {
  return new Client({
    host: 'localhost',
    user: process.env.dbuser,
    password: process.env.dbpwd,
    database: database,
    port: 5432,
  });
}

function getUsers(callback) {
  const client = getConnection('postgres', 'mabase');

  client.connect()
    .then(() => client.query('SELECT * FROM users'))
    .then((res) => {
      client.end();
      callback(null, res.rows);
    })
    .catch((err) => {
      client.end();
      callback(err, null);
    });
}

function insert_user(user, callback) {
  const client = getConnection('postgres', 'mabase');

  client.connect()
    .then(() => {
      const queryText = 'INSERT INTO users (email) VALUES ($1) RETURNING *';
      return client.query(queryText, [user.email]);
    })
    .then((res) => {
      client.end();
      if (callback) callback(null, res.rows[0]);
    })
    .catch((err) => {
      client.end();
      if (callback) callback(err, null);
    });
}


// insert_user({ email: 'nouvel_email@test.com' }, (err, newUser) => {
//   if (err) {
//     console.error('Erreur d\'insertion :', err.stack);
//   } else {
//     console.log('Utilisateur ajouté avec succès :', newUser);
//   }
// });


getUsers((err, users) => {
  if (err) {
    console.error('Erreur :', err.stack);
  } else {
    console.log('Utilisateurs :', users);
  }
});