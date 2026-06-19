import {api} from "../common/ApiService";
import * as yup from "yup";
import schema from "../../pages/feed/index";
type FormDataPostagem = yup.InferType<typeof schema>;

class PostagemService {
    async getPostagens(): Promise<any[]> {
        try {
            const response = await api.get("/publicacao/");
            return response.data.results;
        } catch (error) {
            console.error("Erro ao buscar postagens:", error);
            throw error;
        }
    }
    async getPostagemById(id: number): Promise<any> {
        try {
            const response = await api.get(`/publicacao/${id}/`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar postagem:", error);
            throw error;
        }
    }
    async criarPostagem(postagemData: FormDataPostagem): Promise<any> {
        try {
            const response = await api.post("/publicacao/", postagemData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao criar postagem:", error);
            throw error;
        }
    }
}

export default new PostagemService();