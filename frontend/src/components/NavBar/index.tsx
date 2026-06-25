import Logo from "../../assets/images/logo-pnp-pura.png";
import Avatar from "../../assets/images/avatar.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { memo, useEffect } from "react";
import BrButton from "../Button";

/**
 * Componente de Barra de Navegação (`BrNavBar`), utilizado para exibir uma barra de navegação na página.
 *
 * Suporta a exibição do logo, avatar do usuário e opções de navegação.
 *
 * @param nome - O nome do usuário logado.
 *
 * @returns Um elemento JSX representando a barra de navegação.
 *
 * @example
 * ```tsx
 * <BrNavBar nome="Pedro Ricardo" />
 * ```
 *
 * @author Pedro Ricardo
 * @since 25/06/2026
 * @updated 25/06/2026
 * @version 1.0.0
 */

interface NavBarProps {
	nome: string;
}
export default memo(function BrNavBar(props: NavBarProps) {
	const { logout, isLogged, loading } = useAuth();
	function handleLogout() {
		logout();
	}
	useEffect(() => {
		if (!isLogged && !loading) {
			window.location.href = "/login";
		}
	}, [isLogged, loading]);
	return (
		<>
			<div className="z-100 grid grid-cols-1 w-full h-25 fixed top-0 left-0">
				<div className="br-header compact grid-cols-3">
					<div className="w-full h-full flex items-center justify-start pl-12">
						<button
							className="br-button small circle"
							type="button"
							aria-label="Menu"
							data-toggle="menu"
							data-target="#main-navigation"
							id="menu-compact"
						>
							<i
								className="fa fa-bars"
								aria-hidden="true"
							></i>
						</button>
					</div>
					<div className="w-full h-full flex items-center justify-center">
						<Link to="/">
							<img
								src={Logo}
								alt="Microblog"
								className="w-30 h-14"
							/>
						</Link>
					</div>
					<div className="w-full h-full flex items-center justify-end pr-10">
						<div className="flex flex-col items-center gap-2 h-full">
							<img
								src={Avatar}
								alt="Avatar"
								className="w-10 h-10 rounded-full"
							/>
							<p>Olá, {props.nome}</p>
						</div>
						<BrButton
							className="primary small ml-4"
							children="Sair"
							action={handleLogout}
						/>
					</div>
				</div>
			</div>
		</>
	);
});
