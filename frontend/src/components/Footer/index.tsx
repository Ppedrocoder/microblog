import { memo } from "react";

/**
 * Componente de Rodapé (`BrFooter`), utilizado para exibir informações de rodapé na página.
 *
 * Suporta a exibição de marca, informações de contato e links úteis.
 *
 * @returns Um elemento JSX representando o rodapé da página.
 *
 * @example
 * ```tsx
 * <BrFooter />
 * ```
 *
 * @author Pedro Ricardo
 * @since 25/06/2026
 * @updated 25/06/2026
 * @version 1.0.0
 */

export default memo(function BrFooter() {
	return (
		<>
			<footer className="br-footer">
				<div className="container-lg"></div>
				<span className="br-divider my-3"></span>
				<div className="container-lg">
					<div className="info">
						<div className="text-down-01 text-medium pb-3">
							<strong>PNP Hub</strong>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
})
