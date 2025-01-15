import {useGlobal} from "../contexts/GlobalContext.jsx";
import styles from './Navbar.module.css';
import {useLocation} from "react-router";

const Navbar = () => {
    const {wishlist} = useGlobal();
    const location = useLocation();

    return (<nav className={styles.navbar}>
        <ul>
            <li>
                <a href="/" className={location.pathname === '/' ? styles.active : ''}>
                    Home
                </a>
            </li>
            <li>
                <a href="/wishlist" className={location.pathname === '/wishlist' ? styles.active : ''}>
                    Wishlist ({wishlist.length})
                </a>
            </li>
        </ul>
    </nav>);
};

export default Navbar;
