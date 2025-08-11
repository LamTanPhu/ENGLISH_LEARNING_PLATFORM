import React from 'react';
import { useAuth } from '../../application/authContext';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="page">
        <div className="container">
            <header className="page-header">
            <h1 className="text-2xl font-semibold">Your Profile</h1>
            </header>
            <div className="card container-narrow">
            <div className="space-y-3">
                <div>
                <div className="text-sm text-gray-500">Username</div>
                <div className="text-lg">{user?.username || '-'}</div>
                </div>
                <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-lg">{user?.email || '-'}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="card">
                    <div className="text-sm text-gray-500">Level</div>
                    <div className="text-xl font-semibold">{user?.level || 'beginner'}</div>
                </div>
                <div className="card">
                    <div className="text-sm text-gray-500">Points</div>
                    <div className="text-xl font-semibold">{user?.points ?? 0}</div>
                </div>
                <div className="card">
                    <div className="text-sm text-gray-500">Role</div>
                    <div className="text-xl font-semibold">{user?.role || '-'}</div>
                </div>
                </div>
                <div className="mt-4">
                <button className="btn btn-secondary" onClick={logout}>Log out</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;


