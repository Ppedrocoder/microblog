export interface ComentarioInterface {
    id: string;
    autor: Autor;
    publicacao: string;
    mensagem: string;
    publicado_em: string;
}

interface Autor {
    id: string;
    username: string;
    nome: string;
}