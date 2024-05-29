// import
import { Navigate } from "react-router-dom";

function RequireAuth({children}) {
    const auth = sessionStorage.getItem("username") && sessionStorage.getItem("token") ? true : false;

    return auth === true ? children : <Navigate to="/" replace />;
}

export default RequireAuth;