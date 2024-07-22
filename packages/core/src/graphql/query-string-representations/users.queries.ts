const USER = `query getUser($userId: ID!) {
  user(id: $userId) {
    email
    fullName
    id
    createdAt
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

const DELETE_USER = `mutation deleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    id
    fullName
    email
    createdAt
  }
}`

export default {USERS, USER, UPDATE_USER, DELETE_USER}
