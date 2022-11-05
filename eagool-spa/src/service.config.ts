import axios from 'axios';
import injector from 'vue-inject';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { StudyGroupsService } from './services/study-groups.service';

injector.constant(
  'axios',
  axios.create({
    baseURL: 'http://localhost/api/v1/',
    headers: {
      common: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  }),
);
injector.service('authService', 'axios', AuthService);
injector.service('usersService', 'axios', UsersService);
injector.service('studyGroupsService', 'axios', StudyGroupsService);

export default injector;
