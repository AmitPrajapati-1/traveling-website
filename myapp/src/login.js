import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useUser(); // Removed 'user' and 'logout' since they're no longer used
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost/myweb/login.php', { email, password });
            setMessage(response.data.message);
            if (response.data.success) {
                login(email);
                navigate('/dashboard'); // Navigate to dashboard after login
            }
        } catch (error) {
            setMessage('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost/myweb/register.php', { email, password });
            setMessage(response.data.message);
            if (response.data.success) {
                login(email);
                navigate('/dashboard'); // Navigate to dashboard after registration
            }
        } catch (error) {
            setMessage('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://th.bing.com/th/id/OIP.6tJFpwVuTqv3RtaqTdoTrQHaEK?rs=1&pid=ImgDetMain')",
            }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="flex items-center justify-center min-h-screen z-10">
                <div className="flex bg-white bg-opacity-50 rounded-2xl shadow-lg overflow-hidden w-3/4 max-w-4xl transform transition-all duration-500 hover:scale-105">
                    {/* Left Section */}
                    <div
                        className="w-1/2 bg-cover bg-center rounded-l-2xl"
                        style={{
                            backgroundImage:
                                "url('https://thumbs.dreamstime.com/z/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg')",
                        }}
                    >
                        <div className="h-full flex flex-col justify-center items-center bg-black bg-opacity-50 p-8 rounded-l-2xl">
                            <h1 className="text-white text-4xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s">
                                Travelista Tours
                            </h1>
                            <p className="text-white text-lg text-center animate__animated animate__fadeIn animate__delay-2s">
                                Travel is the only purchase that enriches you in ways beyond material wealth
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 p-8">
                        <h2 className="text-3xl font-bold text-blue-600 mb-6 animate__animated animate__fadeIn">
                            {isRegister ? 'Create Account' : 'Login to Your Account'}
                        </h2>
                        <p className="text-gray-700 mb-6 text-lg animate__animated animate__fadeIn animate__delay-2s">
                            {isRegister ? 'Create an account to get started' : 'Log in to access your dashboard'}
                        </p>

                        {/* Email Input */}
                        <div className="mb-5">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="w-full p-4 bg-white bg-opacity-70 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-lg"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="w-full p-4 bg-white bg-opacity-70 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-lg"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {message && (
                            <div className="text-center text-red-600 mb-4">
                                <p>{message}</p>
                            </div>
                        )}

                        {/* Login/Register Button */}
                        <button
                            onClick={isRegister ? handleRegister : handleLogin}
                            className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
                        </button>

                        {/* Switch between Login/Register */}
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 ease-in-out"
                            >
                                {isRegister ? 'Already have an account? Login' : 'New user? Register'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
