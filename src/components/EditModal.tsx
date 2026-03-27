import { useState } from "react";
import type { Employee } from "../types/employee";

interface EditModalProps {
    mode: 'add' | 'edit'
    employee: Employee;
    onClose: () => void;
    onConfirm: (emp: Employee) => void;
}

const TITLES = [
  { id: 'mng', name: 'Manager' },
  { id: 'fe', name: 'FrontEnd Dev' },
  { id: 'be', name: 'Backend Dev' },
  { id: 'uiux', name: 'UI/UX Designer' },
  { id: 'tt', name: 'Intern' }
];

const EditModal: React.FC<EditModalProps> = ({mode, employee, onClose, onConfirm}) =>  {
    const [formData, setFormData] = useState<Employee>(employee);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // ko load lai trang
        onConfirm(formData);
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value; 
    
    const text = e.target.options[e.target.selectedIndex].text;

    console.log(`vừa chọn: ID=${val}, Text=${text}`);
    setFormData({ 
      ...formData, 
      title: text 
    });
  };

    return (
    
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    
    {/* khung form */}
    <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all animate-in zoom-in-95 duration-200"
    >
        {/* tieu de */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            {mode === 'add' ? 'Thêm nhân viên mới' : 'Sửa thông tin nhân viên'}
        </h2>
        
        <div className="space-y-4">
            {/* nhap ten */}
            <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1 ml-1">Họ và tên</label>
                <input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Nhập tên nhân viên..."
                required
                />
            </div>
        
            {/* title */}
            <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1 ml-1">Chức danh</label>
                <select 
                    value={TITLES.find(t => t.name === formData.title)?.id || ""} // tim Id theo ten title
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all appearance-none cursor-pointer"
                    required
                >
                    <option value="" disabled>-- Chọn chức vụ --</option>
                    {TITLES.map(title => (
                    <option key={title.id} value={title.id}>
                        {title.name}
                    </option>
                    ))}
                </select>
            </div>
            {/* email */}
            <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1 ml-1">Email</label>
                <input
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Ví dụ: abc@company.com..."
                required
                />
            </div>
            {/* sdt */}
            <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1 ml-1">SDT</label>
                <input 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Ví dụ: 0900001110..."
                required
                />
            </div>
        </div>

        {/* button*/}
        <div className="flex gap-3 mt-8">
        <button 
            type="button" 
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
        >
            Hủy
        </button> 
        <button 
            type="submit" 
            className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
            {mode === 'add' ? 'Thêm nhân viên' : 'Lưu thay đổi'}
        </button> 
        </div>
    </form>
    </div>
  );

};

export default EditModal;