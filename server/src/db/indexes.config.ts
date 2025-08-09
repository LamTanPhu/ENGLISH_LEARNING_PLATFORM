import { Schema } from 'mongoose';

export const indexes = {
    users: [{ key: { email: 1 }, unique: true }],
    vocabulary: [{ key: { createdBy: 1 } }],
    flashcardSets: [{ key: { createdBy: 1 } }],
    userProgress: [{ key: { userId: 1, flashcardSetId: 1 }, unique: true }],
    comments: [
        { key: { targetId: 1, targetType: 1 } },
        { key: { author: 1 } },
    ],
};