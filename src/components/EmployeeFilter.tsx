import type { FC } from 'react';

interface EmployeeFilterProps {
    titles: string[];
    selectedTitle: string;
    onFilterChange: (title: string) => void;
}

const EmployeeFilter: FC<EmployeeFilterProps> = ({ titles, selectedTitle, onFilterChange }) => {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-tight">Lọc theo:</span>

            <div className="flex flex-wrap gap-2">
                {/* button Tất cả */}
                <button
                    onClick={() => onFilterChange('All')}
                    className={`px-5 py-1.5 rounded-full text-xs font-black transition-all border-2 ${selectedTitle === 'All'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                            : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                        }`}
                >
                    TẤT CẢ
                </button>

                {/*  title */}
                {titles.map((title) => (
                    <button
                        key={title}
                        onClick={() => onFilterChange(title)}
                        className={`px-5 py-1.5 rounded-full text-xs font-black transition-all border-2 uppercase ${selectedTitle === title
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                                : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                            }`}
                    >
                        {title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmployeeFilter;