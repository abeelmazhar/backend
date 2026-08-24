export interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  {
    id: 1,
    name: "Ali",
    email: "ali@gmail.com",
  },
  {
    id: 2,
    name: "Ahmed",
    email: "ahmed@gmail.com",
  },
];

export const getUsers = () => {
  return users;
};

export const getUserById = (id: number) => {
  return users.find((user) => user.id === id);
};

export const createUser = (name: string, email: string) => {
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  return newUser;
};

export const updateUser = (id: number, data: Partial<Omit<User, "id">>) => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    return undefined;
  }

  if (data.name !== undefined) {
    user.name = data.name;
  }

  if (data.email !== undefined) {
    user.email = data.email;
  }

  return user;
};

export const deleteUser = (id: number) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return undefined;
  }

  const deletedUser = users[userIndex];

  users.splice(userIndex, 1);

  return deletedUser;
};
