import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../infrastructure/api';

interface CommentItem { _id: string; content: string; author: string; createdAt?: string }
interface FlashcardSet { _id: string; title: string; description?: string; likes?: number; cards?: Array<{ word: string; meaning: string; example?: string }>; }

const FlashcardSetDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [setDetail, setSetDetail] = useState<FlashcardSet | null>(null);
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            const [detailRes, commentsRes] = await Promise.all([
                apiClient.flashcardSets.getOne(id),
                apiClient.comments.list({ targetType: 'FlashcardSet', targetId: id }),
            ]);
            setSetDetail(detailRes.data);
            setComments(commentsRes.data);
        };
        load();
    }, [id]);

    const submitComment = async () => {
        if (!id || !newComment.trim()) return;
        await apiClient.comments.create({ targetType: 'FlashcardSet', targetId: id, content: newComment.trim() });
        setNewComment('');
        const res = await apiClient.comments.list({ targetType: 'FlashcardSet', targetId: id });
        setComments(res.data);
    };

    const likeSet = async () => {
        if (!id) return;
        await apiClient.votes.create({ resourceId: id, type: 'upvote', onModel: 'FlashcardSet' });
        setSetDetail(prev => prev ? { ...prev, likes: (prev.likes || 0) + 1 } : prev);
    };

    return (
        <div className="page">
            <div className="container container-narrow">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">{setDetail?.title || 'Flashcard Set'}</h1>
                    <button onClick={likeSet} className="btn btn-primary small">Like {setDetail?.likes ?? 0}</button>
                </div>
                {setDetail?.description && <p className="muted mb-4">{setDetail.description}</p>}
                {setDetail?.cards && setDetail.cards.length > 0 && (
                    <div className="cards-grid">
                        {setDetail.cards.map((c, idx) => (
                            <div key={idx} className="card">
                                <div className="font-medium text-lg">{c.word}</div>
                                <div className="mt-1">{c.meaning}</div>
                                {c.example && <div className="muted mt-2">Example: {c.example}</div>}
                            </div>
                        ))}
                    </div>
                )}
                <section className="mt-6">
                    <h2 className="text-lg font-medium mb-2">Comments</h2>
                    <div className="space-y-3 mb-4">
                        {comments.map(c => (
                            <div key={c._id} className="card">
                                <div className="text-sm">{c.content}</div>
                                <div className="text-xs muted mt-1">by {c.author}</div>
                            </div>
                        ))}
                        {comments.length === 0 && <p className="muted">No comments yet.</p>}
                    </div>
                    <div className="flex gap-2">
                        <input value={newComment} onChange={(e) => setNewComment(e.target.value)} className="form-input flex-1" placeholder="Write a comment..." />
                        <button onClick={submitComment} className="btn btn-primary">Post</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FlashcardSetDetailPage;
