export class User {
    constructor(
        id,
        nome,
        nickname,
        email,
        senha,
        foto,
        eloId,
        anonimo,
        moderador
    ) {
        this.id = id;
        this.nome = nome;
        this.nickname = nickname;
        this.email = email;
        this.senha = senha;
        this.foto = foto;
        this.eloId = eloId;
        this.anonimo = anonimo;
        this.moderador = moderador;
    }
}
