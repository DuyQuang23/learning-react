import React from 'react';

interface EmployeeHeaderProps {
    total: number;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({total}) => {
    return (
        <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Tổng nhân sự</p>
            <p className="text-xl font-black text-slate-900 leading-none">
              {total} <span className="text-sm font-medium text-slate-500">thành viên</span>
            </p>
          </div>

    );
};

export default EmployeeHeader;