import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {

    const [user, SetUser] = useState(null);
    const [loading, SetLoading] = useState(true);

    // Create user with email and password
    const createUser = async (email, password, name, photoURL) => {
        SetLoading(true);
        const finalPhoto = photoURL || 'https://www.paralysistreatments.com/wp-content/uploads/2018/02/no_profile_img.png';

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: finalPhoto,
            });

            const newUser = {
                uid: user.uid,
                name,
                email,
                photoURL: finalPhoto,
            };

            // Send user data to the server
            await axios.post(`http://localhost:3000/auth/register`, newUser);

            // SetUser({ ...user, displayName: name, photoURL: finalPhoto });
            return true;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        } finally {
            SetLoading(false);
        }
    };


    // Login with email and password
    const loginWithEmail = (email, password) => {
        SetLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
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
        loginWithEmail,
        handleGoogleLogin,
        logout,
        createUser,
    };

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};
export default AuthProvider;