import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Eye, EyeOff, Mail, Lock, User, Image, AlertCircle, DiamondPlus } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import LottieLogin from '../assets/login.json'
import { AuthContext } from "@/provider/AuthProvider";

const Register = () => {
    const { createNewUser, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPhotoFocused, setIsPhotoFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password should be at least 6 characters";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password should have at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password should have at least one lowercase letter";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");

        setError({});

        if (name.length < 3) {
            setError({ name: "Name should be more than 3 characters" });
            setIsLoading(false);
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError({ password: passwordError });
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create user in Firebase
            const userCredential = await createNewUser(email, password);
            const user = userCredential.user;
            setUser(user);

            // 2. Update user profile in Firebase
            await updateUserProfile({ displayName: name, photoURL: photo });

            // 3. Create user in your backend
            const newUser = { Name: name, Email: email, Photo: photo };
            const response = await fetch('http://localhost:5000/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to register user in backend');
            }

            toast.success("Registered successfully!");
            navigate(location?.state ? location.state : "/");

        } catch (err) {
            console.error("Registration error:", err);
            setError({ register: err.message });
            toast.error(err.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            setUser(user);

            // Check if user exists in backend, if not create them
            const checkUserResponse = await fetch(`http://localhost:5000/users/${user.email}`);
            
            if (checkUserResponse.status === 404) {
                // User doesn't exist in backend, create them
                const newUser = {
                    Name: user.displayName,
                    Email: user.email,
                    Photo: user.photoURL
                };

                await fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });
            }

            toast.success("Signed in successfully with Google!");
            navigate(location?.state ? location.state : "/");
        } catch (err) {
            console.error("Google sign-in error:", err);
            setError({ google: err.message });
            toast.error(err.message || "Google sign-in failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex flex-col md:flex-row items-center justify-center p-6 pb-10">
            <div className="w-full md:w-1/2 max-w-md transform hover:scale-105 transition-transform duration-500">
                <div className="w-full max-w-sm mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                    <Lottie animationData={LottieLogin} loop={true} />
                </div>
            </div>
            
            <div className="w-full md:w-1/2 max-w-md z-10">
                <div className="bg-white/80 dark:bg-gray-800 glass backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full transform transition-all duration-300 hover:shadow-2xl">
                    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">
                        Create Account
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Register to start your journey</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <div className={`relative group ${isNameFocused ? 'focused' : ''}`}>
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-white group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600"
                                    required
                                    onChange={() => setError((prev) => ({ ...prev, name: null }))}
                                    onFocus={() => setIsNameFocused(true)}
                                    onBlur={() => setIsNameFocused(false)}
                                />
                                <label className="absolute left-10 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200">
                                    Full Name
                                </label>
                            </div>
                            {error.name && (
                                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{error.name}</span>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <div className={`relative group ${isEmailFocused ? 'focused' : ''}`}>
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-white group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600"
                                    required
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />
                                <label className="absolute left-10 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200">
                                    Email Address
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <div className={`relative group ${isPhotoFocused ? 'focused' : ''}`}>
                                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-white group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="photo"
                                    type="url"
                                    placeholder="Enter photo URL"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600"
                                    required
                                    onFocus={() => setIsPhotoFocused(true)}
                                    onBlur={() => setIsPhotoFocused(false)}
                                />
                                <label className="absolute left-10 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200">
                                    Photo URL
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <div className={`relative group ${isPasswordFocused ? 'focused' : ''}`}>
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-white group-hover:text-primary transition-colors duration-200" />
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600"
                                    required
                                    onChange={() => setError((prev) => ({ ...prev, password: null }))}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <label className="absolute left-10 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200">
                                    Password
                                </label>
                            </div>
                            {error.password && (
                                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{error.password}</span>
                                </div>
                            )}
                        </div>

                        {error.register && (
                            <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error.register}</span>
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-dark transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <DiamondPlus className="w-6 h-6 inline mr-1" />
                                    Create Account
                                </>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:outline-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                            disabled={isLoading}
                        >
                            <FaGoogle className="text-xl text-primary" />
                            <span className="text-gray-700 dark:text-gray-200 font-medium">Continue with Google</span>
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <Link 
                            to="/auth/login" 
                            className="text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                        borderRadius: '10px',
                        padding: '16px',
                    },
                }}
            />
        </div>
    );
};

export default Register;