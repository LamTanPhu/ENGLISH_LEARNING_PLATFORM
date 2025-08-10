import React from 'react';
import type { Vocabulary } from '../../domain/models'; // Type-only import

interface VocabularyCardProps extends Vocabulary {}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ word, meaning, example }) => {
    return (
        <div className="vocabulary-card">
        <h3>{word}</h3>
        <p>{meaning}</p>
        {example && <p><i>{example}</i></p>}
        </div>
    );
};