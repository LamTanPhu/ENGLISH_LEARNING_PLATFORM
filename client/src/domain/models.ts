export interface User {
    userId: string;
    email: string;
    username: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    points: number;
    role: 'student' | 'teacher' | 'admin';
    avatar?: string;
    bio?: string;
    lastActive?: Date;
}

export interface Vocabulary {
    _id: string;
    word: string;
    meaning: string;
    example?: string;
    createdBy?: string; // Reference to User.userId
    createdAt?: Date;
    likes?: number;
}

export interface Flashcard {
    word: string;
    meaning: string;
}

export interface FlashcardSet {
    _id: string;
    title: string;
    cards: Flashcard[];
    createdBy?: string; // Reference to User.userId
    createdAt?: Date;
}

export interface Comment {
    _id: string;
    content: string;
    author: string; // Reference to User.userId
    targetType: 'vocabulary' | 'flashcardSet' | 'comment';
    targetId: string;
    createdAt?: Date;
    parentCommentId?: string; // For threaded comments
}

export interface Vote {
    _id: string;
    userId: string; // Reference to User.userId
    targetType: 'vocabulary' | 'flashcardSet' | 'comment';
    targetId: string;
    value: 1 | -1; // Upvote (1) or downvote (-1)
    createdAt?: Date;
}

export interface UserProgress {
    _id: string;
    userId: string; // Reference to User.userId
    cardProgress: { [cardId: string]: number }; // Progress per flashcard (0-100)
    totalStudyTime: number; // In minutes
    lastUpdated?: Date;
}

export interface Upload {
    _id: string;
    url: string; // Cloudinary URL
    type: 'image' | 'audio';
    uploadedBy: string; // Reference to User.userId
    createdAt?: Date;
}