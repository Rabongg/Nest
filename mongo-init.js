db.createUser(
  {
    user: "rabong",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "chat"
      }
    ]
  }
);