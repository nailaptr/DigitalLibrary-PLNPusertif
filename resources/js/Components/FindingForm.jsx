import React, { useState } from 'react';
import { ArrowLeft, Save, FileCheck } from 'lucide-react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from './InputError';
import Checkbox from './Checkbox';

export default function FindingForm({ mode = 'add', finding = null, onSave, onCancel }) {
  const [data, setData] = useState({
    finding_number: finding?.finding_number || '',
    person_name: finding?.person_name || '',
    existing_work_area: finding?.existing_work_area || '',
    clause: finding?.clause || '',
    finding_statement: finding?.finding_statement || '',
    location_auditee: finding?.location_auditee || '',
    cause: finding?.cause || '',
    objective_evidence: finding?.objective_evidence || '',
    requirement: finding?.requirement || '',
    preventive_action: finding?.preventive_action || '',
    finding_type: finding?.finding_type || '',
    evaluation_note: finding?.evaluation_note || '',
    is_published: finding?.is_published || false,
    id: finding?.id || null
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
      <div className="bg-[#00838F] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <FileCheck className="w-6 h-6" />
          <h2 className="text-lg font-bold">
            {mode === 'add' ? 'Tambah Temuan Baru' : 'Edit Temuan'}
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="text-white/80 hover:text-white transition flex items-center gap-2 text-sm font-semibold bg-black/10 px-3 py-1.5 rounded-lg hover:bg-black/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 border-b pb-2">Informasi Umum</h3>
            
            <div>
              <InputLabel htmlFor="finding_number" value="No. Temuan" />
              <TextInput
                id="finding_number"
                value={data.finding_number}
                onChange={(e) => handleChange('finding_number', e.target.value)}
                className="mt-1 block w-full"
                placeholder="FND-0001"
              />
            </div>

            <div>
              <InputLabel htmlFor="person_name" value="Nama Auditee / Person" />
              <TextInput
                id="person_name"
                value={data.person_name}
                onChange={(e) => handleChange('person_name', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <InputLabel htmlFor="existing_work_area" value="Bidang Kerja Existing" />
              <TextInput
                id="existing_work_area"
                value={data.existing_work_area}
                onChange={(e) => handleChange('existing_work_area', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <InputLabel htmlFor="clause" value="Klausul" />
              <TextInput
                id="clause"
                value={data.clause}
                onChange={(e) => handleChange('clause', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <InputLabel htmlFor="location_auditee" value="Lokasi / Auditee" />
              <TextInput
                id="location_auditee"
                value={data.location_auditee}
                onChange={(e) => handleChange('location_auditee', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <InputLabel htmlFor="finding_type" value="Jenis Temuan" />
              <select
                id="finding_type"
                value={data.finding_type}
                onChange={(e) => handleChange('finding_type', e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-[#00838F] focus:ring-[#00838F] rounded-md shadow-sm text-sm"
              >
                <option value="">-- Pilih Jenis --</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                <option value="pi">PI (Opportunity for Improvement)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 border-b pb-2">Detail Temuan</h3>

            <div>
              <InputLabel htmlFor="finding_statement" value="Pernyataan Temuan" />
              <textarea
                id="finding_statement"
                value={data.finding_statement}
                onChange={(e) => handleChange('finding_statement', e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-[#00838F] focus:ring-[#00838F] rounded-md shadow-sm text-sm"
                rows="3"
              ></textarea>
            </div>

            <div>
              <InputLabel htmlFor="cause" value="Penyebab" />
              <textarea
                id="cause"
                value={data.cause}
                onChange={(e) => handleChange('cause', e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-[#00838F] focus:ring-[#00838F] rounded-md shadow-sm text-sm"
                rows="2"
              ></textarea>
            </div>

            <div>
              <InputLabel htmlFor="requirement" value="Acuan Persyaratan (Requirement)" />
              <textarea
                id="requirement"
                value={data.requirement}
                onChange={(e) => handleChange('requirement', e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-[#00838F] focus:ring-[#00838F] rounded-md shadow-sm text-sm"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
             <h3 className="font-bold text-slate-800 border-b pb-2">Tindakan</h3>
             <div>
              <InputLabel htmlFor="objective_evidence" value="Objective Evidence / Tindakan Perbaikan" />
              <textarea
                id="objective_evidence"
                value={data.objective_evidence}
                onChange={(e) => handleChange('objective_evidence', e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-[#00838F] focus:ring-[#00838F] rounded-md shadow-sm text-sm"
                rows="3"
              ></textarea>
            </div>

            <div>
              <InputLabel htmlFor="preventive_action" value="Tindakan Pencegahan" />
              <textarea
                id="preventive_action"
                value={data.preventive_action}
                onChange={(e) => handleChange('preventive_action', e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-[#00838F] focus:ring-[#00838F] rounded-md shadow-sm text-sm"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-bold text-slate-800 border-b pb-2">Internal Audit</h3>
             <div>
              <InputLabel htmlFor="evaluation_note" value="Evaluasi / Catatan Internal" />
              <textarea
                id="evaluation_note"
                value={data.evaluation_note}
                onChange={(e) => handleChange('evaluation_note', e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-[#00838F] focus:ring-[#00838F] rounded-md shadow-sm text-sm"
                rows="3"
                placeholder="Catatan ini tidak akan tampil di halaman publik."
              ></textarea>
              <p className="text-xs text-orange-600 mt-1 font-semibold">*Hanya untuk keperluan internal CMS.</p>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  id="is_published"
                  checked={data.is_published}
                  onChange={(e) => handleChange('is_published', e.target.checked)}
                />
                <span className="text-sm font-bold text-slate-700">Publish ke Publik</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-7">
                Jika di-publish, data temuan (kecuali catatan internal) dapat dilihat di halaman pencarian publik.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#00838F] rounded-lg hover:bg-[#007A87] transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {mode === 'add' ? 'Simpan Data' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
