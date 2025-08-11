import React from 'react';
import type { Vocabulary } from '../../domain/models';

interface VocabularyCardProps extends Vocabulary {
    onLike?: (id: string) => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ _id, word, meaning, example, createdBy, createdAt, likes, onLike }) => {
    return (
        <div className="card">
            <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold">{word}</h3>
                <span className="badge">{likes ?? 0} likes</span>
            </div>
            <p className="mt-2">{meaning}</p>
            {example && <p className="mt-2 muted">“{example}”</p>}
            <div className="flex justify-between items-center mt-4 muted">
                <span>By {createdBy || 'Anonymous'}</span>
                {createdAt && <span>{new Date(createdAt).toLocaleDateString()}</span>}
            </div>
            {onLike && (
                <div className="mt-4">
                    <button onClick={() => onLike(_id)} className="btn btn-primary small">Like</button>
                </div>
            )}
        </div>
    );
};