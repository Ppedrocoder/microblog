import { api } from "../common/ApiService";
import * as yup from "yup";
import schema from "../../pages/comentarios/index"
type FormDataComentario = yup.InferType<typeof schema>;
class ComentarioService {
    async getComentariosByPostagemId(postagemId: number) {
        try {
            const response = await api.get(`/publicacao/${postagemId}/comentarios/`);
            return response.data.results;
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
            throw error;
        }
    }
    async criarComentario(comentarioData: FormDataComentario) {
        try {
            const response = await api.post("/comentario/", comentarioData);
            return response;
        } catch (error) {
            console.error("Erro ao criar comentário:", error);
            throw error;
        }
    }
}

export default new ComentarioService();