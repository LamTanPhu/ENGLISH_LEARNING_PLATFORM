import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../infrastructure/api';

interface FormValues { word: string; meaning: string; example?: string }

const VocabularyCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
        defaultValues: { word: '', meaning: '', example: '' },
    });

    const onSubmit = async (data: FormValues) => {
        await apiClient.vocabulary.create(data);
        navigate('/dashboard');
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Vocabulary</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
            <label className="block mb-1">Word</label>
            <input {...register('word', { required: true })} className="form-input w-full" />
            </div>
            <div>
            <label className="block mb-1">Meaning</label>
            <input {...register('meaning', { required: true })} className="form-input w-full" />
            </div>
            <div>
            <label className="block mb-1">Example (optional)</label>
            <textarea {...register('example')} className="form-input w-full" rows={3} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
            </button>
        </form>
        </div>
    );
};

export default VocabularyCreatePage;


