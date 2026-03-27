import React from 'react';
import { memo } from "react";

interface EmployeeHeaderProps {
    total: number;
    onAddClick: () => void;
    onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onExport: () => void;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({total, onAddClick, onExport, onImport}) => {
    return (
        <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <div className="flex gap-2">
                {/* Nút Export */}
                <button 
                    onClick={onExport}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                >
                     Xuất Excel
                </button>

                {/* Nút Import  */}
                <label className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold cursor-pointer flex items-center gap-2">
                     Nhập Excel
                    <input 
                    type="file" 
                    accept=".xlsx, .xls" 
                    onChange={onImport}
                    className="hidden" 
                    />
                </label>
            </div>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Tổng nhân sự</p>
            <p className="text-xl font-black text-slate-900 leading-none">
              {total} <span className="text-sm font-medium text-slate-500">thành viên</span>
            </p>

            <button 
            onClick={onAddClick}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95"
            >
            <span>+</span> Thêm nhân sự
            </button>
        </div>

    );
};

export default memo(EmployeeHeader);