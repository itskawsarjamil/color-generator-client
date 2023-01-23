import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../../configs/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const Provider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        setLoading(true);
        console.log("first")
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const updateProfileName = ( nameObj ) => {
        console.log(nameObj);
        setLoading(true);
        return updateProfile(auth.currentUser,nameObj);
    }

    const verifymail = () => {
        setLoading(true);
        console.log(auth);
        return sendEmailVerification(auth.currentUser);
    }

    const emailSignIn = (email, password) => {
        console.log(loading);
        setLoading(true);
        console.log(loading);
        console.log("Inside email signin function");
        return signInWithEmailAndPassword(auth, email, password);

    }

    const GoogleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, Provider);

    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const forgetPassword = ( email ) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setUser(user);
            setLoading(false);
            console.log("inside of observer");


        });

        return () => {
            console.log("cleanup section");
            return unsubscribe();
        };
    }, [])

    const authValue = {
        GoogleSignIn,
        signup,
        setUser,
        user,
        verifymail,
        updateProfileName,
        setLoading,
        logout,
        forgetPassword,
        emailSignIn
    };
    return (
        <div>
            <AuthContext.Provider value={authValue}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;