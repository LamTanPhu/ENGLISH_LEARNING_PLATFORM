import React, { useEffect } from 'react';
import { VocabularyCard } from '../components/VocabularyCard';
import { useAuth } from '../../application/authContext';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    useEffect(() => {
        // Placeholder until VocabularyUseCase is implemented
        console.log('Fetching vocabularies...');
    }, []);

    return (
        <div>
        <h1>Dashboard</h1>
        {user?.role === 'teacher' && <p><a href="/create">Create Content</a></p>}
        {/* Placeholder for vocabularies - will populate later */}
        <p>No vocabularies loaded yet.</p>
        </div>
    );
};

export default DashboardPage;