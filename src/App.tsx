
import EmployeeList from './components/EmployeeList.tsx';
import {useEffect, useState} from 'react';
import type { Employee } from './types/employee.ts';
import EmployeeHeader from './components/EmployeeHeader.tsx';

function App() {
  
  const[employees, setEmployees] = useState<Employee[]>([]);

  useEffect( () => {
    fetch('/data/employee.json')
      .then( (res) => res.json())
      .then( (data) => setEmployees(data))
      .catch((err) => console.error("Loi", err));
  }, []);

  return (

    <div className="min-h-screen bg-slate-50/50">
      
      <EmployeeHeader total={employees.length} />
      
      <main>
        <EmployeeList employees={employees} />
      </main>
    </div>
  );
}

export default App;
