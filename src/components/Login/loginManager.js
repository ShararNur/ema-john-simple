import firebaseConfig from './firebase.config';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";


export const initializeLoginFramework = () => {
    initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            console.log(error);
            console.log(error.message);
        })
}

export const handleFbSignIn = () => {
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            user.success = true;
            return user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
}

export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
        .then((result) => {
            const SignedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return SignedOutUser;
        })
        .catch((error) => {

        })
}

export const createUserWithEmailAndPass = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            // Signed in 
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name)
            return newUserInfo;
            // const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPass = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            // Signed in 
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
            // const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        // Profile updated!
        console.log('user name updated successfully');
    }).catch((error) => {
        // An error occurred
        console.log(error)
    });
}