import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Users as UsersIcon, 
  Store, 
  Briefcase, 
  FileText, 
  AlertOctagon, 
  ShoppingBag, 
  Wrench, 
  Phone, 
  Bell, 
  Newspaper, 
  FileDown, 
  Settings as SettingsIcon, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Eye,
  FileCode,
  Share2,
  Download
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Translations Dictionary (English & Marathi)
const translations: Record<string, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    villages: "Villages",
    users: "Users",
    shops: "Shops",
    services: "Services",
    notices: "Gram Panchayat Notices",
    complaints: "Complaints",
    buysell: "Buy & Sell",
    jobs: "Jobs",
    emergency: "Emergency Contacts",
    news: "News",
    notifications: "Notifications",
    reports: "Reports",
    settings: "Settings",
    logout: "Logout",
    searchPlaceholder: "Search villages, shops, notices...",
    activeVillage: "Active Village",
    allVillages: "All Villages",
    langSwitch: "Language / भाषा",
    totalVillages: "Total Villages",
    totalUsers: "Total Users",
    totalShops: "Total Shops",
    totalServices: "Total Services",
    totalComplaints: "Total Complaints",
    totalNotices: "Total Notices",
    pendingApprovals: "Pending Approvals",
    activeListings: "Active Listings",
    recentComplaints: "Recent Complaints",
    latestNotices: "Latest Notices",
    newShopRequests: "New Shop Requests",
    analyticsOverview: "Analytics Overview",
    addVillage: "Add Village",
    villageName: "Village Name",
    taluka: "Taluka",
    district: "District",
    population: "Population",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    approve: "Approve",
    reject: "Reject",
    category: "Category",
    mobile: "Mobile",
    status: "Status",
    villageFilter: "Filter by Village",
    categoryFilter: "Filter by Category",
    availability: "Availability",
    uploadNotice: "Upload Notice",
    noticeTitle: "Notice Title",
    selectVillage: "Select Village",
    uploadPdf: "Upload PDF Notice",
    uploadImage: "Upload Image Banner",
    description: "Description",
    priority: "Priority",
    normal: "Normal",
    important: "Important",
    emergencyPriority: "Emergency",
    publish: "Publish",
    saveDraft: "Save Draft",
    complaintId: "Complaint ID",
    userName: "User Name",
    date: "Date",
    pending: "Pending",
    inProgress: "In Progress",
    solved: "Solved",
    previewPhoto: "Preview Photo",
    productName: "Product Name",
    seller: "Seller",
    price: "Price",
    jobTitle: "Job Title",
    employer: "Employer",
    salary: "Salary",
    contact: "Contact",
    contactPerson: "Contact Person",
    number: "Number",
    addContact: "Add Contact",
    broadcastNotification: "Broadcast Notification",
    title: "Title",
    message: "Message",
    selectAllUsers: "Send to all registered users",
    send: "Send",
    exportReports: "Export Reports",
    shopsReport: "Shops Report",
    complaintsReport: "Complaints Report",
    userReport: "User Report",
    noticesReport: "Notices Report",
    downloadPdf: "Download PDF",
    downloadExcel: "Download Excel",
    systemSettings: "System Settings",
    savePreferences: "Save Preferences",
    welcome: "Welcome, Village Admin",
    username: "Username",
    password: "Password",
    login: "Log In",
    loginTitle: "GaavConnect Admin Login",
    loginSubtitle: "Sign in to access your Gram Panchayat control panel",
    invalidCredentials: "Invalid username or password"
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    villages: "गावे",
    users: "वापरकर्ते",
    shops: "दुकाने",
    services: "सेवा",
    notices: "ग्रामपंचायत सूचना",
    complaints: "तक्रारी",
    buysell: "खरेदी आणि विक्री",
    jobs: "नोकऱ्या",
    emergency: "आपत्कालीन संपर्क",
    news: "बातम्या",
    notifications: "सूचना (Notifications)",
    reports: "अहवाल",
    settings: "सेटिंग्ज",
    logout: "लॉगआउट",
    searchPlaceholder: "गावे, दुकाने, सूचना शोधा...",
    activeVillage: "सक्रिय गाव",
    allVillages: "सर्व गावे",
    langSwitch: "Language / भाषा",
    totalVillages: "एकूण गावे",
    totalUsers: "एकूण वापरकर्ते",
    totalShops: "एकूण दुकाने",
    totalServices: "एकूण सेवा",
    totalComplaints: "एकूण तक्रारी",
    totalNotices: "एकूण सूचना",
    pendingApprovals: "प्रलंबित मंजुरी",
    activeListings: "सक्रिय यादी",
    recentComplaints: "अलीकडील तक्रारी",
    latestNotices: "नवीनतम सूचना",
    newShopRequests: "नवीन दुकान विनंत्या",
    analyticsOverview: "विश्लेषण विहंगावलोकन",
    addVillage: "गाव जोडा",
    villageName: "गावाचे नाव",
    taluka: "तालुका",
    district: "जिल्हा",
    population: "लोकसंख्या",
    actions: "कृती",
    edit: "संपादन",
    delete: "हटवा",
    save: "जतन करा",
    cancel: "रद्द करा",
    approve: "मंजूर करा",
    reject: "नाकारणे",
    category: "वर्ग",
    mobile: "मोबाईल",
    status: "स्थिती",
    villageFilter: "गावानुसार फिल्टर",
    categoryFilter: "वर्गानुसार फिल्टर",
    availability: "उपलब्धता",
    uploadNotice: "सूचना अपलोड करा",
    noticeTitle: "सूचनेचे शीर्षक",
    selectVillage: "गाव निवडा",
    uploadPdf: "PDF सूचना अपलोड करा",
    uploadImage: "प्रतिमा बॅनर अपलोड करा",
    description: "वर्णन",
    priority: "प्राधान्य",
    normal: "सामान्य",
    important: "महत्वाचे",
    emergencyPriority: "आपत्कालीन",
    publish: "प्रसिद्ध करा",
    saveDraft: "मसुदा जतन करा",
    complaintId: "तक्रार आयडी",
    userName: "वापरकर्त्याचे नाव",
    date: "तारीख",
    pending: "प्रलंबित",
    inProgress: "प्रगतीपथावर",
    solved: "सुटलेले",
    previewPhoto: "फोटो पहा",
    productName: "उत्पादनाचे नाव",
    seller: "विक्रेता",
    price: "किंमत",
    jobTitle: "नोकरीचे शीर्षक",
    employer: "नियोक्ता",
    salary: "पगार",
    contact: "संपर्क",
    contactPerson: "संपर्क व्यक्ती",
    number: "नंबर",
    addContact: "संपर्क जोडा",
    broadcastNotification: "ब्रॉडकास्ट सूचना पाठवा",
    title: "शीर्षक",
    message: "संदेश",
    selectAllUsers: "सर्व नोंदणीकृत वापरकर्त्यांना पाठवा",
    send: "पाठवा",
    exportReports: "अहवाल निर्यात करा",
    shopsReport: "दुकानाचा अहवाल",
    complaintsReport: "तक्रारींचा अहवाल",
    userReport: "वापरकर्त्यांचा अहवाल",
    noticesReport: "सूचनांचा अहवाल",
    downloadPdf: "PDF डाउनलोड करा",
    downloadExcel: "Excel डाउनलोड करा",
    systemSettings: "प्रणाली सेटिंग्ज",
    savePreferences: "पसंती जतन करा",
    welcome: "स्वागत आहे, गाव प्रशासक",
    username: "वापरकर्ता नाव (Username)",
    password: "पासवर्ड (Password)",
    login: "लॉग इन करा",
    loginTitle: "गावकनेक्ट प्रशासक लॉगिन",
    loginSubtitle: "तुमच्या ग्रामपंचायत नियंत्रण पॅनेलमध्ये प्रवेश करण्यासाठी साइन इन करा",
    invalidCredentials: "चुकीचे वापरकर्तानाव किंवा पासवर्ड"
  }
};

// Initial Data Structures
const initialVillages = [
  { id: "V01", name: "Shirur", taluka: "Shirur", district: "Pune", population: 12500, users: 450 },
  { id: "V02", name: "Khed", taluka: "Khed", district: "Pune", population: 18200, users: 610 },
  { id: "V03", name: "Ambegaon", taluka: "Ambegaon", district: "Pune", population: 9800, users: 310 },
  { id: "V04", name: "Baramati", taluka: "Baramati", district: "Pune", population: 45000, users: 1850 }
];

const initialUsers = [
  { id: "U01", name: "Rahul Patil", mobile: "9876543210", village: "Shirur", role: "Villager", joined: "2026-01-10" },
  { id: "U02", name: "Sunil Kale", mobile: "9876543211", village: "Shirur", role: "Shopkeeper", joined: "2026-02-15" },
  { id: "U03", name: "Vikas Rao", mobile: "9876543212", village: "Khed", role: "Farmer", joined: "2026-03-01" },
  { id: "U04", name: "Priya Deshmukh", mobile: "9876543213", village: "Ambegaon", role: "Villager", joined: "2026-04-20" },
  { id: "U05", name: "Ananda Shinde", mobile: "9876543214", village: "Baramati", role: "Farmer", joined: "2026-05-12" }
];

const initialShops = [
  { id: 'S01', name: 'Ganesh Kirana Store', owner: 'Ganesh Patil', category: 'Grocery', mobile: '9988776655', village: 'Shirur', status: 'Pending' },
  { id: 'S02', name: 'Arogya Medical', owner: 'Dr. Amit Shah', category: 'Medical', mobile: '9988776656', village: 'Shirur', status: 'Approved' },
  { id: 'S03', name: 'Khed Agri Plaza', owner: 'Sanjay Deshmukh', category: 'Agriculture', mobile: '9988776657', village: 'Khed', status: 'Pending' },
  { id: 'S04', name: 'Samarth Cloth Center', owner: 'Satish Pawar', category: 'Clothing', mobile: '9988776658', village: 'Ambegaon', status: 'Approved' }
];

const initialServices = [
  { id: 'SR01', name: 'Ramesh Shinde (Electrician)', category: 'Electrician', contact: '9822334455', village: 'Shirur', availability: 'Available', status: 'Pending' },
  { id: 'SR02', name: 'Maruti Water Tankers', category: 'Water Supply', contact: '9822334456', village: 'Shirur', availability: 'Available', status: 'Approved' },
  { id: 'SR03', name: 'Kiran Borewells', category: 'Plumber', contact: '9822334457', village: 'Khed', availability: 'On Call', status: 'Approved' }
];

const initialNotices = [
  { id: 'N01', title: 'Water Outage Notice', village: 'Shirur', date: '2026-06-19', priority: 'Important', status: 'Published', desc: 'Water supply will be suspended tomorrow morning due to maintenance work.' },
  { id: 'N02', title: 'Gram Sabha Meeting on Monday', village: 'Khed', date: '2026-06-18', priority: 'Emergency', status: 'Published', desc: 'All villagers are requested to attend the Gram Sabha meeting regarding development works.' },
  { id: 'N03', title: 'New Crop Subsidy Scheme', village: 'Shirur', date: '2026-06-15', priority: 'Normal', status: 'Draft', desc: 'Apply online for the new crop subsidy scheme before next week.' }
];

const initialComplaints = [
  { id: 'C01', user: 'Sunil Kale', category: 'Water problem', village: 'Shirur', date: '2026-06-18', status: 'Pending', desc: 'No water supply in Ward 3 for the last 2 days.', photo: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=800&auto=format&fit=crop' },
  { id: 'C02', user: 'Vikas Rao', category: 'Street Light', village: 'Khed', date: '2026-06-17', status: 'In Progress', desc: 'Main street light near the primary school is damaged.', photo: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=800&auto=format&fit=crop' },
  { id: 'C03', user: 'Priya Deshmukh', category: 'Road Damage', village: 'Ambegaon', date: '2026-06-15', status: 'Solved', desc: 'Potholes on the entry road have made walking difficult.', photo: '' }
];

const initialBuySell = [
  { id: 'BS01', name: 'Mahindra Tractor 2022', seller: 'Sanjay Thorat', price: '₹4,50,000', village: 'Shirur', status: 'Pending' },
  { id: 'BS02', name: 'Organic Wheat (500kg)', seller: 'Balu Gunjal', price: '₹2,500/quintal', village: 'Khed', status: 'Approved' },
  { id: 'BS03', name: 'HF Breed Milking Cow', seller: 'Dnyaneshwar Shinde', price: '₹60,000', village: 'Ambegaon', status: 'Approved' }
];

const initialJobs = [
  { id: 'J01', title: 'Farm Helper Needed', employer: 'Kisan Agro Farms', salary: '₹350/day', village: 'Shirur', contact: '9011223344', status: 'Pending' },
  { id: 'J02', title: 'Assistant Store Keeper', employer: 'Ganesh Grocery', salary: '₹8,000/month', village: 'Shirur', contact: '9011223345', status: 'Approved' },
  { id: 'J03', title: 'Tractor Driver', employer: 'Baliraja Services', salary: '₹12,000/month', village: 'Khed', contact: '9011223346', status: 'Approved' }
];

const initialEmergencyContacts = [
  { id: 'EC01', category: 'Panchayat Office', name: 'Gram Sevak Office', number: '02138-223344', village: 'Shirur' },
  { id: 'EC02', category: 'Hospital', name: 'Shirur Rural Hospital', number: '02138-224455', village: 'Shirur' },
  { id: 'EC03', category: 'Police', name: 'Khed Police Station', number: '02135-223322', village: 'Khed' },
  { id: 'EC04', category: 'Fire Station', name: 'District Fire Rescue', number: '101', village: 'All' }
];

const initialNews = [
  { id: 'NWS01', title: 'Bumper Crop Yield Expected This Season', desc: 'Due to timely rainfall, local experts predict a 15% rise in agriculture yield.', date: '2026-06-19', village: 'Shirur' },
  { id: 'NWS02', title: 'Annual Village Fair Postponed', desc: 'The annual cultural fair is rescheduled to next month due to school exams.', date: '2026-06-17', village: 'Ambegaon' }
];

export default function App() {
  // Theme & Layout state
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sidebarCollapsible, setSidebarCollapsible] = useState<boolean>(false);
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVillageFilter, setSelectedVillageFilter] = useState<string>('All');
  
  // Login Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  
  // Data States
  const [villages, setVillages] = useState(initialVillages);
  const [users] = useState(initialUsers);
  const [shops, setShops] = useState(initialShops);
  const [services, setServices] = useState(initialServices);
  const [notices, setNotices] = useState(initialNotices);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [buySell, setBuySell] = useState(initialBuySell);
  const [jobs, setJobs] = useState(initialJobs);
  const [emergencyContacts, setEmergencyContacts] = useState(initialEmergencyContacts);
  const [news] = useState(initialNews);
  
  // Modals & Temp States
  const [showVillageModal, setShowVillageModal] = useState<boolean>(false);
  const [editVillageId, setEditVillageId] = useState<string | null>(null);
  const [villageForm, setVillageForm] = useState({ name: '', taluka: '', district: '', population: 0 });

  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [emergencyForm, setEmergencyForm] = useState({ category: 'Police', name: '', number: '', village: 'Shirur' });

  const [noticeForm, setNoticeForm] = useState({ title: '', village: 'Shirur', priority: 'Normal', desc: '', pdf: null as any, image: null as any });
  const [notificationForm, setNotificationForm] = useState({ title: '', message: '', village: 'All', selectAll: true });
  
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [complaintPhotoPreview, setComplaintPhotoPreview] = useState<string | null>(null);
  
  // Notification Bell Center
  const [notificationsList, setNotificationsList] = useState<string[]>([
    "New shop listing 'Khed Agri Plaza' requests approval",
    "Complaint Ticket C01 registered by Sunil Kale",
    "Emergency Contact updated for Shirur village"
  ]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState<boolean>(false);

  // Settings State
  const [settings, setSettings] = useState({
    systemName: "GaavConnect Admin Portal",
    backupInterval: "Daily",
    enablePublicRegistration: true
  });
  
  // Dark mode effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const t = (key: string) => translations[lang][key] || key;

  // Counters
  const pendingApprovalsCount = 
    shops.filter(s => s.status === 'Pending').length +
    services.filter(s => s.status === 'Pending').length +
    buySell.filter(b => b.status === 'Pending').length +
    jobs.filter(j => j.status === 'Pending').length;

  const totalListings = shops.length + services.length + buySell.length + jobs.length;

  // Actions
  const handleApproveShop = (id: string) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
  };
  const handleRejectShop = (id: string) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'Rejected' } : s));
  };
  const handleDeleteShop = (id: string) => {
    setShops(shops.filter(s => s.id !== id));
  };

  const handleApproveService = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
  };
  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleApproveBuySell = (id: string) => {
    setBuySell(buySell.map(b => b.id === id ? { ...b, status: 'Approved' } : b));
  };
  const handleRemoveBuySell = (id: string) => {
    setBuySell(buySell.filter(b => b.id !== id));
  };

  const handleApproveJob = (id: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: 'Approved' } : j));
  };
  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const handleUpdateComplaintStatus = (id: string, status: string) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status } : c));
  };

  // Village functions
  const openAddVillageModal = () => {
    setEditVillageId(null);
    setVillageForm({ name: '', taluka: '', district: '', population: 0 });
    setShowVillageModal(true);
  };

  const openEditVillageModal = (village: any) => {
    setEditVillageId(village.id);
    setVillageForm({ name: village.name, taluka: village.taluka, district: village.district, population: village.population });
    setShowVillageModal(true);
  };

  const handleSaveVillage = (e: React.FormEvent) => {
    e.preventDefault();
    if (editVillageId) {
      setVillages(villages.map(v => v.id === editVillageId ? { ...v, ...villageForm } : v));
    } else {
      const newV = {
        id: `V0${villages.length + 1}`,
        ...villageForm,
        users: 0
      };
      setVillages([...villages, newV]);
    }
    setShowVillageModal(false);
  };

  const handleDeleteVillage = (id: string) => {
    setVillages(villages.filter(v => v.id !== id));
  };

  // Notice functions
  const handlePublishNotice = (status: 'Published' | 'Draft') => {
    if (!noticeForm.title) return;
    const newNotice = {
      id: `N0${notices.length + 1}`,
      title: noticeForm.title,
      village: noticeForm.village,
      date: new Date().toISOString().split('T')[0],
      priority: noticeForm.priority,
      status,
      desc: noticeForm.desc
    };
    setNotices([newNotice, ...notices]);
    setNoticeForm({ title: '', village: 'Shirur', priority: 'Normal', desc: '', pdf: null, image: null });
    alert(`Notice successfully saved as ${status}!`);
  };

  // Emergency contacts functions
  const handleSaveEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newEC = {
      id: `EC0${emergencyContacts.length + 1}`,
      ...emergencyForm
    };
    setEmergencyContacts([...emergencyContacts, newEC]);
    setShowEmergencyModal(false);
  };

  // Broadcast function
  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationForm.title || !notificationForm.message) return;
    alert(`Broadcasting Push Notification:\nTitle: ${notificationForm.title}\nTo: ${notificationForm.selectAll ? 'All users' : notificationForm.village}`);
    setNotificationForm({ title: '', message: '', village: 'All', selectAll: true });
  };

  // Export report simulated downloads
  const triggerDownload = (reportName: string, format: string) => {
    const filename = `${reportName.toLowerCase().replace(/\s+/g, '_')}_report.${format === 'Excel' ? 'xlsx' : 'pdf'}`;
    const element = document.createElement("a");
    const file = new Blob([`Mock data for ${reportName} in ${format} format. Generated on ${new Date().toLocaleDateString()}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Charts data
  const villageUsersData = villages.map(v => ({ name: v.name, users: v.users }));
  
  const complaintStats = [
    { name: 'Pending', value: complaints.filter(c => c.status === 'Pending').length },
    { name: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length },
    { name: 'Solved', value: complaints.filter(c => c.status === 'Solved').length }
  ];
  const PIE_COLORS = ['#ef4444', '#f59e0b', '#10b981'];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
        <div className="absolute top-6 right-6 flex gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
            className="btn btn-outline text-xs px-3 py-1.5 font-bold"
          >
            {lang === 'en' ? 'मराठी' : 'English'}
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <div className="glass-card max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-gradient-to-tr from-blue-600 to-emerald-600 p-3 rounded-2xl text-white shadow-md w-fit mx-auto">
              <FileCode className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">{t('loginTitle')}</h2>
            <p className="text-xs text-slate-400">{t('loginSubtitle')}</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (usernameInput === 'admin' && passwordInput === 'password') {
              setIsLoggedIn(true);
              setLoginError('');
            } else {
              setLoginError(t('invalidCredentials'));
            }
          }} className="space-y-4">
            {loginError && (
              <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 p-3 rounded-xl text-xs font-semibold border border-rose-100 dark:border-rose-950">
                {loginError}
              </div>
            )}
            <div>
              <label className="text-xs font-semibold block mb-1.5">{t('username')}</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. admin"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5">{t('password')}</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full py-2.5 font-bold">
              {t('login')}
            </button>
            <div className="text-center pt-2 text-[10px] text-slate-400">
              Default credentials: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">admin</code> / <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">password</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. Sidebar Menu */}
      <aside className={`flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 ${sidebarCollapsible ? 'w-20' : 'w-72'} min-h-screen sticky top-0`}>
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-gradient-to-tr from-blue-600 to-emerald-600 p-2.5 rounded-xl text-white shadow-md">
                <FileCode className="w-6 h-6" />
              </div>
              {!sidebarCollapsible && (
                <div>
                  <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">GaavConnect</h1>
                  <p className="text-xs text-slate-400">Panchayat Hub</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSidebarCollapsible(!sidebarCollapsible)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {sidebarCollapsible ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
              { id: 'villages', label: t('villages'), icon: MapPin },
              { id: 'users', label: t('users'), icon: UsersIcon },
              { id: 'shops', label: t('shops'), icon: Store },
              { id: 'services', label: t('services'), icon: Wrench },
              { id: 'notices', label: t('notices'), icon: FileText },
              { id: 'complaints', label: t('complaints'), icon: AlertOctagon },
              { id: 'buysell', label: t('buysell'), icon: ShoppingBag },
              { id: 'jobs', label: t('jobs'), icon: Briefcase },
              { id: 'emergency', label: t('emergency'), icon: Phone },
              { id: 'news', label: t('news'), icon: Newspaper },
              { id: 'notifications', label: t('notifications'), icon: Bell },
              { id: 'reports', label: t('reports'), icon: FileDown },
              { id: 'settings', label: t('settings'), icon: SettingsIcon },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={tab.label}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  {!sidebarCollapsible && <span className="truncate">{tab.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Features */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            {!sidebarCollapsible && <span className="text-xs text-slate-500 font-medium">Dark Mode</span>}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          
          <button 
            onClick={() => {
              setIsLoggedIn(false);
              setUsernameInput('');
              setPasswordInput('');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsible && <span>{t('logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* 2. Top Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-850 focus:bg-white rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Village Selector */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <select
                value={selectedVillageFilter}
                onChange={(e) => setSelectedVillageFilter(e.target.value)}
                className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer"
              >
                <option value="All">{t('allVillages')}</option>
                {villages.map(v => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
              className="btn btn-outline text-xs px-3 py-1.5 font-bold"
            >
              {lang === 'en' ? 'मराठी' : 'English'}
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850"
              >
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                {notificationsList.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                )}
              </button>
              
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold text-sm">Notifications</h5>
                    <button 
                      onClick={() => setNotificationsList([])}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notificationsList.map((note, idx) => (
                      <div key={idx} className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl text-xs border-b last:border-0 border-slate-100 dark:border-slate-700">
                        {note}
                      </div>
                    ))}
                    {notificationsList.length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                GA
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold leading-none">{t('welcome')}</p>
                <p className="text-[10px] text-slate-400 mt-1">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Panel */}
        <main className="flex-1 p-8">

          {/* 3. Dashboard Screen */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: t('totalVillages'), value: villages.length, color: 'text-blue-500' },
                  { title: t('totalUsers'), value: users.length, color: 'text-emerald-500' },
                  { title: t('totalShops'), value: shops.length, color: 'text-indigo-500' },
                  { title: t('totalServices'), value: services.length, color: 'text-teal-500' },
                  { title: t('totalComplaints'), value: complaints.length, color: 'text-rose-500' },
                  { title: t('totalNotices'), value: notices.length, color: 'text-amber-500' },
                  { title: t('pendingApprovals'), value: pendingApprovalsCount, color: 'text-pink-500' },
                  { title: t('activeListings'), value: totalListings, color: 'text-purple-500' },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-card flex flex-col justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                    <span className={`text-4xl font-extrabold mt-4 ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Charts & Interactive tables */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Users by Village chart */}
                <div className="glass-card lg:col-span-2">
                  <h3 className="font-bold text-lg mb-6">{t('analyticsOverview')} (Users per Village)</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={villageUsersData}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Complaint Distribution Pie */}
                <div className="glass-card">
                  <h3 className="font-bold text-lg mb-6">Complaint Distribution</h3>
                  <div className="h-64 flex flex-col justify-between">
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={complaintStats}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {complaintStats.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-around text-xs mt-4">
                      {complaintStats.map((stat, i) => (
                        <div key={stat.name} className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></span>
                          <span>{stat.name} ({stat.value})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower tables layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Complaints */}
                <div className="glass-card">
                  <h4 className="font-bold text-base mb-4">{t('recentComplaints')}</h4>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Category</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complaints.slice(0, 3).map(c => (
                          <tr key={c.id}>
                            <td>{c.user}</td>
                            <td>{c.category}</td>
                            <td>
                              <span className={`badge ${
                                c.status === 'Pending' ? 'badge-red' : c.status === 'In Progress' ? 'badge-amber' : 'badge-green'
                              }`}>{c.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* New Shop Requests */}
                <div className="glass-card">
                  <h4 className="font-bold text-base mb-4">{t('newShopRequests')}</h4>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Shop</th>
                          <th>Village</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shops.filter(s => s.status === 'Pending').slice(0, 3).map(s => (
                          <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.village}</td>
                            <td className="flex gap-2">
                              <button onClick={() => handleApproveShop(s.id)} className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleRejectShop(s.id)} className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded">
                                <X className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {shops.filter(s => s.status === 'Pending').length === 0 && (
                          <tr>
                            <td colSpan={3} className="text-center py-4 text-xs text-slate-400">No pending shops</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Villages Management Page */}
          {activeTab === 'villages' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">{t('villages')}</h3>
                <button onClick={openAddVillageModal} className="btn btn-primary">
                  <Plus className="w-4 h-4" />
                  {t('addVillage')}
                </button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Village ID</th>
                      <th>{t('villageName')}</th>
                      <th>{t('taluka')}</th>
                      <th>{t('district')}</th>
                      <th>{t('population')}</th>
                      <th>Total Users</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {villages.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase())).map(v => (
                      <tr key={v.id}>
                        <td className="font-bold">{v.id}</td>
                        <td>{v.name}</td>
                        <td>{v.taluka}</td>
                        <td>{v.district}</td>
                        <td>{v.population.toLocaleString()}</td>
                        <td>{v.users}</td>
                        <td className="flex gap-2">
                          <button onClick={() => openEditVillageModal(v)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteVillage(v.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Shop Management UI */}
          {activeTab === 'shops' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <h3 className="font-bold text-xl">{t('shops')}</h3>
                <div className="flex gap-4">
                  {/* Category Filter */}
                  <select 
                    value={selectedCategoryFilter} 
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="text-xs"
                  >
                    <option value="All">{t('categoryFilter')}</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Medical">Medical</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Shop ID</th>
                      <th>Shop Name</th>
                      <th>Owner Name</th>
                      <th>{t('category')}</th>
                      <th>{t('mobile')}</th>
                      <th>Village</th>
                      <th>{t('status')}</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops
                      .filter(s => selectedVillageFilter === 'All' || s.village === selectedVillageFilter)
                      .filter(s => selectedCategoryFilter === 'All' || s.category === selectedCategoryFilter)
                      .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(s => (
                        <tr key={s.id}>
                          <td className="font-bold">{s.id}</td>
                          <td>{s.name}</td>
                          <td>{s.owner}</td>
                          <td>
                            <span className="badge badge-blue">{s.category}</span>
                          </td>
                          <td>{s.mobile}</td>
                          <td>{s.village}</td>
                          <td>
                            <span className={`badge ${s.status === 'Approved' ? 'badge-green' : s.status === 'Pending' ? 'badge-amber' : 'badge-red'}`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="flex gap-2">
                            {s.status === 'Pending' && (
                              <>
                                <button onClick={() => handleApproveShop(s.id)} className="btn btn-outline text-xs px-2.5 py-1 text-emerald-600 border-emerald-200">
                                  {t('approve')}
                                </button>
                                <button onClick={() => handleRejectShop(s.id)} className="btn btn-outline text-xs px-2.5 py-1 text-rose-600 border-rose-200">
                                  {t('reject')}
                                </button>
                              </>
                            )}
                            <button onClick={() => handleDeleteShop(s.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. Services Management UI */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-bold text-xl">{t('services')}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter(s => selectedVillageFilter === 'All' || s.village === selectedVillageFilter)
                  .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(srv => (
                    <div key={srv.id} className="glass-card relative">
                      <div className="absolute top-4 right-4">
                        <span className={`badge ${srv.status === 'Approved' ? 'badge-green' : 'badge-amber'}`}>
                          {srv.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-base mt-2">{srv.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{srv.category}</p>
                      
                      <div className="space-y-1.5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
                        <p><strong>{t('contact')}:</strong> {srv.contact}</p>
                        <p><strong>Village:</strong> {srv.village}</p>
                        <p><strong>{t('availability')}:</strong> {srv.availability}</p>
                      </div>

                      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        {srv.status === 'Pending' && (
                          <button onClick={() => handleApproveService(srv.id)} className="btn btn-secondary text-xs py-1 px-3">
                            {t('approve')}
                          </button>
                        )}
                        <button onClick={() => handleDeleteService(srv.id)} className="btn btn-outline btn-danger text-xs py-1 px-3">
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 7. Notice Upload UI */}
          {activeTab === 'notices' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              <div className="glass-card lg:col-span-1 h-fit">
                <h3 className="font-bold text-lg mb-6">{t('uploadNotice')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">{t('noticeTitle')}</label>
                    <input
                      type="text"
                      value={noticeForm.title}
                      onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      placeholder="e.g. Village Sanitation Drive"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5">{t('selectVillage')}</label>
                    <select
                      value={noticeForm.village}
                      onChange={(e) => setNoticeForm({ ...noticeForm, village: e.target.value })}
                      className="w-full"
                    >
                      {villages.map(v => (
                        <option key={v.id} value={v.name}>{v.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5">{t('priority')}</label>
                    <select
                      value={noticeForm.priority}
                      onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                      className="w-full"
                    >
                      <option value="Normal">{t('normal')}</option>
                      <option value="Important">{t('important')}</option>
                      <option value="Emergency">{t('emergencyPriority')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5">{t('uploadPdf')}</label>
                    <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                      <FileText className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                      <span className="text-xs text-slate-400">Click to choose notice PDF</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5">{t('uploadImage')}</label>
                    <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                      <ShoppingBag className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                      <span className="text-xs text-slate-400">Click to choose image banner</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5">{t('description')}</label>
                    <textarea
                      value={noticeForm.desc}
                      onChange={(e) => setNoticeForm({ ...noticeForm, desc: e.target.value })}
                      placeholder="Write brief description here..."
                      className="w-full h-24"
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button onClick={() => handlePublishNotice('Published')} className="btn btn-primary flex-1">{t('publish')}</button>
                    <button onClick={() => handlePublishNotice('Draft')} className="btn btn-outline flex-1">{t('saveDraft')}</button>
                  </div>
                </div>
              </div>

              <div className="glass-card lg:col-span-2">
                <h3 className="font-bold text-lg mb-6">{t('latestNotices')}</h3>
                <div className="space-y-4">
                  {notices.map(notice => (
                    <div key={notice.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-start">
                      <div>
                        <div className="flex gap-2 items-center mb-1">
                          <span className={`badge text-[10px] ${
                            notice.priority === 'Emergency' ? 'badge-red' : notice.priority === 'Important' ? 'badge-amber' : 'badge-blue'
                          }`}>
                            {notice.priority}
                          </span>
                          <span className="text-xs text-slate-400">{notice.date}</span>
                        </div>
                        <h4 className="font-bold text-base">{notice.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">Village: {notice.village}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{notice.desc}</p>
                      </div>
                      <span className={`badge ${notice.status === 'Published' ? 'badge-green' : 'badge-amber'}`}>
                        {notice.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 8. Complaint Management UI */}
          {activeTab === 'complaints' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-bold text-xl">{t('complaints')}</h3>
              
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Complaint ID</th>
                      <th>{t('userName')}</th>
                      <th>{t('category')}</th>
                      <th>Village</th>
                      <th>{t('date')}</th>
                      <th>Photo Preview</th>
                      <th>{t('status')}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints
                      .filter(c => selectedVillageFilter === 'All' || c.village === selectedVillageFilter)
                      .filter(c => c.user.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(c => (
                        <tr key={c.id}>
                          <td className="font-bold">{c.id}</td>
                          <td>{c.user}</td>
                          <td>{c.category}</td>
                          <td>{c.village}</td>
                          <td>{c.date}</td>
                          <td>
                            {c.photo ? (
                              <button onClick={() => setComplaintPhotoPreview(c.photo)} className="btn btn-outline text-xs px-2.5 py-1 flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5" />
                                {t('previewPhoto')}
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400">No Image</span>
                            )}
                          </td>
                          <td>
                            <span className={`badge ${
                              c.status === 'Pending' ? 'badge-red' : c.status === 'In Progress' ? 'badge-amber' : 'badge-green'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button onClick={() => handleUpdateComplaintStatus(c.id, 'Pending')} className="btn btn-outline text-[11px] px-2 py-0.5 border-rose-200 text-rose-500">
                                {t('pending')}
                              </button>
                              <button onClick={() => handleUpdateComplaintStatus(c.id, 'In Progress')} className="btn btn-outline text-[11px] px-2 py-0.5 border-amber-200 text-amber-500">
                                {t('inProgress')}
                              </button>
                              <button onClick={() => handleUpdateComplaintStatus(c.id, 'Solved')} className="btn btn-outline text-[11px] px-2 py-0.5 border-emerald-200 text-emerald-500">
                                {t('solved')}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 9. Buy & Sell UI */}
          {activeTab === 'buysell' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-bold text-xl">{t('buysell')}</h3>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Seller Name</th>
                      <th>Price</th>
                      <th>Village</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buySell
                      .filter(b => selectedVillageFilter === 'All' || b.village === selectedVillageFilter)
                      .map(b => (
                        <tr key={b.id}>
                          <td className="font-semibold">{b.name}</td>
                          <td>{b.seller}</td>
                          <td className="font-medium text-emerald-600 dark:text-emerald-400">{b.price}</td>
                          <td>{b.village}</td>
                          <td>
                            <span className={`badge ${b.status === 'Approved' ? 'badge-green' : 'badge-amber'}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="flex gap-2">
                            {b.status === 'Pending' && (
                              <button onClick={() => handleApproveBuySell(b.id)} className="btn btn-secondary text-xs px-3 py-1">
                                {t('approve')}
                              </button>
                            )}
                            <button onClick={() => handleRemoveBuySell(b.id)} className="btn btn-outline text-xs px-3 py-1 text-rose-500 border-rose-200">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 10. Jobs UI */}
          {activeTab === 'jobs' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-bold text-xl">{t('jobs')}</h3>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>{t('jobTitle')}</th>
                      <th>{t('employer')}</th>
                      <th>{t('salary')}</th>
                      <th>Village</th>
                      <th>{t('contact')}</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs
                      .filter(j => selectedVillageFilter === 'All' || j.village === selectedVillageFilter)
                      .map(j => (
                        <tr key={j.id}>
                          <td className="font-semibold">{j.title}</td>
                          <td>{j.employer}</td>
                          <td>{j.salary}</td>
                          <td>{j.village}</td>
                          <td>{j.contact}</td>
                          <td>
                            <span className={`badge ${j.status === 'Approved' ? 'badge-green' : 'badge-amber'}`}>
                              {j.status}
                            </span>
                          </td>
                          <td className="flex gap-2">
                            {j.status === 'Pending' && (
                              <button onClick={() => handleApproveJob(j.id)} className="btn btn-secondary text-xs px-3 py-1">
                                {t('approve')}
                              </button>
                            )}
                            <button onClick={() => handleDeleteJob(j.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 11. Emergency Contacts UI */}
          {activeTab === 'emergency' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">{t('emergency')}</h3>
                <button onClick={() => setShowEmergencyModal(true)} className="btn btn-primary">
                  <Plus className="w-4 h-4" />
                  {t('addContact')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {emergencyContacts
                  .filter(ec => selectedVillageFilter === 'All' || ec.village === 'All' || ec.village === selectedVillageFilter)
                  .map(ec => (
                    <div key={ec.id} className="glass-card">
                      <span className="badge badge-amber text-[10px]">{ec.category}</span>
                      <h4 className="font-bold text-base mt-3">{ec.name}</h4>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">{ec.number}</p>
                      <p className="text-xs text-slate-400 mt-2">Village Scope: {ec.village}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 12. News Tab */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-bold text-xl">{t('news')}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map(nw => (
                  <div key={nw.id} className="glass-card flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>{nw.date}</span>
                        <span>{nw.village}</span>
                      </div>
                      <h4 className="font-bold text-base text-blue-600 dark:text-blue-400 mb-2">{nw.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{nw.desc}</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button className="btn btn-outline text-xs px-2.5 py-1">
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 13. Notifications UI */}
          {activeTab === 'notifications' && (
            <div className="max-w-2xl mx-auto glass-card animate-fade-in">
              <h3 className="font-bold text-lg mb-6">{t('broadcastNotification')}</h3>
              <form onSubmit={handleSendNotification} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1.5">{t('title')}</label>
                  <input
                    type="text"
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                    placeholder="Notice Heading"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5">{t('message')}</label>
                  <textarea
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                    placeholder="Notification message body..."
                    className="w-full h-32"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5">{t('selectVillage')}</label>
                  <select
                    value={notificationForm.village}
                    onChange={(e) => setNotificationForm({ ...notificationForm, village: e.target.value, selectAll: false })}
                    className="w-full"
                    disabled={notificationForm.selectAll}
                  >
                    <option value="All">All villages</option>
                    {villages.map(v => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="selectAllUsers"
                    checked={notificationForm.selectAll}
                    onChange={(e) => setNotificationForm({ ...notificationForm, selectAll: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="selectAllUsers" className="text-xs text-slate-600 dark:text-slate-400">
                    {t('selectAllUsers')}
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                  {t('send')}
                </button>
              </form>
            </div>
          )}

          {/* 14. Reports UI */}
          {activeTab === 'reports' && (
            <div className="space-y-8 animate-fade-in">
              <h3 className="font-bold text-xl">{t('exportReports')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: t('shopsReport'), count: shops.length, desc: "Listings, owners, village stats, approved/rejected states." },
                  { name: t('complaintsReport'), count: complaints.length, desc: "Pending, solved tickets, categories & village resolution logs." },
                  { name: t('userReport'), count: users.length, desc: "Registered villagers demographics and engagement metrics." },
                  { name: t('noticesReport'), count: notices.length, desc: "Historical archive of all Panchayat published boards." },
                ].map((rep, idx) => (
                  <div key={idx} className="glass-card flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-lg mb-2">{rep.name}</h4>
                      <p className="text-xs text-slate-400 mb-4">{rep.desc}</p>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1 rounded-md">
                        {rep.count} records available
                      </span>
                    </div>

                    <div className="flex gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button onClick={() => triggerDownload(rep.name, 'PDF')} className="btn btn-outline text-xs flex-1 flex items-center justify-center gap-2">
                        <Download className="w-3.5 h-3.5" />
                        {t('downloadPdf')}
                      </button>
                      <button onClick={() => triggerDownload(rep.name, 'Excel')} className="btn btn-outline text-xs flex-1 flex items-center justify-center gap-2">
                        <Download className="w-3.5 h-3.5" />
                        {t('downloadExcel')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 15. Settings UI */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto glass-card animate-fade-in">
              <h3 className="font-bold text-lg mb-6">{t('systemSettings')}</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold block mb-1.5">Portal Title Name</label>
                  <input
                    type="text"
                    value={settings.systemName}
                    onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5">Database Backup Interval</label>
                  <select
                    value={settings.backupInterval}
                    onChange={(e) => setSettings({ ...settings, backupInterval: e.target.value })}
                    className="w-full"
                  >
                    <option value="Daily">Daily Auto Backup</option>
                    <option value="Weekly">Weekly Auto Backup</option>
                    <option value="Monthly">Monthly Auto Backup</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enablePublic"
                    checked={settings.enablePublicRegistration}
                    onChange={(e) => setSettings({ ...settings, enablePublicRegistration: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="enablePublic" className="text-sm">
                    Allow online shop & services registrations directly from mobile app
                  </label>
                </div>

                <button 
                  onClick={() => alert("Preferences saved successfully!")}
                  className="btn btn-primary w-full mt-6"
                >
                  {t('savePreferences')}
                </button>
              </div>
            </div>
          )}

          {/* Users Management Page */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-bold text-xl">{t('users')}</h3>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>{t('mobile')}</th>
                      <th>Village</th>
                      <th>Role</th>
                      <th>Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(u => selectedVillageFilter === 'All' || u.village === selectedVillageFilter)
                      .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(u => (
                        <tr key={u.id}>
                          <td className="font-bold">{u.id}</td>
                          <td>{u.name}</td>
                          <td>{u.mobile}</td>
                          <td>{u.village}</td>
                          <td>
                            <span className={`badge ${
                              u.role === 'Admin' ? 'badge-blue' : u.role === 'Farmer' ? 'badge-green' : 'badge-amber'
                            }`}>{u.role}</span>
                          </td>
                          <td>{u.joined}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Villages Add/Edit Popup Modal */}
      {showVillageModal && (
        <div className="modal-overlay">
          <form onSubmit={handleSaveVillage} className="modal-content p-6 space-y-4">
            <h4 className="font-bold text-lg">{editVillageId ? 'Edit Village Details' : t('addVillage')}</h4>
            
            <div>
              <label className="text-xs font-semibold block mb-1">{t('villageName')}</label>
              <input
                type="text"
                value={villageForm.name}
                onChange={(e) => setVillageForm({ ...villageForm, name: e.target.value })}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">{t('taluka')}</label>
              <input
                type="text"
                value={villageForm.taluka}
                onChange={(e) => setVillageForm({ ...villageForm, taluka: e.target.value })}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">{t('district')}</label>
              <input
                type="text"
                value={villageForm.district}
                onChange={(e) => setVillageForm({ ...villageForm, district: e.target.value })}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">{t('population')}</label>
              <input
                type="number"
                value={villageForm.population}
                onChange={(e) => setVillageForm({ ...villageForm, population: Number(e.target.value) })}
                className="w-full"
                required
              />
            </div>

            <div className="flex gap-4 pt-2 justify-end">
              <button type="button" onClick={() => setShowVillageModal(false)} className="btn btn-outline">{t('cancel')}</button>
              <button type="submit" className="btn btn-primary">{t('save')}</button>
            </div>
          </form>
        </div>
      )}

      {/* Emergency Contact Modal */}
      {showEmergencyModal && (
        <div className="modal-overlay">
          <form onSubmit={handleSaveEmergencyContact} className="modal-content p-6 space-y-4">
            <h4 className="font-bold text-lg">{t('addContact')}</h4>
            
            <div>
              <label className="text-xs font-semibold block mb-1">{t('category')}</label>
              <select
                value={emergencyForm.category}
                onChange={(e) => setEmergencyForm({ ...emergencyForm, category: e.target.value })}
                className="w-full"
              >
                <option value="Police">Police</option>
                <option value="Hospital">Hospital</option>
                <option value="Fire Station">Fire Station</option>
                <option value="Panchayat Office">Panchayat Office</option>
                <option value="Water Supply">Water Supply</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">{t('contactPerson')}</label>
              <input
                type="text"
                value={emergencyForm.name}
                onChange={(e) => setEmergencyForm({ ...emergencyForm, name: e.target.value })}
                className="w-full"
                placeholder="e.g. Inspector Deshmukh"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">{t('number')}</label>
              <input
                type="text"
                value={emergencyForm.number}
                onChange={(e) => setEmergencyForm({ ...emergencyForm, number: e.target.value })}
                className="w-full"
                placeholder="e.g. 02138-123456"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">{t('selectVillage')}</label>
              <select
                value={emergencyForm.village}
                onChange={(e) => setEmergencyForm({ ...emergencyForm, village: e.target.value })}
                className="w-full"
              >
                <option value="All">All villages</option>
                {villages.map(v => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-2 justify-end">
              <button type="button" onClick={() => setShowEmergencyModal(false)} className="btn btn-outline">{t('cancel')}</button>
              <button type="submit" className="btn btn-primary">{t('save')}</button>
            </div>
          </form>
        </div>
      )}

      {/* Image Preview Modal */}
      {complaintPhotoPreview && (
        <div className="modal-overlay" onClick={() => setComplaintPhotoPreview(null)}>
          <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-premium" onClick={(e) => e.stopPropagation()}>
            <img src={complaintPhotoPreview} alt="Complaint detail" className="w-full h-auto rounded-xl max-h-[70vh] object-cover" />
            <button 
              onClick={() => setComplaintPhotoPreview(null)}
              className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
