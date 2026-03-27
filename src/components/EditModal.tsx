import { useState } from "react";
import type { Employee, Skill } from "../types/employee";

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
    const [skills, setSkills] = useState<Skill[]>(employee.skills || []);

    const addSkill = () => {
        setSkills([...skills, { name: '', level: 'Beginner' }]);
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
        const newSkills = [...skills];
        newSkills[index] = { ...newSkills[index], [field]: value };
        setSkills(newSkills);
    };

    const handleSubmit = () => {
        const finalData = {
            ...formData, 
            skills: skills   
        };
        onConfirm(finalData);
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
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-700">Kỹ năng chuyên môn</h3>
                        <button 
                            type="button"
                            onClick={addSkill}
                            className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 font-bold"
                            >
                        + Thêm kỹ năng
                        </button>
                    </div>

                    <div className="space-y-3">
                        {skills.map((skill, index) => (
                        <div key={index} className="flex gap-3 items-end bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Tên kỹ năng</label>
                            <input
                                value={skill.name}
                                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                placeholder="Ví dụ: React, Java..."
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            />
                            </div>
                            
                            <div className="w-1/3">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Cấp độ</label>
                            <select
                                value={skill.level}
                                onChange={(e) => handleSkillChange(index, 'level', e.target.value as Skill['level'])}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                            </div>

                            <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                            Xoá kĩ năng
                            </button>
                        </div>
                        ))}
                    </div>
                </div>
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