
import EmployeeList from './components/EmployeeList.tsx';
import { useCallback, useEffect, useState, useMemo } from 'react';
import type { Employee } from './types/employee.ts';
import EmployeeHeader from './components/EmployeeHeader.tsx';
import EmployeeTable from './components/EmployeeTable.tsx';
import EmployeeSearch from './components/EmployeeSearch.tsx';
import EmployeeFilter from './components/EmployeeFilter.tsx';
import EditModal from './components/EditModal.tsx';
import * as XLSX from 'xlsx';

function App() {

  const [employees, setEmployees] = useState<Employee[]>( () => {
    const data = localStorage.getItem('employee_data');
    //console.log(data);
    return data ? JSON.parse(data) : [];
    
  });
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen , setIsAddModalOpen] = useState(false);

  useEffect( () => {
    localStorage.setItem('employee_data', JSON.stringify(employees));
  },[employees]);

  useEffect(() => {
    const data = localStorage.getItem('employee_data');
    if(!data || JSON.parse(data).length == 0)
    {
      fetch('/data/employee.json')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        localStorage.setItem('employee_data', JSON.stringify(data));
      })
      .catch((err) => console.error("Loi", err));
    }
  }, []);

  const handleStartEdit = useCallback ((emp: Employee) => {
    console.log("dang sua",emp.name);
    setEditingEmployee(emp);
  },[]);

  const handleConfirmUpdate =  (updatedEmp: Employee)=> {
    setEmployees((prev) => {
      const newEmployeeList = prev.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp);
      localStorage.setItem('employee_data',JSON.stringify(newEmployeeList));
      return newEmployeeList;
    });
    setEditingEmployee(null);
  };
  
  const handleConfirmAdd = (emp: Employee) => {

    const newEmployee = {
      ...emp,
      id : Date.now()
    };  
    setEmployees( (prev) => [newEmployee,...prev]);
    setIsAddModalOpen(false);
  }
  const emptyEmployee: Employee = {
    id: 0,
    code: '',
    name: '',
    title: '',
    email: '',
    phone: '',
    status: 'Đang làm việc',
  };
  const filterEmployees = useMemo(() => {
    // console.log("Dang tim ...");
    return employees.filter((emp) => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTitle = selectedTitle === 'All' || emp.title === selectedTitle;
      return matchesSearch && matchesTitle;
    });
  }, [searchTerm, selectedTitle, employees]);

  const handleAddEmployee = () => {

    const newEmployee : Employee = {
      id : Date.now(),
      code : "PM1234",
      name : "Nhân viên mới",
      title : "Intern",
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


  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees); // tao worksheet

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sach nhan vien");
    XLSX.writeFile(workbook,"Danh sach nhan vien.xlsx");
  };
  
  const handleImportExcel = (e : React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, {type: `binary` });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rawData = XLSX.utils.sheet_to_json(sheet); // chuyen sheet -> json
      console.table(rawData); 
      
      const validEmployees: Employee[] = [];
      const err: string[] = [];

      rawData.forEach( (row : any, index) => {


        const rowNum = index + 2; // dong trong excel bat dau tu 2
        if(!row.name || !row.email || !row.code || !row.phone || !row.title) {
          
          err.push(`${rowNum} : thieu du lieu`);
          return
        }
        

        if(!row.email.includes('@')) {
            err.push(`${rowNum} : sai dinh dang email `);
            return;
          }
        

        validEmployees.push({
          ...row,
          id: Date.now() + index,
          status: row.status
        });

      });

      if(err.length > 0) {
        alert(`co ${err.length} loi :\n` + err.join('\n'));
      }

      if(validEmployees.length > 0) {
        if(window.confirm(`Xac nhan them ${validEmployees.length} nhan vien`)) {
          setEmployees(prev => [...validEmployees,...prev]);
        }
      }
    

    };

    reader.readAsArrayBuffer(file); // reset input
  e.target.value = '';

  };


  const uniqueTitles = Array.from(new Set(employees.map(emp => emp.title))).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <EmployeeHeader total={employees.length} onAddClick={() => setIsAddModalOpen(true)}
        onImport={handleImportExcel} 
        onExport={handleExportExcel}
      />

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
            <EmployeeList 
              employees={filterEmployees} 
              searchTerm={searchTerm} 
              onEdit={handleStartEdit} 
             
            />
          ) : (
            <EmployeeTable 
              employees={filterEmployees} 
              searchTerm={searchTerm} 
              onEdit={handleStartEdit}      
            />
          )
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Không tìm thấy kết quả phù hợp.</p>
            </div>
          )}

          {/* modal edit */}
          {editingEmployee && (
            <EditModal
              employee={editingEmployee}
              onClose={() => setEditingEmployee(null)}
              onConfirm={handleConfirmUpdate}
              mode={'edit'}
            />
          )}
          {/* modal add*/}
          {isAddModalOpen && (
            <EditModal
              employee={emptyEmployee} 
              onClose={() => setIsAddModalOpen(false)} 
              onConfirm={handleConfirmAdd} 
              mode={'add'} 
            />
          )}
      </main>
    </div>
  );
}

export default App;
