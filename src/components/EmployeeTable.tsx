import React from "react";
import type { Employee } from "../types/employee";
import { memo } from "react";


const highlightText = (text: string, searchTearm: string) => {

    if(!searchTearm.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchTearm})`,'gi'));

    return (
        <span>
            {parts.map((part,index) =>
                part.toLowerCase() == searchTearm.toLocaleLowerCase() ? (
                    <mark key={index} className="bg-red-100 text-yellow-900 rounded-sm px-0.5 font-bold">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

interface EmployeeTableProps {
    employees: Employee[];
    searchTerm: string;
    onEdit: (emp: Employee) => void;    
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, searchTerm, onEdit}) => {
    const handleLog = (empId: number) => {
        const clickedEmp = employees.find(emp => emp.id == empId);

        if(clickedEmp) {
            console.table(clickedEmp);
        }
    }
    return (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nhân viên</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Chức vụ</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {employees.map((emp) => {
                        const isManager = emp.title === 'Manager';
                        const isWorking = emp.status === 'Đang làm việc';

                        return (
                            <tr
                                key={emp.id}
                                className={`hover:bg-slate-50/80 transition-colors ${isManager ? 'bg-blue-50/30' : ''}`}
                            >
                                {/* ten + ava */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${isWorking ? 'bg-blue-600' : 'bg-slate-400'}`}>
                                            {emp.name.charAt(0)}
                                        </div>
                                        <span className={`font-semibold ${isManager ? 'text-blue-900' : 'text-slate-700'}`}>
                                            {highlightText(emp.name,searchTerm)}
                                        </span>
                                    </div>
                                </td>

                                {/* title */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`text-sm ${isManager ? 'font-bold text-blue-700' : 'text-slate-600'}`}>
                                        {emp.title}
                                    </span>
                                </td>

                                {/* mail */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {emp.email}
                                </td>

                                {/* status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${isWorking ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                        <span className={`text-xs font-bold uppercase tracking-tight ${isWorking ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {emp.status}
                                        </span>
                                    </div>
                                </td>
                                {/* action */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleLog(emp.id)}
                                        className="text-center py-2 font-light text-blue-700 text-xs pl-5"
                                    >
                                        Xem chi tiết
                                    </button>
                                    <button 
                                        onClick={() => onEdit(emp)}
                                        className="text-center py-2 font-light text-blue-700 text-xs pl-5"
                                    >
                                        Sửa thông tin
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );


};

export default memo(EmployeeTable);