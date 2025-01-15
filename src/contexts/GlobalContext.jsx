import React, {createContext, useContext, useEffect, useState} from "react";

// Crée le contexte
const GlobalContext = createContext(undefined);

const WISHLIST_STORAGE_KEY = 'movieWishlist';

// Fournisseur du contexte
const GlobalProvider = ({children}) => {
    const [token, setToken] = useState("9995ccfe9d6d3c53afa2cbc8530a25f5"); // Token API
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }, [wishlist]);
    // Gestion de l'ajout dans la wishlist
    const onAddWishlist = (movie) => {
        if (!wishlist.find((m) => m.id === movie.id)) {
            setWishlist([...wishlist, movie]);
        }
    };

    const onRemoveWishlist = (movie) => {
        setWishlist(wishlist.filter((m) => m.id !== movie.id));
    };

    // Vérifie si un film est dans la wishlist
    const isInWishlist = (movie) => wishlist.some((m) => m.id === movie.id);

    const debounce =(func, timeout = 300)=>{
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }


    return (
        <GlobalContext.Provider value={{
            token, setToken,
            wishlist,
            onAddWishlist, onRemoveWishlist,
            isInWishlist, debounce
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error('useGlobal must be used within GloablProvider');
    return context;
};

export default GlobalProvider;