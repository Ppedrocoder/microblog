import Logo from "../../assets/images/logo-pnp-pura.png"
import Avatar from "../../assets/images/avatar.svg"
interface NavBarProps {
    nome: string;
    action?: () => void;
}
export default function NavBar(props: NavBarProps) {
    
    return (
        <>  
            <div className="grid grid-cols-1 w-full h-full">
                <div className="br-header compact grid-cols-3">
                    <div className="w-full h-full flex items-center justify-start pl-12">
                        <button className="br-button small circle" type="button" aria-label="Menu" data-toggle="menu" data-target="#main-navigation" id="menu-compact"><i className="fa fa-bars" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <img src={Logo} alt="Microblog" className="w-30 h-14"/>
                    </div>
                    <div className="w-full h-full flex items-center justify-end pr-12">
                        <div className="flex flex-col items-center gap-2 h-full">
                            <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full"/>
                            <p>Olá, {props.nome}</p>
                        </div>
                        <button onClick={props.action} className="br-button primary small ml-4" type="button">Sair</button>
                    </div>
                </div>
            </div>
        </>
    )
}