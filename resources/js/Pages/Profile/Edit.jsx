import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { ChevronRight, Save, LogOut, Eye, EyeOff } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const userRole = user.roles && user.roles.length > 0 ? user.roles[0].name : 'User';

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Profile" />
            <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
                {/* Sidebar Component */}
                <Sidebar activeItem="Overview" />

                {/* Main Content Area */}
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
                    <div className="space-y-6 max-w-4xl mx-auto">
                        
                        {/* Title Header */}
                        <div>
                            <nav className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-2">
                                <span className="text-slate-800 font-bold">Profile Settings</span>
                            </nav>
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Edit Profile
                            </h1>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 md:p-8">
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Row 1: Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-2">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Row 2: Passwords */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-2">
                                            Password Baru
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Kosongkan jika tidak ingin ganti"
                                                className="w-full pl-4 pr-11 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 mb-2">
                                            Konfirmasi Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Ulangi password baru"
                                                className="w-full pl-4 pr-11 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
                                            />
                                        </div>
                                        {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                                    </div>
                                </div>

                                {/* Row 3: Role (Read Only) */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 mb-2">
                                        Role <span className="text-gray-400 font-normal">(Read Only)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={userRole}
                                        disabled
                                        className="w-full md:w-1/2 px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Perubahan role hanya dapat dilakukan oleh Admin melalui Manajemen User.
                                    </p>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </Link>

                                    <div className="flex items-center gap-4">
                                        {recentlySuccessful && (
                                            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                                Profile berhasil diperbarui.
                                            </span>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex items-center gap-2 bg-[#00838F] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#006B7B] transition-colors disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            Simpan Perubahan
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
