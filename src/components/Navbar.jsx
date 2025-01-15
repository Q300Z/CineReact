import {useGlobal} from "../contexts/GlobalContext.jsx";

const Navbar = () => {
    const {wishlist} = useGlobal();

    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/wishlist">Wishlist ({wishlist.length})</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
