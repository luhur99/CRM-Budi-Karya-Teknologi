/**
 * CRM Budi Karya Teknologi - Aplikasi Frontend CRM
 * File: app.js
 * Deskripsi: Logika utama untuk navigasi dinamis dan manajemen konten
 */

// Data dummy untuk aplikasi (akan diganti dengan data asli dari backend nanti)
const dummyData = {
    dashboard: {
        totalLeads: 156,
        closingRate: "32%",
        activeLeads: 89,
        pendingFollowups: 23,
        performance: "+12%",
        recentLeads: [
            { name: "Budi Santoso", source: "Facebook Ads", date: "2023-10-15", label: "Hot" },
            { name: "Siti Rahayu", source: "Google Ads", date: "2023-10-14", label: "Warm" },
            { name: "Ahmad Fauzi", source: "Social Media", date: "2023-10-13", label: "Hot" },
            { name: "Dewi Lestari", source: "Offline", date: "2023-10-12", label: "Cold" }
        ]
    },
    pipeline: {
        stages: [
            { id: 1, name: "Lead Baru", color: "bg-blue-100", textColor: "text-blue-800", leads: 12 },
            { id: 2, name: "Qualifikasi", color: "bg-purple-100", textColor: "text-purple-800", leads: 8 },
            { id: 3, name: "Need Analysis", color: "bg-indigo-100", textColor: "text-indigo-800", leads: 6 },
            { id: 4, name: "Proposal", color: "bg-teal-100", textColor: "text-teal-800", leads: 4 },
            { id: 5, name: "Negosiasi", color: "bg-yellow-100", textColor: "text-yellow-800", leads: 5 },
            { id: 6, name: "Closing", color: "bg-green-100", textColor: "text-green-800", leads: 3 },
            { id: 7, name: "Follow Up", color: "bg-orange-100", textColor: "text-orange-800", leads: 7 },
            { id: 8, name: "Pending", color: "bg-red-100", textColor: "text-red-800", leads: 2 },
            { id: 9, name: "Lost", color: "bg-gray-100", textColor: "text-gray-800", leads: 4 },
            { id: 10, name: "Won", color: "bg-emerald-100", textColor: "text-emerald-800", leads: 9 }
        ]
    },
    followupTemplates: [
        { id: 1, behavior: "Lead Baru", followupId: "FU-001", content: "Perkenalan produk & penawaran spesial", media: "WhatsApp", description: "Template untuk lead baru dalam 24 jam pertama" },
        { id: 2, behavior: "Tertarik Tapi Ragu", followupId: "FU-002", content: "Testimoni & case study", media: "Email", description: "Template untuk lead yang menunjukkan ketertarikan tapi masih ragu" },
        { id: 3, behavior: "Pending Payment", followupId: "FU-003", content: "Reminder pembayaran & benefit", media: "WhatsApp", description: "Template untuk follow up pembayaran yang tertunda" },
        { id: 4, behavior: "Cold Lead", followupId: "FU-004", content: "Re-engagement dengan penawaran baru", media: "Email", description: "Template untuk menghidupkan kembali lead yang sudah dingin" },
        { id: 5, behavior: "Post Purchase", followupId: "FU-005", content: "Ulasan produk & penawaran lanjutan", media: "WhatsApp", description: "Template untuk follow up setelah pembelian" }
    ],
    leads: [
        { id: 1, name: "Budi Santoso", phone: "+628123456789", source: "Facebook Ads", date: "2023-10-15", label: "Hot", notes: "Sangat tertarik dengan produk premium" },
        { id: 2, name: "Siti Rahayu", phone: "+628987654321", source: "Google Ads", date: "2023-10-14", label: "Warm", notes: "Meminta waktu untuk konsultasi lebih lanjut" },
        { id: 3, name: "Ahmad Fauzi", phone: "+628112233445", source: "Social Media", date: "2023-10-13", label: "Hot", notes: "Ingin discount untuk pembelian quantity" },
        { id: 4, name: "Dewi Lestari", phone: "+628556677889", source: "Offline", date: "2023-10-12", label: "Cold", notes: "Masih membandingkan dengan kompetitor" },
        { id: 5, name: "Rizky Pratama", phone: "+628998877665", source: "Facebook Ads", date: "2023-10-11", label: "Warm", notes: "Minta demo produk besok jam 10" },
        { id: 6, name: "Linda Wijaya", phone: "+628443322110", source: "Google Ads", date: "2023-10-10", label: "Hot", notes: "Ready untuk closing, tunggu persetujuan direksi" }
    ],
    reporting: {
        daily: { closingRate: "15%", leads: 24, conversions: 4 },
        weekly: { closingRate: "32%", leads: 156, conversions: 50 },
        monthly: { closingRate: "28%", leads: 589, conversions: 165 },
        bottlenecks: [
            { stage: "Negosiasi", conversionRate: "45%", suggestion: "Perlu template negosiasi yang lebih baik" },
            { stage: "Proposal", conversionRate: "60%", suggestion: "Waktu respon proposal bisa dipercepat" }
        ]
    }
};

// Fungsi untuk menginisialisasi aplikasi
function initApp() {
    console.log("CRM Budi Karya Teknologi - Aplikasi dimulai");
    
    // Atur event listener untuk navigasi
    setupNavigation();
    
    // Load modul dashboard secara default
    loadModule('dashboard');
    
    // Atur aktif item sidebar pertama (dashboard)
    setActiveSidebarItem('dashboard');
    
    // Setup mobile menu
    setupMobileMenu();
}

// Fungsi untuk mengatur navigasi
function setupNavigation() {
    // Desktop sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const moduleName = this.getAttribute('data-module');
            loadModule(moduleName);
            setActiveSidebarItem(moduleName);
            
            // Update page title
            updatePageTitle(moduleName);
        });
    });
    
    // Mobile sidebar items
    const mobileSidebarItems = document.querySelectorAll('.mobile-sidebar-item');
    mobileSidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const moduleName = this.getAttribute('data-module');
            loadModule(moduleName);
            setActiveSidebarItem(moduleName);
            
            // Update page title
            updatePageTitle(moduleName);
            
            // Tutup mobile sidebar setelah memilih
            closeMobileSidebar();
        });
    });
}

// Fungsi untuk mengatur mobile menu
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMobileMenuButton = document.getElementById('closeMobileMenu');
    const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
    const mobileSidebar = document.getElementById('mobileSidebar');
    
    // Buka mobile sidebar
    mobileMenuButton.addEventListener('click', function() {
        mobileSidebarOverlay.classList.remove('hidden');
        mobileSidebar.classList.remove('-translate-x-full');
    });
    
    // Tutup mobile sidebar
    closeMobileMenuButton.addEventListener('click', closeMobileSidebar);
    mobileSidebarOverlay.addEventListener('click', closeMobileSidebar);
    
    // Fungsi untuk menutup mobile sidebar
    function closeMobileSidebar() {
        mobileSidebarOverlay.classList.add('hidden');
        mobileSidebar.classList.add('-translate-x-full');
    }
}

// Fungsi untuk mengupdate judul halaman
function updatePageTitle(moduleName) {
    const pageTitle = document.getElementById('pageTitle');
    const titles = {
        'dashboard': 'Dashboard',
        'pipeline': 'Pipeline Management',
        'followup-template': 'Follow Up Template',
        'leads': 'Database Lead',
        'reporting': 'Reporting Performance'
    };
    
    pageTitle.textContent = titles[moduleName] || 'Dashboard';
}

// Fungsi untuk menandai item sidebar yang aktif
function setActiveSidebarItem(moduleName) {
    // Hapus class active dari semua item
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const mobileSidebarItems = document.querySelectorAll('.mobile-sidebar-item');
    mobileSidebarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Tambah class active ke item yang sesuai
    const activeItems = document.querySelectorAll(`[data-module="${moduleName}"]`);
    activeItems.forEach(item => {
        item.classList.add('active');
    });
}

// Fungsi utama untuk memuat modul
function loadModule(moduleName) {
    console.log(`Memuat modul: ${moduleName}`);
    
    // Tampilkan loading state
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p class="text-gray-600">Memuat ${moduleName}...</p>
        </div>
    `;
    
    // Beri sedikit delay untuk simulasi loading
    setTimeout(() => {
        // Berdasarkan nama modul, panggil fungsi yang sesuai
        switch(moduleName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'pipeline':
                loadPipeline();
                break;
            case 'followup-template':
                loadFollowupTemplate();
                break;
            case 'leads':
                loadLeads();
                break;
            case 'reporting':
                loadReporting();
                break;
            default:
                loadDashboard();
        }
    }, 300);
}

// Fungsi untuk memuat dashboard
function loadDashboard() {
    const data = dummyData.dashboard;
    
    const content = `
        <div class="content-loaded">
            <!-- Header dashboard -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Selamat Datang, CS Team!</h1>
                <p class="text-gray-600">Ringkasan performa CRM dan aktivitas terkini</p>
            </div>
            
            <!-- Stats cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-xl shadow p-5 hover-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Total Leads</p>
                            <p class="text-2xl font-bold text-gray-800">${data.totalLeads}</p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-users text-blue-600"></i>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center text-sm">
                        <span class="text-green-600 flex items-center">
                            <i class="fas fa-arrow-up mr-1"></i> ${data.performance}
                        </span>
                        <span class="text-gray-500 ml-2">dari bulan lalu</span>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5 hover-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Closing Rate</p>
                            <p class="text-2xl font-bold text-gray-800">${data.closingRate}</p>
                        </div>
                        <div class="bg-green-100 p-3 rounded-full">
                            <i class="fas fa-percentage text-green-600"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-sm text-gray-500">Rata-rata industri: 25%</div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5 hover-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Active Leads</p>
                            <p class="text-2xl font-bold text-gray-800">${data.activeLeads}</p>
                        </div>
                        <div class="bg-yellow-100 p-3 rounded-full">
                            <i class="fas fa-bolt text-yellow-600"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-sm text-gray-500">Sedang dalam pipeline</div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5 hover-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Pending Follow Up</p>
                            <p class="text-2xl font-bold text-gray-800">${data.pendingFollowups}</p>
                        </div>
                        <div class="bg-red-100 p-3 rounded-full">
                            <i class="fas fa-clock text-red-600"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-sm text-gray-500">Perlu tindakan segera</div>
                </div>
            </div>
            
            <!-- Recent leads table -->
            <div class="bg-white rounded-xl shadow overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-800">Leads Terbaru</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sumber Traffic</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Masuk</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${data.recentLeads.map(lead => `
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span class="text-blue-800 font-medium">${lead.name.charAt(0)}</span>
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">${lead.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">${lead.source}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${lead.date}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${lead.label === 'Hot' ? 'bg-red-100 text-red-800' : 
                                              lead.label === 'Warm' ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-blue-100 text-blue-800'}">
                                            ${lead.label}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Quick insights -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Insight Performa</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600">Leads dari Facebook Ads</span>
                            <span class="font-medium">42%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: 42%"></div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600">Conversion Rate Mobile</span>
                            <span class="font-medium">28%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-600 h-2 rounded-full" style="width: 28%"></div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600">Rata-rata Waktu Response CS</span>
                            <span class="font-medium">2.4 jam</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-yellow-600 h-2 rounded-full" style="width: 65%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
                    <div class="space-y-4">
                        <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                            <div class="bg-blue-100 p-2 rounded-lg mr-3">
                                <i class="fas fa-phone text-blue-600"></i>
                            </div>
                            <div>
                                <p class="font-medium text-gray-800">3 leads perlu dihubungi hari ini</p>
                                <p class="text-sm text-gray-600">Follow up untuk appointment</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <div class="bg-yellow-100 p-2 rounded-lg mr-3">
                                <i class="fas fa-envelope text-yellow-600"></i>
                            </div>
                            <div>
                                <p class="font-medium text-gray-800">5 email belum dibalas</p>
                                <p class="text-sm text-gray-600">Periksa inbox CRM</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center p-3 bg-red-50 rounded-lg">
                            <div class="bg-red-100 p-2 rounded-lg mr-3">
                                <i class="fas fa-exclamation-triangle text-red-600"></i>
                            </div>
                            <div>
                                <p class="font-medium text-gray-800">2 leads hampir lost</p>
                                <p class="text-sm text-gray-600">Butuh intervensi segera</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentContainer').innerHTML = content;
}

// Fungsi untuk memuat pipeline management
function loadPipeline() {
    const data = dummyData.pipeline;
    
    const content = `
        <div class="content-loaded">
            <!-- Header pipeline -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Pipeline Management</h1>
                <p class="text-gray-600">Kelola 10 stage customer journey dengan mudah</p>
            </div>
            
            <!-- Pipeline stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Total Leads dalam Pipeline</p>
                            <p class="text-2xl font-bold text-gray-800">60</p>
                        </div>
                        <div class="bg-purple-100 p-3 rounded-full">
                            <i class="fas fa-project-diagram text-purple-600"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Stage Terbanyak</p>
                            <p class="text-2xl font-bold text-gray-800">Lead Baru</p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-layer-group text-blue-600"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Rata-rata Waktu per Stage</p>
                            <p class="text-2xl font-bold text-gray-800">3.2 hari</p>
                        </div>
                        <div class="bg-green-100 p-3 rounded-full">
                            <i class="fas fa-clock text-green-600"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pipeline stages (horizontal kanban) -->
            <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-800">Customer Journey Pipeline</h2>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                        <i class="fas fa-plus mr-2"></i> Tambah Stage
                    </button>
                </div>
                
                <div class="overflow-x-auto custom-scrollbar pb-4">
                    <div class="flex space-x-4" style="min-width: max-content;">
                        ${data.stages.map(stage => `
                            <div class="pipeline-stage bg-white rounded-xl shadow">
                                <div class="p-4 border-b border-gray-200">
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <h3 class="font-medium text-gray-800">${stage.name}</h3>
                                            <p class="text-sm text-gray-500">${stage.leads} leads</p>
                                        </div>
                                        <button class="text-gray-400 hover:text-gray-600">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="p-4">
                                    <!-- Contoh leads dalam stage ini -->
                                    ${stage.leads > 0 ? `
                                        <div class="space-y-3">
                                            ${Array.from({length: Math.min(stage.leads, 3)}).map((_, i) => `
                                                <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                    <div class="flex justify-between items-start mb-2">
                                                        <span class="font-medium text-sm">Lead ${i+1}</span>
                                                        <span class="text-xs px-2 py-1 rounded ${stage.textColor} ${stage.color}">Stage ${stage.id}</span>
                                                    </div>
                                                    <p class="text-xs text-gray-600 mb-2">Terakhir diupdate: Hari ini</p>
                                                    <div class="flex space-x-2">
                                                        <button class="text-xs text-blue-600 hover:text-blue-800">
                                                            <i class="fas fa-eye"></i> Lihat
                                                        </button>
                                                        <button class="text-xs text-green-600 hover:text-green-800">
                                                            <i class="fas fa-edit"></i> Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            `).join('')}
                                            
                                            ${stage.leads > 3 ? `
                                                <div class="text-center pt-2">
                                                    <p class="text-sm text-gray-500">+ ${stage.leads - 3} leads lainnya</p>
                                                </div>
                                            ` : ''}
                                        </div>
                                    ` : `
                                        <div class="text-center py-8">
                                            <i class="fas fa-inbox text-gray-300 text-3xl mb-2"></i>
                                            <p class="text-gray-500">Tidak ada leads</p>
                                        </div>
                                    `}
                                    
                                    <!-- Tombol tambah lead ke stage -->
                                    <div class="mt-4">
                                        <button class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400">
                                            <i class="fas fa-plus mr-2"></i> Tambah Lead
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Catatan pipeline -->
            <div class="bg-white rounded-xl shadow p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Catatan Pipeline</h3>
                <div class="mb-4">
                    <textarea class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="Tambahkan catatan untuk pipeline..."></textarea>
                </div>
                <div class="flex justify-end">
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Simpan Catatan
                    </button>
                </div>
                
                <!-- Riwayat catatan -->
                <div class="mt-6">
                    <h4 class="font-medium text-gray-700 mb-3">Riwayat Catatan</h4>
                    <div class="space-y-3">
                        <div class="p-3 bg-blue-50 rounded-lg">
                            <div class="flex justify-between mb-1">
                                <span class="font-medium text-sm">Admin</span>
                                <span class="text-xs text-gray-500">2 jam yang lalu</span>
                            </div>
                            <p class="text-sm">Stage "Negosiasi" butuh perhatian lebih, konversi turun 15%.</p>
                        </div>
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <div class="flex justify-between mb-1">
                                <span class="font-medium text-sm">CS Team</span>
                                <span class="text-xs text-gray-500">Kemarin</span>
                            </div>
                            <p class="text-sm">Menambahkan 5 leads baru ke stage "Lead Baru".</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentContainer').innerHTML = content;
}

// Fungsi untuk memuat follow up template
function loadFollowupTemplate() {
    const data = dummyData.followupTemplates;
    
    const content = `
        <div class="content-loaded">
            <!-- Header follow up template -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Follow Up Template</h1>
                <p class="text-gray-600">Template follow up untuk CS Team berdasarkan behavior lead</p>
            </div>
            
            <!-- Table header dengan filter -->
            <div class="bg-white rounded-xl shadow overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Template Follow Up</h2>
                        <p class="text-sm text-gray-600">${data.length} template tersedia</p>
                    </div>
                    <div class="mt-3 md:mt-0 flex space-x-3">
                        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                            <i class="fas fa-filter mr-2"></i> Filter
                        </button>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <i class="fas fa-plus mr-2"></i> Template Baru
                        </button>
                    </div>
                </div>
                
                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Behavior</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followup ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Konten Followup</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Media Follow Up</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followup Description</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${data.map(template => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-8 w-8 rounded-full ${template.behavior === 'Lead Baru' ? 'bg-blue-100' : 
                                                                                              template.behavior === 'Tertarik Tapi Ragu' ? 'bg-yellow-100' : 
                                                                                              template.behavior === 'Pending Payment' ? 'bg-red-100' : 
                                                                                              template.behavior === 'Cold Lead' ? 'bg-gray-100' : 'bg-green-100'} flex items-center justify-center">
                                                <i class="fas ${template.behavior === 'Lead Baru' ? 'fa-user-plus' : 
                                                               template.behavior === 'Tertarik Tapi Ragu' ? 'fa-question-circle' : 
                                                               template.behavior === 'Pending Payment' ? 'fa-clock' : 
                                                               template.behavior === 'Cold Lead' ? 'fa-snowflake' : 'fa-check-circle'} 
                                                               ${template.behavior === 'Lead Baru' ? 'text-blue-600' : 
                                                                template.behavior === 'Tertarik Tapi Ragu' ? 'text-yellow-600' : 
                                                                template.behavior === 'Pending Payment' ? 'text-red-600' : 
                                                                template.behavior === 'Cold Lead' ? 'text-gray-600' : 'text-green-600'} text-sm"></i>
                                            </div>
                                            <div class="ml-3">
                                                <div class="text-sm font-medium text-gray-900">${template.behavior}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">${template.followupId}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-900 max-w-xs truncate">${template.content}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <i class="fas ${template.media === 'WhatsApp' ? 'fa-whatsapp text-green-500' : 'fa-envelope text-blue-500'} mr-2"></i>
                                            <span class="text-sm text-gray-900">${template.media}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-500 max-w-xs">${template.description}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div class="flex space-x-2">
                                            <button class="text-blue-600 hover:text-blue-900" title="Gunakan template">
                                                <i class="fas fa-play-circle"></i>
                                            </button>
                                            <button class="text-green-600 hover:text-green-900" title="Edit">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="text-red-600 hover:text-red-900" title="Hapus">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <!-- Table footer -->
                <div class="px-6 py-4 border-t border-gray-200">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="mb-3 md:mb-0">
                            <p class="text-sm text-gray-700">
                                Menampilkan <span class="font-medium">${data.length}</span> dari <span class="font-medium">${data.length}</span> template
                            </p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                                Sebelumnya
                            </button>
                            <span class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</span>
                            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                                Selanjutnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Tips penggunaan template -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 class="text-lg font-semibold text-blue-800 mb-2">Tips Penggunaan Template</h3>
                <ul class="text-blue-700 space-y-1">
                    <li class="flex items-start">
                        <i class="fas fa-check-circle mt-1 mr-2 text-blue-600"></i>
                        <span>Pilih template sesuai dengan behavior lead untuk hasil terbaik</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle mt-1 mr-2 text-blue-600"></i>
                        <span>Customisasi template sesuai kebutuhan sebelum dikirim</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle mt-1 mr-2 text-blue-600"></i>
                        <span>Gunakan media yang sesuai dengan preferensi lead</span>
                    </li>
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('contentContainer').innerHTML = content;
}

// Fungsi untuk memuat database leads
function loadLeads() {
    const data = dummyData.leads;
    
    const content = `
        <div class="content-loaded">
            <!-- Header database lead -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Database Lead</h1>
                <p class="text-gray-600">Manajemen database lead dari berbagai sumber traffic</p>
            </div>
            
            <!-- Filter dan aksi -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Total Leads</p>
                            <p class="text-2xl font-bold text-gray-800">${data.length}</p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-database text-blue-600"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Hot Leads</p>
                            <p class="text-2xl font-bold text-gray-800">3</p>
                        </div>
                        <div class="bg-red-100 p-3 rounded-full">
                            <i class="fas fa-fire text-red-600"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Sumber Terbanyak</p>
                            <p class="text-2xl font-bold text-gray-800">Facebook Ads</p>
                        </div>
                        <div class="bg-green-100 p-3 rounded-full">
                            <i class="fab fa-facebook text-green-600"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Table leads -->
            <div class="bg-white rounded-xl shadow overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Daftar Leads</h2>
                        <p class="text-sm text-gray-600">${data.length} leads ditemukan</p>
                    </div>
                    <div class="mt-3 md:mt-0 flex space-x-3">
                        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                            <i class="fas fa-download mr-2"></i> Export
                        </button>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <i class="fas fa-plus mr-2"></i> Tambah Lead
                        </button>
                    </div>
                </div>
                
                <!-- Filter bar -->
                <div class="px-6 py-3 bg-gray-50 border-b border-gray-200">
                    <div class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                        <div class="flex-1">
                            <input type="text" placeholder="Cari nama atau nomor WhatsApp..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        </div>
                        <div class="flex space-x-3">
                            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Semua Label</option>
                                <option value="Hot">Hot</option>
                                <option value="Warm">Warm</option>
                                <option value="Cold">Cold</option>
                            </select>
                            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Semua Sumber</option>
                                <option value="Facebook Ads">Facebook Ads</option>
                                <option value="Google Ads">Google Ads</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No WhatsApp</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sumber Traffic</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Masuk Lead</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${data.map(lead => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span class="text-blue-800 font-medium">${lead.name.charAt(0)}</span>
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">${lead.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <i class="fab fa-whatsapp text-green-500 mr-2"></i>
                                            <span class="text-sm text-gray-900">${lead.phone}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <i class="fas ${lead.source === 'Facebook Ads' ? 'fa-facebook text-blue-600' : 
                                                           lead.source === 'Google Ads' ? 'fa-google text-red-600' : 
                                                           lead.source === 'Social Media' ? 'fa-hashtag text-purple-600' : 
                                                           'fa-store text-gray-600'} mr-2"></i>
                                            <span class="text-sm text-gray-900">${lead.source}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${lead.date}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${lead.label === 'Hot' ? 'bg-red-100 text-red-800' : 
                                              lead.label === 'Warm' ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-blue-100 text-blue-800'}">
                                            ${lead.label}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-500 max-w-xs truncate" title="${lead.notes}">${lead.notes}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div class="flex space-x-2">
                                            <button class="text-blue-600 hover:text-blue-900" title="Lihat detail">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="text-green-600 hover:text-green-900" title="Edit">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="text-red-600 hover:text-red-900" title="Hapus">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <!-- Table footer -->
                <div class="px-6 py-4 border-t border-gray-200">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="mb-3 md:mb-0">
                            <p class="text-sm text-gray-700">
                                Menampilkan <span class="font-medium">${data.length}</span> dari <span class="font-medium">${data.length}</span> leads
                            </p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                                Sebelumnya
                            </button>
                            <span class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</span>
                            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                                Selanjutnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Import/Export section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow p-5">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">Import Leads</h3>
                    <p class="text-sm text-gray-600 mb-4">Upload file Excel atau CSV untuk menambahkan leads secara massal</p>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <i class="fas fa-file-upload text-gray-400 text-3xl mb-3"></i>
                        <p class="text-gray-600 mb-2">Drag & drop file disini</p>
                        <p class="text-sm text-gray-500 mb-4">atau</p>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Pilih File
                        </button>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">Export Leads</h3>
                    <p class="text-sm text-gray-600 mb-4">Export database leads ke berbagai format</p>
                    <div class="space-y-3">
                        <button class="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div class="flex items-center">
                                <i class="fas fa-file-excel text-green-600 text-xl mr-3"></i>
                                <div>
                                    <p class="font-medium text-gray-800">Format Excel</p>
                                    <p class="text-sm text-gray-600">Export dengan semua kolom</p>
                                </div>
                            </div>
                            <i class="fas fa-download text-gray-400"></i>
                        </button>
                        
                        <button class="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div class="flex items-center">
                                <i class="fas fa-file-csv text-blue-600 text-xl mr-3"></i>
                                <div>
                                    <p class="font-medium text-gray-800">Format CSV</p>
                                    <p class="text-sm text-gray-600">Untuk integrasi dengan sistem lain</p>
                                </div>
                            </div>
                            <i class="fas fa-download text-gray-400"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentContainer').innerHTML = content;
}

// Fungsi untuk memuat reporting performance
function loadReporting() {
    const data = dummyData.reporting;
    
    const content = `
        <div class="content-loaded">
            <!-- Header reporting -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Reporting Performance</h1>
                <p class="text-gray-600">Laporan performa pipeline dan analisa closing</p>
            </div>
            
            <!-- Time filter -->
            <div class="bg-white rounded-xl shadow p-5 mb-6">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Filter Waktu</h2>
                        <p class="text-sm text-gray-600">Pilih periode laporan</p>
                    </div>
                    <div class="mt-4 md:mt-0 flex space-x-3">
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg time-filter" data-period="daily">
                            Harian
                        </button>
                        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 time-filter" data-period="weekly">
                            Mingguan
                        </button>
                        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 time-filter" data-period="monthly">
                            Bulanan
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Stats cards untuk reporting -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Closing Rate</p>
                            <p id="closingRate" class="text-2xl font-bold text-gray-800">${data.weekly.closingRate}</p>
                        </div>
                        <div class="bg-green-100 p-3 rounded-full">
                            <i class="fas fa-percentage text-green-600"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-sm text-gray-500" id="closingPeriod">Minggu ini</div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Total Leads</p>
                            <p id="totalLeads" class="text-2xl font-bold text-gray-800">${data.weekly.leads}</p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-users text-blue-600"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-sm text-gray-500" id="leadsPeriod">Minggu ini</div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Konversi</p>
                            <p id="conversions" class="text-2xl font-bold text-gray-800">${data.weekly.conversions}</p>
                        </div>
                        <div class="bg-purple-100 p-3 rounded-full">
                            <i class="fas fa-chart-line text-purple-600"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-sm text-gray-500" id="conversionsPeriod">Minggu ini</div>
                </div>
            </div>
            
            <!-- Bottleneck detection -->
            <div class="bg-white rounded-xl shadow overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-800">Pipeline Bottleneck Detection</h2>
                    <p class="text-sm text-gray-600">Stage dengan conversion rate terendah</p>
                </div>
                <div class="p-6">
                    <div class="space-y-6">
                        ${data.bottlenecks.map(bottleneck => `
                            <div class="bottleneck-item">
                                <div class="flex justify-between items-center mb-2">
                                    <h3 class="font-medium text-gray-800">${bottleneck.stage}</h3>
                                    <span class="text-sm font-medium ${parseInt(bottleneck.conversionRate) < 50 ? 'text-red-600' : 'text-yellow-600'}">
                                        Conversion Rate: ${bottleneck.conversionRate}
                                    </span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="h-3 rounded-full ${parseInt(bottleneck.conversionRate) < 50 ? 'bg-red-500' : 'bg-yellow-500'}" style="width: ${bottleneck.conversionRate}"></div>
                                </div>
                                <div class="mt-3 p-3 bg-blue-50 rounded-lg">
                                    <div class="flex">
                                        <i class="fas fa-lightbulb text-blue-600 mt-1 mr-3"></i>
                                        <p class="text-sm text-blue-800">${bottleneck.suggestion}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Rekomendasi perbaikan -->
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <h3 class="font-semibold text-gray-800 mb-4">Rekomendasi Perbaikan</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <div>
                                        <p class="font-medium text-green-800">Optimasi Stage "Negosiasi"</p>
                                        <p class="text-sm text-green-700 mt-1">Buat script negosiasi yang lebih persuasif untuk CS team</p>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div class="flex items-start">
                                    <i class="fas fa-clock text-yellow-600 mt-1 mr-3"></i>
                                    <div>
                                        <p class="font-medium text-yellow-800">Percepat Response Time</p>
                                        <p class="text-sm text-yellow-700 mt-1">Target response time maksimal 1 jam untuk hot leads</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Insight text section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Insight Analisa</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-medium text-blue-800 mb-2">Trend Positif</h4>
                            <p class="text-sm text-blue-700">Conversion rate meningkat 5% dibandingkan minggu lalu, terutama dari sumber Facebook Ads.</p>
                        </div>
                        <div class="p-4 bg-yellow-50 rounded-lg">
                            <h4 class="font-medium text-yellow-800 mb-2">Perhatian Khusus</h4>
                            <p class="text-sm text-yellow-700">Leads dari Google Ads mengalami penurunan konversi sebesar 8%. Perlu review landing page dan keyword.</p>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <h4 class="font-medium text-green-800 mb-2">Peluang Peningkatan</h4>
                            <p class="text-sm text-green-700">Implementasi template follow up baru meningkatkan response rate sebesar 15%.</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Prediksi & Proyeksi</h3>
                    <div class="space-y-6">
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-gray-700">Leads Bulan Depan</span>
                                <span class="font-medium text-gray-800">≈ 650 leads</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="h-3 rounded-full bg-blue-500" style="width: 75%"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-gray-700">Target Closing Rate</span>
                                <span class="font-medium text-gray-800">35%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="h-3 rounded-full bg-green-500" style="width: 65%"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-gray-700">CS Team Performance</span>
                                <span class="font-medium text-gray-800">B+</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="h-3 rounded-full bg-purple-500" style="width: 82%"></div>
                            </div>
                        </div>
                        
                        <!-- Action items -->
                        <div class="pt-4 border-t border-gray-200">
                            <h4 class="font-medium text-gray-800 mb-3">Action Items Prioritas</h4>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-circle text-xs text-red-500 mr-3"></i>
                                    <span class="text-sm text-gray-700">Review performa Google Ads campaign</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-circle text-xs text-yellow-500 mr-3"></i>
                                    <span class="text-sm text-gray-700">Training CS team untuk negosiasi</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-circle text-xs text-green-500 mr-3"></i>
                                    <span class="text-sm text-gray-700">Optimasi template follow up untuk cold leads</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentContainer').innerHTML = content;
    
    // Setup time filter buttons
    setupTimeFilter();
}

// Fungsi untuk mengatur filter waktu di reporting
function setupTimeFilter() {
    const timeFilterButtons = document.querySelectorAll('.time-filter');
    const data = dummyData.reporting;
    
    timeFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus active class dari semua button
            timeFilterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('border', 'border-gray-300', 'hover:bg-gray-50');
            });
            
            // Tambah active class ke button yang diklik
            this.classList.add('bg-blue-600', 'text-white');
            this.classList.remove('border', 'border-gray-300', 'hover:bg-gray-50');
            
            const period = this.getAttribute('data-period');
            
            // Update data berdasarkan periode
            let periodData;
            let periodText;
            
            switch(period) {
                case 'daily':
                    periodData = data.daily;
                    periodText = 'Hari ini';
                    break;
                case 'weekly':
                    periodData = data.weekly;
                    periodText = 'Minggu ini';
                    break;
                case 'monthly':
                    periodData = data.monthly;
                    periodText = 'Bulan ini';
                    break;
                default:
                    periodData = data.weekly;
                    periodText = 'Minggu ini';
            }
            
            // Update UI dengan data baru
            document.getElementById('closingRate').textContent = periodData.closingRate;
            document.getElementById('totalLeads').textContent = periodData.leads;
            document.getElementById('conversions').textContent = periodData.conversions;
            
            document.getElementById('closingPeriod').textContent = periodText;
            document.getElementById('leadsPeriod').textContent = periodText;
            document.getElementById('conversionsPeriod').textContent = periodText;
        });
    });
    
    // Set button mingguan sebagai active default
    const weeklyButton = document.querySelector('.time-filter[data-period="weekly"]');
    if (weeklyButton) {
        weeklyButton.classList.add('bg-blue-600', 'text-white');
        weeklyButton.classList.remove('border', 'border-gray-300', 'hover:bg-gray-50');
    }
}

// Inisialisasi aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);