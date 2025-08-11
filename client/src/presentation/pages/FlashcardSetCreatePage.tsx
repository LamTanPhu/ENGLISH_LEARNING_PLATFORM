import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../infrastructure/api';

type CardInput = { word: string; meaning: string; example?: string };
interface FormValues { title: string; description?: string; cards: CardInput[] }

const FlashcardSetCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { control, register, handleSubmit } = useForm<FormValues>({ defaultValues: { title: '', description: '', cards: [{ word: '', meaning: '' }] } });
    const { fields, append, remove } = useFieldArray({ control, name: 'cards' });

    const onSubmit = async (data: FormValues) => {
        await apiClient.flashcardSets.create({
            title: data.title,
            description: data.description,
            cards: data.cards,
        });
        navigate('/flashcard-sets');
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Flashcard Set</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
            <label className="block mb-1">Title</label>
            <input {...register('title', { required: true })} className="form-input" />
            </div>
            <div>
            <label className="block mb-1">Description</label>
            <input {...register('description')} className="form-input" />
            </div>
            <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Cards</h2>
                <button type="button" onClick={() => append({ word: '', meaning: '' })} className="text-blue-600">+ Add Card</button>
            </div>
            <div className="space-y-3">
                {fields.map((field, idx) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                    <div>
                    <label className="block mb-1">Word</label>
                    <input {...register(`cards.${idx}.word` as const, { required: true })} className="form-input" />
                    </div>
                    <div>
                    <label className="block mb-1">Meaning</label>
                    <input {...register(`cards.${idx}.meaning` as const, { required: true })} className="form-input" />
                    </div>
                    <div className="flex gap-2">
                    <button type="button" onClick={() => remove(idx)} className="text-red-600">Remove</button>
                    </div>
                </div>
                ))}
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
        </div>
    );
};

export default FlashcardSetCreatePage;
