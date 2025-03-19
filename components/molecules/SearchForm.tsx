'use client';

import { Input, Label, Select } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { MovieFormData } from '@/schemas';

interface SearchFormProps {
    typeFilter?: string;
    yearRange: [number, number];
    handleTitleChange: (value: string) => void;
    handleTypeFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleYearRangeChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

export function SearchForm({
    typeFilter,
    yearRange,
    handleTitleChange,
    handleTypeFilterChange,
    handleYearRangeChange,
}: SearchFormProps) {
    const { control, formState: { errors } } = useFormContext<MovieFormData>();

    return (
        <form>
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <Input
                        type="text"
                        {...field}
                        onChange={(e) => {
                            field.onChange(e);
                            handleTitleChange(e.target.value);
                        }}
                    />
                )}
            />
            {errors.title && <p>{errors.title.message}</p>}

            <Label>Type Filter:</Label>
            <Select value={typeFilter || ''} onChange={handleTypeFilterChange}>
                <option value="">All</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
            </Select>

            <Label>Year Range:</Label>
            <Input
                type="number"
                value={yearRange[0]}
                onChange={(e) => handleYearRangeChange(e, 0)}
                min="1900"
                max="2023"
            />
            <Input
                type="number"
                value={yearRange[1]}
                onChange={(e) => handleYearRangeChange(e, 1)}
                min="1900"
                max="2023"
            />
        </form>
    );
}
