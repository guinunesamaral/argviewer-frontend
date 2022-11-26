const NAME_REGEX = /([a-z]){1,100}/i;

const NICKNAME_REGEX = /([a-z]){1,30}/i;

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const PASSWORD_REGEX = /([a-z\d]){6,40}/i;

const EMPTY_STRING = /[''\s]*/;

const TEXTO_REGEX = /([a-z\d]){1,400}/i;

const FONTE_REGEX =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

export const isNicknameValid = (nickname) => NICKNAME_REGEX.test(nickname);

export const isNameValid = (email) => NAME_REGEX.test(email);

export const isEmailValid = (email) => EMAIL_REGEX.test(email);

export const isPasswordValid = (senha) => PASSWORD_REGEX.test(senha);

export const arePasswordsEqual = (senha1, senha2) => senha1 === senha2;

export const isEmpty = (texto) => EMPTY_STRING.test(texto);

export const isTextValid = (texto) => TEXTO_REGEX.test(texto);

export const isSourceValid = (fonte) => FONTE_REGEX.test(fonte);
