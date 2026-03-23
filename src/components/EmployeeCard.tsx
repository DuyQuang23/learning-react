import React from "react";
import type { Employee } from "../types/employee";
import iconMail from '../assets/icon-mail.png';

interface EmployeeCardProps {
    employee: Employee;
    highlight: boolean; 
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, highlight }) => {
    const isWorking = employee.status === 'Đang làm việc';

    const getInit = (name: string) => {
        return name.split(' ').map((n) => n[0]).join('').toUpperCase();
    };

    return (
        <div className={`group rounded-2xl p-6 shadow-sm border transition-all duration-300 cursor-pointer 
            ${highlight 
                ? 'bg-blue-50 border-blue-400 border-2 hover:shadow-2xl hover:-translate-y-3' 
                : 'bg-white border-slate-100 border hover:shadow-xl hover:-translate-y-2' 
            }`}>
            
            <div className="flex justify-between items-start mb-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md 
                    ${isWorking ? 'bg-blue-600' : 'bg-slate-400'}
                    ${highlight ? 'ring-4 ring-white' : ''} 
                `}>
                    {getInit(employee.name)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`text-sm font-semibold ${isWorking ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {employee.status || "Chưa cập nhật"}
                    </span>
                </div>
            </div>

            <div className="space-y-1">
                <h3 className={`font-bold text-lg group-hover:transition-colors ${highlight ? 'text-blue-900 group-hover:text-black' : 'text-slate-800 group-hover:text-blue-600'}`}>
                    {employee.name}
                </h3>
                <p className="text-blue-500 text-sm font-medium">
                    {employee.title}
                </p>
                
                <div className="flex items-center pt-4 mt-4 border-t border-slate-50">
                    <img src={iconMail} alt="icon-mail" className="w-12 h-12" />
                    <span className={`text-xs font-medium truncate ${highlight ? 'text-blue-700' : 'text-slate-500'}`}>
                        {employee.email}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;