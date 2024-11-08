import React, { Fragment } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import useAuth from 'hooks/useAuth';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import 'winbox/dist/css/winbox.min.css';
import 'assets/css/custom.css'


const App = () => {
    window.keympload = process.env.REACT_APP_MAP_KEY;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem('soliapp_Access_key')}` };
    const { isAuth } = useAuth();

    window.Pusher = Pusher;
    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: process.env.REACT_APP_REVERB_APP_KEY,
        wsHost: process.env.REACT_APP_REVERB_HOST,
        wsPort: process.env.REACT_APP_REVERB_PORT ?? 8345,
        wssPort: process.env.REACT_APP_REVERB_PORT ?? 8345,
        //wsPath: process.env.REACT_APP_REVERB_PATH ?? "/",
        forceTLS: (process.env.REACT_APP_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws','wss'],
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios.post('/api/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                    .then(response => {
                        callback(null, response.data);
                    })
                    .catch(error => {
                        callback(error);
                    });
                }
            };
        },
    });

    return (
        <Routes>
            {!isAuth && (
                <Fragment>
                    <Route path="/" element={<AuthLayout />} />
                    <Route path="/auth/*" element={<AuthLayout />} />
                    <Route path="*" element={<Navigate to="/auth/login" replace />} />
                </Fragment>
            )}
            {isAuth && (
                <Fragment>
                    <Route path="/admin/*" element={<AdminLayout />} />
                    <Route path="*" element={<Navigate to="/admin/index" replace />} />
                </Fragment>

            )}
        </Routes>
    )
}

export default App