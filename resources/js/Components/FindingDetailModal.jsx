import React from 'react';
import Modal from './Modal';
import { Eye, Edit3, Trash2, X, AlertTriangle, FileText, Globe, Lock } from 'lucide-react';

export default function FindingDetailModal({ isOpen, onClose, finding, onEdit, onDelete, onPublishToggle }) {
  if (!finding) return null;

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <Eye className="w-5 h-5 text-[#00A2B9]" />
            <h2 className="text-lg font-bold tracking-wide">Detail Temuan</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Detail"
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                {finding.finding_number || 'Tanpa Nomor'}
              </h3>
              <p className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {finding.person_name} • {finding.existing_work_area}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
                {finding.finding_type ? (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${
                        finding.finding_type === 'major' ? 'bg-red-100 text-red-700' :
                        finding.finding_type === 'minor' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                    }`}>
                        {finding.finding_type}
                    </span>
                ) : (
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase shadow-sm">
                        Unclassified
                    </span>
                )}
                
                {finding.is_published ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shadow-sm">
                        <Globe className="w-3 h-3 stroke-[3]" /> Published
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold shadow-sm">
                        <Lock className="w-3 h-3 stroke-[3]" /> Draft
                    </span>
                )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pernyataan Temuan</h4>
              <p className="text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-wrap break-words">
                {finding.finding_statement || '-'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Klausul & Acuan</h4>
                <p className="text-sm text-slate-900 font-semibold mb-2 break-words">Klausul: {finding.clause || '-'}</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">{finding.requirement || '-'}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lokasi / Auditee</h4>
                <p className="text-sm text-slate-900 font-semibold">{finding.location_auditee || '-'}</p>
              </div>
            </div>

            <div className="bg-red-50/50 rounded-lg p-4 border border-red-100">
              <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Penyebab Temuan
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap break-words">
                {finding.cause || '-'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100">
                    <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Tindakan Perbaikan</h4>
                    <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap break-words">
                        {finding.objective_evidence || '-'}
                    </p>
                </div>
                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                    <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">Tindakan Pencegahan</h4>
                    <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap break-words">
                        {finding.preventive_action || '-'}
                    </p>
                </div>
            </div>

            {/* INTERNAL EVALUATION */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Catatan Internal (Evaluasi)
                </h4>
                <p className="text-sm text-orange-900 font-medium whitespace-pre-wrap break-words">
                    {finding.evaluation_note || 'Tidak ada catatan evaluasi internal.'}
                </p>
            </div>

          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200">
          <button
            onClick={() => onPublishToggle(finding)}
            className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-lg transition border flex items-center justify-center gap-2 ${
              finding.is_published 
                ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' 
                : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {finding.is_published ? (
                <><Lock className="w-4 h-4" /> Unpublish Temuan</>
            ) : (
                <><Globe className="w-4 h-4" /> Publish Temuan</>
            )}
          </button>
          
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={() => onEdit(finding)}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-[#00838F] bg-[#00838F]/10 rounded-lg hover:bg-[#00838F]/20 transition flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => onDelete(finding)}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Hapus
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
