const NAME_REGEX = /([a-z]){1,100}/i;

const NICKNAME_REGEX = /([a-z]){1,30}/i;

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const PASSWORD_REGEX = /([a-z\d]){6,40}/i;

const TEXTO_REGEX = /([a-z\d]){1,400}/i;

const FONTE_REGEX =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

export const validarNickname = (nickname) => NICKNAME_REGEX.test(nickname);

export const validarNome = (email) => NAME_REGEX.test(email);

export const validarEmail = (email) => EMAIL_REGEX.test(email);

export const validarSenha = (senha) => PASSWORD_REGEX.test(senha);

export const arePasswordsEqual = (senha1, senha2) => senha1 === senha2;

export const validarTextoProposicao = (texto) => TEXTO_REGEX.test(texto);

export const validarFonteProposicao = (fonte) => FONTE_REGEX.test(fonte);
