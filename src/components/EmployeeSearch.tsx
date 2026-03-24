import React, { useState } from 'react';
import iconSearch from '../assets/icon-search.png';

interface EmployeeSearchProps {
    onSearch: (value: string) => void;
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ onSearch }) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
        onSearch(value);
    };

    return (
        <div className="relative max-w-md w-full group">

            {/* input */}
            <input
                type="text"
                placeholder="Nhập tên nv"
                onChange={handleChange}
                className="w-full pl-16 pr-4 py-2.5 bg-slate-100/50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />

            {/* icon-search */}
            <div className="absolute inset-y-0 left-0 w-14 flex items-center justify-center bg-slate-100 border-r border-slate-200 rounded-l-xl pointer-events-none group-focus-within:bg-blue-50 group-focus-within:border-blue-200 transition-colors">
                <img
                    src={iconSearch}
                    alt="icon-search"
                    className="size-7"
                />
            </div>
        </div>
    );
};

export default EmployeeSearch;