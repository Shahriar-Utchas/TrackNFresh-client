import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {

    const [user, SetUser] = useState(null);
    const [loading, SetLoading] = useState(true);


    // Google login
    const GoogleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        return signInWithPopup(auth, GoogleProvider);
    };
    // Logout
    const logout = () => {
        SetLoading(true);
        auth.signOut()
            .then(() => {
                SetUser(null);
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };


    // Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                SetUser(user);
                SetLoading(false);
            } else {
                SetUser(null);
                SetLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);


    const authData = {
        user,
        loading,
        SetUser,
        handleGoogleLogin,
        logout,
    };

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};
export default AuthProvider;