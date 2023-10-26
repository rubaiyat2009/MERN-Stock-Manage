import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useSelector(state => state.auth)
    if (!isLoading && !isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: location }} />
    }

    // authorized so return child components
    return children;
}