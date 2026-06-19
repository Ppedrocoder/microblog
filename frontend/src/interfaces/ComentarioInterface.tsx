import type { Autor } from "./AutorInterface";

// -----------------------------------
// Interface para Comentário
// -----------------------------------
export interface ComentarioInterface {
    id: string;
    autor: Autor;
    publicacao: string;
    mensagem: string;
    publicado_em: string;
}

