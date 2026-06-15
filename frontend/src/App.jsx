import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, FileText, AlertCircle, RefreshCw } from 'lucide-react';

// Konfigurasi URL Backend Anda (Dinonaktifkan untuk versi Dummy).
const API_BASE_URL = 'http://localhost:8000';

const DUMMY_NOTES = [
  {
    id: 1,
    title: 'Catatan Pertama Dummy',
    body: 'Ini adalah contoh catatan. Anda bisa mengedit atau menghapusnya.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default function App() {
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk form & modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Memuat data pertama kali
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handler: Get All Notes (Versi Dummy)
  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    
    // Simulasi waktu tunggu (delay) seperti mengambil data dari internet
    setTimeout(() => {
      // Mengurutkan note terbaru di atas
      const sortedData = [...notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setNotes(sortedData);
      setIsLoading(false);
    }, 600);
  };

  // Handler: Create & Update (Versi Dummy)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) return;

    setIsSaving(true);
    const isEditing = !!currentNote;

    // Simulasi waktu tunggu (delay)
    setTimeout(() => {
      const now = new Date().toISOString();
      
      if (isEditing) {
        // Proses Update
        setNotes(notes.map(note => 
          note.id === currentNote.id 
            ? { ...note, title: formData.title, body: formData.body, updated_at: now } 
            : note
        ));
      } else {
        // Proses Create
        const newNote = {
          id: Date.now(), // Menggunakan timestamp sebagai ID unik dummy
          title: formData.title,
          body: formData.body,
          created_at: now,
          updated_at: now
        };
        setNotes([newNote, ...notes]);
      }

      setIsSaving(false);
      closeModal();
    }, 500);
  };

  // Handler: Delete (Versi Dummy)
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Mencegah card ikut terklik
    if (!window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) return;

    // Hapus dari state lokal
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Helper function: Format Tanggal
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Helper Modal Controls
  const openModalForCreate = () => {
    setCurrentNote(null);
    setFormData({ title: '', body: '' });
    setIsModalOpen(true);
  };

  const openModalForEdit = (note) => {
    setCurrentNote(note);
    setFormData({ title: note.title, body: note.body });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
    setFormData({ title: '', body: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="text-indigo-600" size={32} />
              My Notes
            </h1>
            <p className="text-gray-500 mt-1">Simpan dan atur catatan penting Anda.</p>
          </div>
          <button
            onClick={openModalForCreate}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Plus size={20} />
            Catatan Baru
          </button>
        </header>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold">Koneksi Backend Gagal</p>
              <p className="text-sm mt-1 mb-2">Pastikan server backend Anda sedang berjalan di <code>{API_BASE_URL}</code>.</p>
              <button 
                onClick={fetchNotes}
                className="flex items-center gap-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-md font-medium transition-colors"
              >
                <RefreshCw size={14} /> Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !error ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <RefreshCw className="animate-spin mb-4" size={32} />
            <p>Memuat catatan...</p>
          </div>
        ) : (
          /* Notes Grid */
          <>
            {!error && notes.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
                <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900">Belum ada catatan</h3>
                <p className="text-gray-500 mt-1 mb-6">Mulai dengan membuat catatan pertama Anda.</p>
                <button
                  onClick={openModalForCreate}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  + Buat Catatan
                </button>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => openModalForEdit(note)}
                    className="break-inside-avoid bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all cursor-pointer group flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h3 className="font-bold text-xl text-gray-800 leading-tight">
                        {note.title}
                      </h3>
                      <button
                        onClick={(e) => handleDelete(note.id, e)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1 -mr-2"
                        title="Hapus Catatan"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-6 whitespace-pre-wrap line-clamp-6 text-sm">
                      {note.body}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                      <span>{formatDate(note.updated_at)}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-indigo-500">
                        <Edit2 size={12} /> Edit
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">
                  {currentNote ? 'Edit Catatan' : 'Catatan Baru'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-6">
                <input
                  type="text"
                  placeholder="Judul Catatan..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-2xl font-bold border-none outline-none placeholder-gray-300 mb-4 bg-transparent"
                  required
                  autoFocus
                />
                
                <textarea
                  placeholder="Tulis sesuatu di sini..."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full flex-1 min-h-[250px] resize-none border-none outline-none placeholder-gray-400 text-gray-700 leading-relaxed bg-transparent"
                  required
                />

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !formData.title.trim() || !formData.body.trim()}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
                  >
                    {isSaving ? (
                      <RefreshCw className="animate-spin" size={18} />
                    ) : (
                      'Simpan Catatan'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
