import { memo } from "react";
import type { ComentarioInterface } from "../../interfaces/ComentarioInterface";
import formatarDataHora from "../../utils/formatarData";

interface ComentarioProps {
	comentarios: ComentarioInterface[];
}

export default memo(function ListaComentarios(props: ComentarioProps) {
	const { comentarios } = props;
	return (
		<>
			<div>
				<h3>Comentários</h3>
				{comentarios.map((comentario: ComentarioInterface) => (
					<div
						key={comentario.id}
						className="w-250"
					>
						<div>
							<h4 className="font-bold !text-lg mb-0">
								{comentario.autor.username}
							</h4>
							<span className="text-sm text-gray-500">
								{formatarDataHora(comentario.publicado_em)}
							</span>
						</div>
						<p>{comentario.mensagem}</p>
					</div>
				))}
			</div>
		</>
	);
})
