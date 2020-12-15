import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  INITIAL_DATA,
  INITIAL_DATA_SUCCESS,
  INITIAL_DATA_ERROR,
  UPDATE_PENDING_REQUEST_COUNT,
} from '../actions';
import { getCurrentUser } from '../../helpers/Utils';
import { isAuthGuardActive, currentUser } from '../../constants/defaultValues';

const INIT_STATE = {
  currentUser: getCurrentUser(),
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
  initialDataLoading: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: action.payload.message,
      };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '' };

    case INITIAL_DATA:
      return { ...state, initialDataLoading: true, error: '' };

    case INITIAL_DATA_SUCCESS:
      return {
        ...state,
        initialDataLoading: false,
        currentUser: { ...state.currentUser, ...action.payload },
      };
    case UPDATE_PENDING_REQUEST_COUNT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          pendingRequestsCount: state.currentUser.pendingRequestsCount - 1,
        },
      };
    }

    default:
      return { ...state };
  }
};
