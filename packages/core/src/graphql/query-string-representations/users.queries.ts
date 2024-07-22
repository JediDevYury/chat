const USER = `query getUser($userId: ID!) {
  user(id: $userId) {
    email
    fullName
    id
  }
}`

const USERS = `query getUsers {
  users {
    email
    fullName
    id
    createdAt
  }
}`

const UPDATE_USER = `mutation updateUser($updateUserId: ID!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
    id
    fullName
    email
  }
}`

export default { USERS, USER, UPDATE_USER }
