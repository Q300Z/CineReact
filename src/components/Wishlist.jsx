import { useGlobal } from "../contexts/GlobalContext.jsx";
import {Link} from "react-router";

const Wishlist = () => {
    const { wishlist, onRemoveWishlist } = useGlobal();

    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <h2>Wishlist</h2>
                <p>Total de films : {wishlist.length}</p>
            </div>
            {/* Affichage des films */}
            {wishlist.length === 0 ? (
                <p>Aucun film dans la wishlist</p>
            ) : (
                <div>
                    {wishlist.map((movie) => (
                        <div
                            key={movie.id}
                            style={{
                                border: "1px solid #ccc",
                                margin: "10px",
                                padding: "10px",
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <div>
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                        alt={movie.title}
                                        style={{ marginRight: "10px" }}
                                    />
                                )}
                                <Link to={`/movie/${movie.id}`} style={{ color: "#007BFF", textDecoration: "none" }}>
                                    Plus de détails
                                </Link>
                            </div>
                            <button
                                onClick={() => onRemoveWishlist(movie)}
                                style={{
                                    marginLeft: "auto",
                                    backgroundColor: "#FF4136",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Wishlist;
