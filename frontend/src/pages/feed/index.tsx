import { Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";

export default function Feed() {
    const { logout, isLogged, loading, user } = useAuth();
    function handleLogout() {
        logout();
    }
    if(!isLogged && !loading) {
        return <Navigate to="/login" />;
    }
    return (
        <>  
            <NavBar action={handleLogout} nome={user?.username || "Usuário"} />
        </>
    )
}