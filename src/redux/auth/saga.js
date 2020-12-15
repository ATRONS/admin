import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  INITIAL_DATA_SUCCESS,
  INITIAL_DATA,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  loadInitialDataSuccess,
} from './actions';

import {
  adminRoot,
  currentUser,
  providerRoot,
} from '../../constants/defaultValues';
import { setCurrentUser, setToken } from '../../helpers/Utils';
import { apiAuth } from '../../services/api/auth';
import { setAxiosToken } from '../../services/api/core';
import { UserRole } from '../../helpers/authHelper';
import urls from '../../services/api/urls';
import { apiProfile } from '../../services/api/provider-related/profile';
import { apiProfile as apiProfileAdmin } from '../../services/api/profile';
import { date } from 'yup';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginResponse = yield call(apiAuth.login, email, password);
    console.log(loginResponse);
    // const loginUser = yield call(apiAuth.login, email, password);
    if (loginResponse.success) {
      const { token, user_info } = loginResponse.data;
      user_info.legalName = user_info.legal_name;
      user_info.isCompany = user_info.is_company;
      user_info.avatarUrl = urls.MAIN_URL + user_info.avatar_url;
      console.log('fffss', user_info);
      setCurrentUser(user_info);
      setToken(token);
      setAxiosToken(token);
      yield put(loginUserSuccess(user_info));
      const destURL =
        user_info.role == UserRole.Admin ? adminRoot : providerRoot;
      history.push(destURL);
    } else {
      yield put(loginUserError(loginResponse.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await apiAuth
    .logout()
    .then((user) => user)
    .catch((error) => error);
  // history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

function* loadInitialDataAsync({ payload }) {
  const loader =
    payload === UserRole.Admin
      ? apiProfileAdmin.initialData
      : apiProfile.initialData;

  try {
    const initialDataResponse = yield call(loader);
    if (initialDataResponse.success) {
      let userInfo = initialDataResponse.data.user_info;
      userInfo.avatarUrl = urls.MAIN_URL + userInfo.avatar_url;
      userInfo.pendingRequestsCount =
        initialDataResponse.data.pending_requests_count;

      yield put(loadInitialDataSuccess(userInfo));
    }
  } catch (error) {}
}

export function* watchLoadInitialData() {
  yield takeLatest(INITIAL_DATA, loadInitialDataAsync);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchLoadInitialData),
  ]);
}
