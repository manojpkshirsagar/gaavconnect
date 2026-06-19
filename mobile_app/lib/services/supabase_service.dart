import 'dart:async';

class SupabaseService {
  static final SupabaseService _instance = SupabaseService._internal();
  factory SupabaseService() => _instance;
  SupabaseService._internal();

  // Selected village info cached locally
  String? selectedVillageId;
  String? selectedVillageName;

  // Mock Data
  final List<Map<String, dynamic>> mockVillages = [
    {'village_id': 'v1', 'name': 'Shirur', 'taluka': 'Shirur', 'district': 'Pune'},
    {'village_id': 'v2', 'name': 'Khed', 'taluka': 'Khed', 'district': 'Pune'},
    {'village_id': 'v3', 'name': 'Baramati', 'taluka': 'Baramati', 'district': 'Pune'},
  ];

  final List<Map<String, dynamic>> mockShops = [
    {
      'shop_id': 's1',
      'name': 'Ganesh Kirana Store',
      'owner_name': 'Ganesh Patil',
      'phone': '9876543210',
      'address': 'Main Market Road, Shirur',
      'village_id': 'v1',
      'category': 'Grocery',
      'open_time': '08:00 AM',
      'close_time': '09:00 PM',
      'photo_url': null,
      'whatsapp_number': '9876543210',
      'is_approved': true
    },
    {
      'shop_id': 's2',
      'name': 'Arogya Medical',
      'owner_name': 'Dr. Amit Shah',
      'phone': '9822114455',
      'address': 'Bus Stand Chowk, Shirur',
      'village_id': 'v1',
      'category': 'Medical',
      'open_time': '24 Hours',
      'close_time': '24 Hours',
      'photo_url': null,
      'whatsapp_number': '9822114455',
      'is_approved': true
    },
    {
      'shop_id': 's3',
      'name': 'Khed Agri Plaza',
      'owner_name': 'Sanjay Deshmukh',
      'phone': '9988776655',
      'address': 'Near Panchayat Office, Khed',
      'village_id': 'v2',
      'category': 'Agriculture shop',
      'open_time': '09:00 AM',
      'close_time': '07:00 PM',
      'photo_url': null,
      'whatsapp_number': '9988776655',
      'is_approved': true
    }
  ];

  final List<Map<String, dynamic>> mockServices = [
    {
      'service_id': 'srv1',
      'name': 'Ramesh Shinde (Electrician)',
      'phone': '9123456789',
      'village_id': 'v1',
      'category': 'Electrician',
      'availability': true,
      'rate': '₹200/visit',
      'description': 'All types of house wiring and appliance repairs.',
      'is_approved': true
    },
    {
      'service_id': 'srv2',
      'name': 'Maruti Water Tankers',
      'phone': '9555667788',
      'village_id': 'v1',
      'category': 'Water tanker',
      'availability': true,
      'rate': '₹1000/tanker',
      'description': '5000 Litres clean drinking/usable water.',
      'is_approved': true
    }
  ];

  final List<Map<String, dynamic>> mockNotices = [
    {
      'notice_id': 'n1',
      'title': 'पाणी कपात सूचना / Water Outage Notice',
      'description': 'उद्या सकाळी पाणी पुरवठा तांत्रिक कारणामुळे बंद राहील. (Water supply will be closed tomorrow morning due to maintenance.)',
      'category': 'water',
      'attachment_url': null,
      'is_pdf': false,
      'village_id': 'v1',
      'created_at': '2026-06-19T10:00:00Z'
    },
    {
      'notice_id': 'n2',
      'title': 'ग्रामसभा बैठक / Gram Sabha Meeting',
      'description': '२१ जून रोजी सकाळी ११ वाजता ग्रामपंचायत कार्यालयात मासिक सभेचे आयोजन केले आहे.',
      'category': 'meeting',
      'attachment_url': null,
      'is_pdf': false,
      'village_id': 'v1',
      'created_at': '2026-06-18T12:00:00Z'
    }
  ];

  final List<Map<String, dynamic>> mockComplaints = [];

  final List<Map<String, dynamic>> mockEmergencyContacts = [
    {'contact_id': 'e1', 'name': 'Police Station (पोलीस)', 'category': 'Police', 'phone': '100', 'village_id': 'v1'},
    {'contact_id': 'e2', 'name': 'Ambulance (रुग्णवाहिका)', 'category': 'Ambulance', 'phone': '108', 'village_id': 'v1'},
    {'contact_id': 'e3', 'name': 'Sarpanch (सरपंच)', 'category': 'Sarpanch', 'phone': '9800011122', 'village_id': 'v1'},
    {'contact_id': 'e4', 'name': 'Electricity Office (MSEB)', 'category': 'Electricity office', 'phone': '18002333435', 'village_id': 'v1'},
  ];

  final List<Map<String, dynamic>> mockMarketplace = [
    {
      'item_id': 'm1',
      'item_name': 'गावरान गाय (HF Cow)',
      'price': 45000.0,
      'photo_url': null,
      'seller_contact': '9890123456',
      'category': 'Animals',
      'description': '12 Litre milk capacity per day. Healthy and vaccinated.',
      'village_id': 'v1',
      'created_at': '2026-06-19T08:00:00Z'
    }
  ];

  final List<Map<String, dynamic>> mockJobs = [
    {
      'job_id': 'j1',
      'job_title': 'कृषी कामगार / Farm Labour',
      'salary': '₹400 / day',
      'contact': '9422001122',
      'category': 'Labour work',
      'description': 'Need 5 workers for soybean harvesting.',
      'village_id': 'v1',
      'created_at': '2026-06-19T06:00:00Z'
    }
  ];

  final List<Map<String, dynamic>> mockNews = [
    {
      'news_id': 'nw1',
      'title': 'पीक विमा नोंदणी सुरु / Crop Insurance Registration Starts',
      'content': 'सर्व शेतकऱ्यांनी चालू हंगामासाठी पीक विमा नोंदणी त्वरित करून घ्यावी. (All farmers should register for crop insurance immediately.)',
      'image_url': null,
      'category': 'Agriculture updates',
      'village_id': 'v1',
      'created_at': '2026-06-19T05:00:00Z'
    }
  ];

  // API Call Emulators
  Future<List<Map<String, dynamic>>> getVillages() async {
    return mockVillages;
  }

  Future<List<Map<String, dynamic>>> getShops(String villageId) async {
    return mockShops.where((s) => s['village_id'] == villageId && s['is_approved'] == true).toList();
  }

  Future<List<Map<String, dynamic>>> getServices(String villageId) async {
    return mockServices.where((s) => s['village_id'] == villageId && s['is_approved'] == true).toList();
  }

  Future<List<Map<String, dynamic>>> getNotices(String villageId) async {
    return mockNotices.where((n) => n['village_id'] == villageId).toList();
  }

  Future<List<Map<String, dynamic>>> getEmergencyContacts(String villageId) async {
    return mockEmergencyContacts.where((e) => e['village_id'] == villageId).toList();
  }

  Future<List<Map<String, dynamic>>> getMarketplace(String villageId) async {
    return mockMarketplace.where((m) => m['village_id'] == villageId).toList();
  }

  Future<List<Map<String, dynamic>>> getJobs(String villageId) async {
    return mockJobs.where((j) => j['village_id'] == villageId).toList();
  }

  Future<List<Map<String, dynamic>>> getNews(String villageId) async {
    return mockNews.where((n) => n['village_id'] == villageId).toList();
  }

  Future<void> submitComplaint(Map<String, dynamic> complaint) async {
    complaint['complaint_id'] = 'comp_${DateTime.now().millisecondsSinceEpoch}';
    complaint['status'] = 'Pending';
    complaint['created_at'] = DateTime.now().toIso8601String();
    mockComplaints.add(complaint);
  }

  Future<List<Map<String, dynamic>>> getComplaints(String villageId) async {
    return mockComplaints.where((c) => c['village_id'] == villageId).toList();
  }
}
