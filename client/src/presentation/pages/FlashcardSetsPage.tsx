import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../infrastructure/api';

interface FlashcardSetListItem {
  _id: string;
  title: string;
  likes?: number;
  cards?: Array<{ word: string; meaning: string }>;
}

const FlashcardSetsPage: React.FC = () => {
  const [sets, setSets] = useState<FlashcardSetListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await apiClient.flashcardSets.getAll();
        setSets(res.data);
      } catch (e) {
        setError('Failed to load flashcard sets');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Flashcard Sets</h1>
          <Link to="/flashcard-sets/create" className="btn btn-primary">Create Set</Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="form-error">{error}</p>
        ) : sets.length === 0 ? (
          <p>No sets yet.</p>
        ) : (
          <div className="cards-grid">
            {sets.map(s => (
              <Link key={s._id} className="card hover:shadow-lg transition" to={`/flashcard-sets/${s._id}`}>
                <div className="flex items-start justify-between">
                  <div className="text-lg font-semibold">{s.title}</div>
                  <span className="badge">{s.likes ?? 0} likes</span>
                </div>
                <div className="muted mt-2">{(s.cards?.length ?? 0)} cards</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardSetsPage;

