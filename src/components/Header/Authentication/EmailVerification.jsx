import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        
        const verifyEmail = async () => {
            try {
                const response = await apiClient.get(`/auth/verify-email?token=${token}`);
                alert(response.data);
                setTimeout(() => navigate('/login'), 3000);
            } catch (error) {
                alert('이메일 인증에 실패했습니다.');
                console.error('Verification failed:', error.response.data);
            }
        };

        if (token) {
            verifyEmail();
        } else {
            console.error('No token provided in URL');
        }
    }, [token, navigate]);

    return (
        <div>
            <h2>{message}</h2>
        </div>
    );
};

export default EmailVerification;
