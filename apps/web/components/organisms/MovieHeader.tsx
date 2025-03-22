'use client';

import { useAuthStore } from '@/stores';
import { MovieHeaderProps } from '@/types';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, Input, Select } from '../atoms';
import { Dropdown } from '../molecules';
import Image from 'next/image';

export function MovieHeader({
    handleTitleChange,
    handleTypeFilterChange,
    handleYearRangeChange,
}: MovieHeaderProps) {
    const logout = useAuthStore((state) => state.logout);
    const { control, getValues } = useForm({
        defaultValues: {
            title: '',
            typeFilter: '',
            startYear: new Date(1900, 0, 1),
            endYear: new Date(),
        },
    });

    return (
        <>
            <div className="mx-auto w-full max-w-6xl p-4 rounded-full border">
                <header className="flex gap-2 items-center justify-between w-full">
                    <Controller
                        name="typeFilter"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    handleTypeFilterChange(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="movie">Movie</option>
                                <option value="series">Series</option>
                            </Select>
                        )}
                    />
                    <div className="flex space-x-2">
                        <Controller
                            name="startYear"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    name={field.name}
                                    selected={field.value}
                                    onChange={(date) => {
                                        field.onChange(date);
                                        const { endYear } = getValues();
                                        handleYearRangeChange([
                                            date ? date.getFullYear() : 1900,
                                            endYear.getFullYear(),
                                        ]);
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    minDate={new Date(1900, 0, 1)}
                                    maxDate={new Date()}
                                />
                            )}
                        />
                        <Controller
                            name="endYear"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    name={field.name}
                                    selected={field.value}
                                    onChange={(date) => {
                                        field.onChange(date);
                                        const { startYear } = getValues();
                                        handleYearRangeChange([
                                            startYear.getFullYear(),
                                            date
                                                ? date.getFullYear()
                                                : new Date().getFullYear(),
                                        ]);
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    minDate={new Date(1900, 0, 1)}
                                    maxDate={new Date()}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    handleTitleChange(e.target.value);
                                }}
                                placeholder="Search by title"
                            />
                        )}
                    />
                    <Dropdown
                        items={[
                            {
                                name: 'Logout',
                                onClick: logout,
                            },
                        ]}
                    >
                        <Image
                            src="/vercel.svg"
                            alt="Account"
                            width={24}
                            height={24}
                            className="object-contain"
                        />
                    </Dropdown>
                </header>
            </div>
        </>
    );
}
