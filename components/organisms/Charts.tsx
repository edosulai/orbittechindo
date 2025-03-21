import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface GenreData {
    genre: string;
    count: number;
}

interface RatingData {
    source: string;
    value: number;
}

export function GenreDistribution({ data }: { data: GenreData[] }) {
    return (
        <div className="w-full max-w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} className="w-full h-auto">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="genre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function RatingsDistribution({ data }: { data: RatingData[] }) {
    return (
        <div className="w-full max-w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} className="w-full h-auto">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
