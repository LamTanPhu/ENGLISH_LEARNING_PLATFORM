import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../application/authContext';
import type { Vocabulary } from '../../domain/models';
import { apiClient } from '../../infrastructure/api'; // Adjust path
import { VocabularyCard } from '../components/VocabularyCard';

const VocabularyList: React.FC<{ vocabularies: Vocabulary[]; onLike: (id: string) => void }> = ({ vocabularies, onLike }) => {
    return (
        <div className="cards-grid">
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

    // Placeholder for AI generation (bonus: integrate xAI API via backend)
    const handleGenerateAI = async () => {
        try {
            // Example: Call backend endpoint that uses xAI API
            const response = await apiClient.ai.generateVocab({ prompt: 'Suggest 5 English words for beginners' });
            // Add to vocabularies or show modal
            console.log('AI Generated:', response.data);
        } catch (err) {
            console.error('AI error:', err);
        }
    };

    return (
        <div className="page">
            <div className="container dashboard-container">
                <header className="page-header mb-6">
                    <h1 className="text-3xl font-bold">Welcome to Your Dashboard, {user?.username}!</h1>
                    <p className="muted mt-1">
                        Level: {user?.level} | Points: {user?.points || 0} | Role: {user?.role}
                    </p>
                </header>
                <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <section className="md:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-primary-color">Recent Vocabularies</h2>
                            {user?.role === 'teacher' && (
                                <Link to="/vocabulary/create" className="btn btn-primary">
                                    Create Vocabulary
                                </Link>
                            )}
                            {/* Bonus AI Button */}
                            <button onClick={handleGenerateAI} className="btn btn-secondary ml-2">
                                Generate AI Vocab
                            </button>
                        </div>
                        {isLoading ? (
                            <p className="muted">Loading vocabularies...</p>
                        ) : error ? (
                            <p className="form-error">{error}</p>
                        ) : vocabularies.length === 0 ? (
                            <p className="muted">No vocabularies yet. Start contributing!</p>
                        ) : (
                            <Suspense fallback={<p className="muted">Rendering list...</p>}>
                                <VocabularyList vocabularies={vocabularies} onLike={handleLike} />
                            </Suspense>
                        )}
                    </section>
                    <aside className="card">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <ul className="space-y-2">
                            <li><Link to="/flashcard-sets" className="auth-link a">Browse Flashcards</Link></li>
                            <li><Link to="/profile" className="auth-link a">View Profile</Link></li>
                            {user?.role === 'teacher' && <li><Link to="/approve-content" className="auth-link a">Approve Contributions</Link></li>}
                        </ul>
                        <div className="mt-6">
                            <h4 className="text-md font-medium mb-2">Your Progress</h4>
                            <p className="muted">Streak: 0 days (coming soon)</p>
                            {/* Simple progress visualization */}
                            <div className="bg-tertiary h-2 rounded-full mt-2">
                                <div className="bg-success-color h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;