import React from "react";
import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../types/employee";
import { memo } from "react";


interface EmployeeListProps {
  employees: Employee[];
  searchTerm: string;
  onEdit: (emp: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({employees,searchTerm, onEdit}) => {
    

    return (
        <div className="block">
            <h2 className="text-black-800 font-bold text-[48px] text-center mb-10">Đội ngũ nhân sự</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                { employees.length > 0 ? ( employees.map((emp) => {
                    const isManager = emp.title.toLowerCase() == 'manager';
                        return (
                            <EmployeeCard key={emp.id}
                                        employee={emp}
                                        highlight={isManager} 
                                        searchTerm={searchTerm}
                                        onEdit={onEdit}/>
                        );
                
                     })
                    ) : (<p> Không có nhân sự</p>)
                    
                }   
            </div>
        </div>
    );
};

export default memo(EmployeeList);