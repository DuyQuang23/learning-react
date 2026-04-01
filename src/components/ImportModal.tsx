import React, {useState} from "react";

interface Props {
    validData: any[];
    invalidData: {row: any; error: string}[];
    onClose: () => void;
    onSave: () => void;
}

const ImportModal = ({validData, invalidData, onClose, onSave}: Props) => {

    const [activeTab, setActiveTab] = useState<'valid' | 'invalid'>('valid');
    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
        <div className="p-4 border-bottom flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Xem trước dữ liệu</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-red-500">✕</button>
        </div>

        {/* Tab Header */}
        <div className="flex border-b px-4 gap-4">
          <button
            className={`py-2 px-4 border-b-2 transition-all ${activeTab === 'valid' ? 'border-blue-500 text-blue-600 font-bold' : 'border-transparent text-slate-500'}`}
            onClick={() => setActiveTab('valid')}
          >
            Hợp lệ ({validData.length})
          </button>
          <button
            className={`py-2 px-4 border-b-2 transition-all ${activeTab === 'invalid' ? 'border-red-500 text-red-600 font-bold' : 'border-transparent text-slate-500'}`}
            onClick={() => setActiveTab('invalid')}
          >
            Lỗi ({invalidData.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto p-4">
          <table className="w-full border-collapse text-sm text-left">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                <th className="p-2 border">Hàng</th>
                <th className="p-2 border">Họ tên</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Thông báo</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'valid' ? (
                validData.map((d, i) => (
                  <tr key={i} className="hover:bg-blue-50">
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{d.name}</td>
                    <td className="p-2 border">{d.email}</td>
                    <td className="p-2 border">{d.code}</td>
                    <td className="p-2 border">{d.title}</td>
                    <td className="p-2 border">{d.phone}</td>
                    <td className="p-2 border">{d.status}</td>
                    <td className="p-2 border text-green-600">Sẵn sàng</td>
                  </tr>
                ))
              ) : (
                invalidData.map((item, i) => (
                  <tr key={i} className="bg-red-50 hover:bg-red-100">
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border text-slate-400">{item.row.name || '---'}</td>
                    <td className="p-2 border text-slate-400">{item.row.email || '---'}</td>
                    <td className="p-2 border text-slate-400">{item.row.code || '---'}</td>
                    <td className="p-2 border text-slate-400">{item.row.title || '---'}</td>
                    <td className="p-2 border text-slate-400">{item.row.phone || '---'}</td>
                    <td className="p-2 border text-slate-400">{item.row.status || '---'}</td>
                    <td className="p-2 border text-red-600 font-medium">{item.error}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-slate-50 rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-slate-100">Đóng</button>
          {activeTab === 'valid' && validData.length > 0 && (
            <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Lưu {validData.length} bản ghi
            </button>
          )}
        </div>
      </div>
    </div>
  );

};

export default ImportModal;