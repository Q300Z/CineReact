import { useGlobal } from "../contexts/GlobalContext.jsx";
import styles from './Navbar.module.css';
import {Link, useLocation} from "react-router";


const Navbar = () => {
    const { wishlist } = useGlobal();
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
                        Accueil
                    </Link>
                </li>
                <li>
                    <Link to="/wishlist" className={location.pathname === '/wishlist' ? styles.active : ''}>
                        Liste de souhaits ({wishlist.length})
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
