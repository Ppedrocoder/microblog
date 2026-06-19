import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComentarioService from "../../services/models/ComentarioService";
import type { ComentarioInterface } from "../../interfaces/ComentarioInterface";

interface ComentarioFormProps {
	postagemId: string;
	setComentarios: React.Dispatch<React.SetStateAction<ComentarioInterface[]>>;
}

const schema = yup.object().shape({
	mensagem: yup.string().required("O comentário é obrigatório"),
});

type FormDataComentario = yup.InferType<typeof schema>;

export default function BrComentarioForm(props: ComentarioFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });
	function onSubmit(data: FormDataComentario) {
		const enviarComentario = async () => {
			try {
				const response = await ComentarioService.criarComentario({
					...data,
					publicacao: Number(props.postagemId),
				});
				reset();
				props.setComentarios((prevComentarios) => [
					{
						id: response.data.id,
						autor: response.data.autor,
						publicacao: response.data.publicacao,
						mensagem: response.data.mensagem,
						publicado_em: response.data.publicado_em,
					},
					...prevComentarios,
				]);
				console.log("Comentário enviado com sucesso");
			} catch (error) {
				console.error("Erro ao enviar comentário:", error);
			}
		};
		enviarComentario();
	}
	return (
		<>
			<div className="w-250 flex justify-center items-center z-0">
				<div className="br-modal w-120 h-55 flex flex-col justify-center items-center border border-transparent rounded-3xl">
					<form
						className="w-full h-full flex flex-col justify-center items-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="br-textarea w-100 mt-4">
							<label htmlFor="textarea-id1">Comentário</label>
							<textarea
								className="w-full resize-none"
								{...register("mensagem")}
								id="textarea-id1"
								placeholder="Escreva seu comentário aqui..."
							></textarea>
							<div className="h-8">
								{errors.mensagem && (
									<p className="!text-red-500">
										{errors.mensagem.message}
									</p>
								)}
							</div>
						</div>
						<button
							className="br-button primary !w-25 mb-4"
							onClick={handleSubmit(onSubmit)}
						>
							Enviar
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
