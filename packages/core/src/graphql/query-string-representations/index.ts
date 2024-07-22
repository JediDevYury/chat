import users from './users.queries'
import auth from './auth.queries';

export default {
  ...users,
  ...auth
}
