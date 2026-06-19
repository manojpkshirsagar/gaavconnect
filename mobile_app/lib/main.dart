import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'services/supabase_service.dart';
import 'services/translations.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  final String? savedVillageId = prefs.getString('selected_village_id');
  final String? savedVillageName = prefs.getString('selected_village_name');
  final String savedLang = prefs.getString('language') ?? 'mr';

  final supabaseService = SupabaseService();
  if (savedVillageId != null) {
    supabaseService.selectedVillageId = savedVillageId;
    supabaseService.selectedVillageName = savedVillageName;
  }

  runApp(GaavConnectApp(
    initialVillageId: savedVillageId,
    initialLang: savedLang,
  ));
}

class GaavConnectApp extends StatefulWidget {
  final String? initialVillageId;
  final String initialLang;

  const GaavConnectApp({
    super.key,
    this.initialVillageId,
    required this.initialLang,
  });

  @override
  State<GaavConnectApp> createState() => _GaavConnectAppState();
}

class _GaavConnectAppState extends State<GaavConnectApp> {
  late String currentLang;
  String? activeVillageId;

  @override
  void initState() {
    super.initState();
    currentLang = widget.initialLang;
    activeVillageId = widget.initialVillageId;
  }

  void changeLanguage(String lang) async {
    setState(() {
      currentLang = lang;
    });
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('language', lang);
  }

  void changeVillage(String? id, String? name) async {
    setState(() {
      activeVillageId = id;
    });
    final prefs = await SharedPreferences.getInstance();
    if (id != null) {
      await prefs.setString('selected_village_id', id);
      await prefs.setString('selected_village_name', name ?? '');
      SupabaseService().selectedVillageId = id;
      SupabaseService().selectedVillageName = name;
    } else {
      await prefs.remove('selected_village_id');
      await prefs.remove('selected_village_name');
      SupabaseService().selectedVillageId = null;
      SupabaseService().selectedVillageName = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GaavConnect',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        primaryColor: const Color(0xFF1E88E5),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E88E5),
          primary: const Color(0xFF1E88E5),
          secondary: const Color(0xFF26A69A),
        ),
        textTheme: GoogleFonts.outfitTextTheme(ThemeData.light().textTheme),
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF1E88E5),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E88E5),
          brightness: Brightness.dark,
          primary: const Color(0xFF1E88E5),
          secondary: const Color(0xFF26A69A),
        ),
        textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme),
      ),
      themeMode: ThemeMode.system,
      home: activeVillageId == null
          ? VillageSelectionScreen(
              currentLang: currentLang,
              onVillageSelected: changeVillage,
              onLanguageChanged: changeLanguage,
            )
          : NavigationShell(
              currentLang: currentLang,
              onLanguageChanged: changeLanguage,
              onVillageReset: () => changeVillage(null, null),
            ),
    );
  }
}

// Village Selection Screen
class VillageSelectionScreen extends StatefulWidget {
  final String currentLang;
  final Function(String, String) onVillageSelected;
  final Function(String) onLanguageChanged;

  const VillageSelectionScreen({
    super.key,
    required this.currentLang,
    required this.onVillageSelected,
    required this.onLanguageChanged,
  });

  @override
  State<VillageSelectionScreen> createState() => _VillageSelectionScreenState();
}

class _VillageSelectionScreenState extends State<VillageSelectionScreen> {
  List<Map<String, dynamic>> villages = [];
  String searchQuery = '';

  @override
  void initState() {
    super.initState();
    loadVillages();
  }

  void loadVillages() async {
    final list = await SupabaseService().getVillages();
    setState(() {
      villages = list;
    });
  }

  @override
  Widget build(BuildContext context) {
    final filtered = villages
        .where((v) => v['name'].toString().toLowerCase().contains(searchQuery.toLowerCase()))
        .toList();

    return Scaffold(
      appBar: AppBar(
        title: Text(
          Translations.get('select_village', widget.currentLang),
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          TextButton(
            onPressed: () {
              widget.onLanguageChanged(widget.currentLang == 'mr' ? 'en' : 'mr');
            },
            child: Text(
              widget.currentLang == 'mr' ? 'English' : 'मराठी',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          )
        ],
        elevation: 0,
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                hintText: Translations.get('search_village', widget.currentLang),
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onChanged: (val) {
                setState(() {
                  searchQuery = val;
                });
              },
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: filtered.length,
                itemBuilder: (context, index) {
                  final v = filtered[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 2,
                    child: ListTile(
                      title: Text(
                        v['name'],
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                      ),
                      subtitle: Text('${v['taluka']}, ${v['district']}'),
                      trailing: Icon(Icons.arrow_forward_ios, size: 16, color: Theme.of(context).primaryColor),
                      onTap: () {
                        widget.onVillageSelected(v['village_id'], v['name']);
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Navigation Shell holding screens
class NavigationShell extends StatefulWidget {
  final String currentLang;
  final Function(String) onLanguageChanged;
  final VoidCallback onVillageReset;

  const NavigationShell({
    super.key,
    required this.currentLang,
    required this.onLanguageChanged,
    required this.onVillageReset,
  });

  @override
  State<NavigationShell> createState() => _NavigationShellState();
}

class _NavigationShellState extends State<NavigationShell> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final List<Widget> children = [
      HomeScreen(currentLang: widget.currentLang),
      ShopsScreen(currentLang: widget.currentLang),
      ServicesScreen(currentLang: widget.currentLang),
      NoticesScreen(currentLang: widget.currentLang),
      ProfileScreen(
        currentLang: widget.currentLang,
        onLanguageChanged: widget.onLanguageChanged,
        onVillageReset: widget.onVillageReset,
      ),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: children,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        selectedItemColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.grey,
        items: [
          BottomNavigationBarItem(
            icon: const Icon(Icons.home_outlined),
            activeIcon: const Icon(Icons.home),
            label: Translations.get('home', widget.currentLang),
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.store_mall_directory_outlined),
            activeIcon: const Icon(Icons.store_mall_directory),
            label: Translations.get('shops', widget.currentLang),
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.build_outlined),
            activeIcon: const Icon(Icons.build),
            label: Translations.get('services', widget.currentLang),
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.campaign_outlined),
            activeIcon: const Icon(Icons.campaign),
            label: Translations.get('notices', widget.currentLang),
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.person_outline),
            activeIcon: const Icon(Icons.person),
            label: Translations.get('profile', widget.currentLang),
          ),
        ],
      ),
    );
  }
}

// 1. Home Screen
class HomeScreen extends StatelessWidget {
  final String currentLang;
  const HomeScreen({super.key, required this.currentLang});

  void _makePhoneCall(String phoneNumber) async {
    final Uri launchUri = Uri(
      scheme: 'tel',
      path: phoneNumber,
    );
    await launchUrl(launchUri);
  }

  @override
  Widget build(BuildContext context) {
    final service = SupabaseService();
    return Scaffold(
      appBar: AppBar(
        title: Text(
          '${Translations.get('app_title', currentLang)} - ${service.selectedVillageName}',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Banner/Header Widget
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1E88E5), Color(0xFF26A69A)],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'डिजिटल ग्रामपंचायत / Digital Panchayat',
                    style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'GaavConnect matches all daily requirements in the village.',
                    style: TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Modules Grid
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              childAspectRatio: 1.5,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              children: [
                _buildQuickCard(context, Icons.info_outline, Translations.get('news', currentLang), () {
                  _showFeaturePlaceholder(context, Translations.get('news', currentLang));
                }),
                _buildQuickCard(context, Icons.shopping_basket_outlined, Translations.get('marketplace', currentLang), () {
                  _showFeaturePlaceholder(context, Translations.get('marketplace', currentLang));
                }),
                _buildQuickCard(context, Icons.work_outline, Translations.get('jobs', currentLang), () {
                  _showFeaturePlaceholder(context, Translations.get('jobs', currentLang));
                }),
                _buildQuickCard(context, Icons.report_problem_outlined, Translations.get('complaints', currentLang), () {
                  _showComplaintDialog(context);
                }),
              ],
            ),
            const SizedBox(height: 20),

            // Emergency Contacts
            Text(
              Translations.get('emergency', currentLang),
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const SizedBox(height: 10),
            FutureBuilder<List<Map<String, dynamic>>>(
              future: service.getEmergencyContacts(service.selectedVillageId ?? ''),
              builder: (context, snapshot) {
                if (!snapshot.hasData) return const CircularProgressIndicator();
                final contacts = snapshot.data!;
                return ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: contacts.length,
                  itemBuilder: (context, index) {
                    final c = contacts[index];
                    return Card(
                      child: ListTile(
                        title: Text(c['name']),
                        subtitle: Text(c['phone']),
                        trailing: IconButton(
                          icon: const Icon(Icons.phone, color: Colors.green),
                          onPressed: () => _makePhoneCall(c['phone']),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickCard(BuildContext context, IconData icon, String title, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 32, color: Theme.of(context).primaryColor),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  void _showFeaturePlaceholder(BuildContext context, String name) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(name),
        content: Text('$name module loaded for village.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('OK')),
        ],
      ),
    );
  }

  void _showComplaintDialog(BuildContext context) {
    final titleController = TextEditingController();
    final descController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(Translations.get('submit_complaint', currentLang)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: InputDecoration(
                hintText: Translations.get('comp_title', currentLang),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: descController,
              decoration: InputDecoration(
                hintText: Translations.get('comp_desc', currentLang),
              ),
              maxLines: 3,
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              if (titleController.text.isNotEmpty && descController.text.isNotEmpty) {
                final messenger = ScaffoldMessenger.of(context);
                final navigator = Navigator.of(context);
                await SupabaseService().submitComplaint({
                  'user_name': 'Villager User',
                  'village_id': SupabaseService().selectedVillageId,
                  'category': 'Water problem',
                  'description': descController.text,
                });
                navigator.pop();
                messenger.showSnackBar(
                  const SnackBar(content: Text('Complaint filed successfully!')),
                );
              }
            },
            child: Text(Translations.get('submit', currentLang)),
          ),
        ],
      ),
    );
  }
}

// 2. Shops Screen
class ShopsScreen extends StatefulWidget {
  final String currentLang;
  const ShopsScreen({super.key, required this.currentLang});

  @override
  State<ShopsScreen> createState() => _ShopsScreenState();
}

class _ShopsScreenState extends State<ShopsScreen> {
  String selectedCategory = 'All';
  String searchQuery = '';
  final categories = [
    'All',
    'Grocery',
    'Medical',
    'Hardware',
    'Tailor',
    'Mobile Repair',
    'Electronics',
    'Agriculture shop'
  ];

  void _launchWhatsApp(String number) async {
    final url = Uri.parse('https://wa.me/91$number');
    await launchUrl(url);
  }

  void _makeCall(String number) async {
    await launchUrl(Uri(scheme: 'tel', path: number));
  }

  void _shareQR(Map<String, dynamic> shop) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(shop['name']),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 200,
              height: 200,
              child: QrImageView(
                data: 'Shop: ${shop['name']}, Contact: ${shop['phone']}',
                version: QrVersions.auto,
              ),
            ),
            const SizedBox(height: 10),
            const Text('Scan to save contact details.', textAlign: TextAlign.center),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Close')),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final service = SupabaseService();
    return Scaffold(
      appBar: AppBar(
        title: Text(Translations.get('shops', widget.currentLang)),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: Translations.get('search_village', widget.currentLang),
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onChanged: (val) {
                setState(() {
                  searchQuery = val;
                });
              },
            ),
          ),
          SizedBox(
            height: 40,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final cat = categories[index];
                final isSelected = selectedCategory == cat;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: ChoiceChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (val) {
                      setState(() {
                        selectedCategory = cat;
                      });
                    },
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 10),
          Expanded(
            child: FutureBuilder<List<Map<String, dynamic>>>(
              future: service.getShops(service.selectedVillageId ?? ''),
              builder: (context, snapshot) {
                if (!snapshot.hasData) return const Center(child: CircularProgressIndicator());
                var list = snapshot.data!;
                if (selectedCategory != 'All') {
                  list = list.where((s) => s['category'] == selectedCategory).toList();
                }
                if (searchQuery.isNotEmpty) {
                  list = list.where((s) => s['name'].toString().toLowerCase().contains(searchQuery.toLowerCase())).toList();
                }

                if (list.isEmpty) {
                  return Center(child: Text(Translations.get('no_shops', widget.currentLang)));
                }

                return ListView.builder(
                  itemCount: list.length,
                  itemBuilder: (context, index) {
                    final shop = list[index];
                    return Card(
                      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  shop['name'],
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                                ),
                                Chip(
                                  label: Text(shop['category']),
                                  backgroundColor: Theme.of(context).primaryColor.withValues(alpha: 0.1),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text('Owner: ${shop['owner_name']}'),
                            Text('Timings: ${shop['open_time']} - ${shop['close_time']}'),
                            Text('Address: ${shop['address']}'),
                            const SizedBox(height: 10),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                TextButton.icon(
                                  icon: const Icon(Icons.qr_code),
                                  label: Text(Translations.get('share_qr', widget.currentLang)),
                                  onPressed: () => _shareQR(shop),
                                ),
                                IconButton(
                                  icon: const Icon(Icons.message, color: Colors.teal),
                                  onPressed: () => _launchWhatsApp(shop['whatsapp_number']),
                                ),
                                IconButton(
                                  icon: const Icon(Icons.phone, color: Colors.green),
                                  onPressed: () => _makeCall(shop['phone']),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// 3. Services Screen
class ServicesScreen extends StatefulWidget {
  final String currentLang;
  const ServicesScreen({super.key, required this.currentLang});

  @override
  State<ServicesScreen> createState() => _ServicesScreenState();
}

class _ServicesScreenState extends State<ServicesScreen> {
  String selectedCategory = 'All';
  final categories = [
    'All',
    'Electrician',
    'Plumber',
    'Carpenter',
    'Tractor',
    'JCB',
    'Water tanker',
    'Milkman',
    'Internet provider',
    'Labour'
  ];

  void _makeCall(String number) async {
    await launchUrl(Uri(scheme: 'tel', path: number));
  }

  @override
  Widget build(BuildContext context) {
    final service = SupabaseService();
    return Scaffold(
      appBar: AppBar(
        title: Text(Translations.get('services', widget.currentLang)),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Column(
        children: [
          SizedBox(
            height: 40,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final cat = categories[index];
                final isSelected = selectedCategory == cat;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: ChoiceChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (val) {
                      setState(() {
                        selectedCategory = cat;
                      });
                    },
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 10),
          Expanded(
            child: FutureBuilder<List<Map<String, dynamic>>>(
              future: service.getServices(service.selectedVillageId ?? ''),
              builder: (context, snapshot) {
                if (!snapshot.hasData) return const Center(child: CircularProgressIndicator());
                var list = snapshot.data!;
                if (selectedCategory != 'All') {
                  list = list.where((s) => s['category'] == selectedCategory).toList();
                }

                if (list.isEmpty) {
                  return Center(child: Text(Translations.get('no_services', widget.currentLang)));
                }

                return ListView.builder(
                  itemCount: list.length,
                  itemBuilder: (context, index) {
                    final item = list[index];
                    return Card(
                      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      child: ListTile(
                        title: Text(item['name'], style: const TextStyle(fontWeight: FontWeight.bold)),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('${Translations.get('rate', widget.currentLang)}: ${item['rate']}'),
                            Text(item['description'] ?? ''),
                          ],
                        ),
                        trailing: IconButton(
                          icon: const Icon(Icons.phone, color: Colors.green),
                          onPressed: () => _makeCall(item['phone']),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// 4. Notices Screen
class NoticesScreen extends StatelessWidget {
  final String currentLang;
  const NoticesScreen({super.key, required this.currentLang});

  @override
  Widget build(BuildContext context) {
    final service = SupabaseService();
    return Scaffold(
      appBar: AppBar(
        title: Text(Translations.get('notices', currentLang)),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: service.getNotices(service.selectedVillageId ?? ''),
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const Center(child: CircularProgressIndicator());
          final list = snapshot.data!;

          if (list.isEmpty) {
            return Center(child: Text(Translations.get('no_notices', currentLang)));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(12),
            itemCount: list.length,
            itemBuilder: (context, index) {
              final notice = list[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 6),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Chip(
                            label: Text(notice['category'].toString().toUpperCase()),
                            backgroundColor: Colors.orange.withValues(alpha: 0.1),
                          ),
                          Text(notice['created_at'].toString().substring(0, 10)),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        notice['title'],
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      const SizedBox(height: 8),
                      Text(notice['description'] ?? ''),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

// 5. Profile Screen
class ProfileScreen extends StatelessWidget {
  final String currentLang;
  final Function(String) onLanguageChanged;
  final VoidCallback onVillageReset;

  const ProfileScreen({
    super.key,
    required this.currentLang,
    required this.onLanguageChanged,
    required this.onVillageReset,
  });

  @override
  Widget build(BuildContext context) {
    final service = SupabaseService();
    return Scaffold(
      appBar: AppBar(
        title: Text(Translations.get('profile', currentLang)),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const CircleAvatar(
            radius: 40,
            child: Icon(Icons.person, size: 40),
          ),
          const SizedBox(height: 12),
          Text(
            Translations.get('guest', currentLang),
            textAlign: TextAlign.center,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          const SizedBox(height: 20),
          ListTile(
            title: Text(Translations.get('language', currentLang)),
            subtitle: Text(currentLang == 'mr' ? 'मराठी (Marathi)' : 'English'),
            trailing: const Icon(Icons.translate),
            onTap: () {
              onLanguageChanged(currentLang == 'mr' ? 'en' : 'mr');
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('Active Village'),
            subtitle: Text(service.selectedVillageName ?? 'None'),
            trailing: const Icon(Icons.edit),
            onTap: onVillageReset,
          ),
          const Divider(),
          ListTile(
            title: Text(Translations.get('auth_options', currentLang)),
            leading: const Icon(Icons.login),
            onTap: () {
              // Simulated OTP login trigger
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('OTP feature login triggered!')),
              );
            },
          ),
        ],
      ),
    );
  }
}
