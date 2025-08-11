import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../application/authContext';
import type { Vocabulary } from '../../domain/models';
import { apiClient } from '../../infrastructure/api'; // Adjust path
import { VocabularyCard } from '../components/VocabularyCard';

const VocabularyList: React.FC<{ vocabularies: Vocabulary[]; onLike: (id: string) => void }> = ({ vocabularies, onLike }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vocabularies.map(vocab => (
            <VocabularyCard key={vocab._id} {...vocab} onLike={onLike} />
        ))}
        </div>
    );
    };

    const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVocabularies = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.vocabulary.getAll();
            setVocabularies(response.data); // Assume response.data is Vocabulary[]
        } catch (err) {
            setError('Failed to load vocabularies. Please try again.');
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
        };
        fetchVocabularies();
    }, []);

    const handleLike = async (id: string) => {
        try {
            await apiClient.votes.create({ resourceId: id, type: 'upvote', onModel: 'Vocabulary' });
            setVocabularies(prev => prev.map(v => v._id === id ? { ...v, likes: (v.likes || 0) + 1 } : v));
        } catch (err) {
            console.error('Like error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <header className="mb-6">
            <h1 className="text-3xl font-bold text-blue-900">Welcome to Your Dashboard, {user?.username}!</h1>
            <p className="text-sm text-gray-600 mt-1">
            Level: {user?.level} | Points: {user?.points || 0} | Role: {user?.role}
            </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-800">Recent Vocabularies</h2>
                {user?.role === 'teacher' && (
                <Link to="/vocabulary/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Create Vocabulary
                </Link>
                )}
            </div>
            {isLoading ? (
                <p className="text-gray-500">Loading vocabularies...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : vocabularies.length === 0 ? (
                <p className="text-gray-500">No vocabularies yet. Start contributing!</p>
            ) : (
                <Suspense fallback={<p className="text-gray-500">Rendering list...</p>}>
                <VocabularyList vocabularies={vocabularies} onLike={handleLike} />
                </Suspense>
            )}
            </section>
            <aside className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <ul className="space-y-2">
                <li><Link to="/flashcard-sets" className="text-blue-600 hover:underline">Browse Flashcards</Link></li>
                <li><Link to="/profile" className="text-blue-600 hover:underline">View Profile</Link></li>
                {user?.role === 'teacher' && <li><Link to="/approve-content" className="text-blue-600 hover:underline">Approve Contributions</Link></li>}
            </ul>
            {/* Placeholder for future sections like progress or popular tags */}
            <div className="mt-6">
                <h4 className="text-md font-medium mb-2">Your Progress</h4>
                <p className="text-sm text-gray-600">Streak: 0 days (coming soon)</p>
            </div>
            </aside>
        </main>
        </div>
    );
};

export default DashboardPage;