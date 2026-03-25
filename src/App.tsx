
import EmployeeList from './components/EmployeeList.tsx';
import { useCallback, useEffect, useState } from 'react';
import type { Employee } from './types/employee.ts';
import EmployeeHeader from './components/EmployeeHeader.tsx';
import EmployeeTable from './components/EmployeeTable.tsx';
import EmployeeSearch from './components/EmployeeSearch.tsx';
import EmployeeFilter from './components/EmployeeFilter.tsx';

function App() {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All');

  useEffect(() => {
    fetch('/data/employee.json')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Loi", err));
  }, []);

  const filterEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTitle = selectedTitle === 'All' || emp.title === selectedTitle;

    return matchesSearch && matchesTitle;
  });

  const handleAddEmployee = () => {

    const newEmployee : Employee = {
      id : Date.now(),
      code : "PM1234",
      name : "Nhân viên mới",
      title : "newEmployee",
      phone : "0981975400",
      email : "abv@company.com",
      status : "Đang làm việc",
    };

    setEmployees( (prevEmployees) => [newEmployee,...prevEmployees]);

  };

  const handleDeleteAllEmployee = () => {

    const isConfirm = window.confirm("Sure?")
    if(isConfirm) {
      setEmployees([]);
    }
  }


  const uniqueTitles = Array.from(new Set(employees.map(emp => emp.title))).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <EmployeeHeader total={employees.length} />

      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

            {/* search */}
            <EmployeeSearch onSearch={(value) => setSearchTerm(value)} />
            
            <button
              onClick={handleAddEmployee}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200">
              Thêm nhanh
            </button>
            <button
              onClick={handleDeleteAllEmployee}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200">
              Xoá tất cả
            </button>
            

            {/* card + table */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('card')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                CARD
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                TABLE
              </button>
            </div>
          </div>

          {/* filter */}
          <div className="pt-4 border-t border-slate-50">
            <EmployeeFilter
              titles={uniqueTitles}
              selectedTitle={selectedTitle}
              onFilterChange={(title) => setSelectedTitle(title)}
            />
          </div>
        </div>

        {/* render */}
        {filterEmployees.length > 0 ? (
          viewMode === 'card' ? (
            <EmployeeList employees={filterEmployees} />
          ) : (
            <EmployeeTable employees={filterEmployees} />
          )
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Không tìm thấy kết quả phù hợp cho yêu cầu của bạn.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
