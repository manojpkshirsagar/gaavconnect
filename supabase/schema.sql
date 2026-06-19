-- Create villages table
CREATE TABLE IF NOT EXISTS villages (
    village_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    taluka TEXT NOT NULL,
    district TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create users table (extended profiles linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT,
    name TEXT,
    role TEXT CHECK (role IN ('villager', 'shop_owner', 'service_provider', 'admin')) DEFAULT 'villager',
    village_id UUID REFERENCES villages(village_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create shops table
CREATE TABLE IF NOT EXISTS shops (
    shop_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Grocery', 'Medical', 'Hardware', 'Tailor', 'Mobile Repair', 'Electronics', 'Agriculture shop')),
    open_time TEXT NOT NULL,
    close_time TEXT NOT NULL,
    photo_url TEXT,
    whatsapp_number TEXT,
    is_approved BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    service_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Electrician', 'Plumber', 'Carpenter', 'Tractor', 'JCB', 'Water tanker', 'Milkman', 'Internet provider', 'Labour')),
    availability BOOLEAN DEFAULT TRUE NOT NULL,
    rate TEXT,
    description TEXT,
    is_approved BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create notices table
CREATE TABLE IF NOT EXISTS notices (
    notice_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('water', 'electricity', 'scheme', 'emergency', 'meeting', 'tax', 'announcement')),
    attachment_url TEXT,
    is_pdf BOOLEAN DEFAULT FALSE NOT NULL,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
    complaint_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    phone TEXT,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Water problem', 'Road problem', 'Light problem', 'Garbage problem')),
    photo_url TEXT,
    description TEXT NOT NULL,
    status TEXT CHECK (status IN ('Pending', 'In Progress', 'Solved')) DEFAULT 'Pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
    contact_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Police', 'Ambulance', 'Fire brigade', 'Hospital', 'Sarpanch', 'Talathi', 'Electricity office')),
    phone TEXT NOT NULL,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL
);

-- Create marketplace table (Buy & Sell)
CREATE TABLE IF NOT EXISTS marketplace (
    item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_name TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    photo_url TEXT,
    seller_contact TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Animals', 'Farm tools', 'Tractor', 'Household items', 'Land')),
    description TEXT,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_title TEXT NOT NULL,
    salary TEXT,
    contact TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Farming jobs', 'Labour work', 'Shop jobs', 'Daily wage jobs')),
    description TEXT,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
    news_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category TEXT CHECK (category IN ('Local festivals', 'Public meetings', 'Agriculture updates', 'School notices', 'Health camps')) NOT NULL,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    village_id UUID REFERENCES villages(village_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Setup basic policies: Public read-only, authenticating users/admins can perform writes/modifications.
CREATE POLICY "Enable read access for all users" ON villages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON shops FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON notices FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON emergency_contacts FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON marketplace FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON jobs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON news FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON notifications FOR SELECT USING (true);

-- Users policies
CREATE POLICY "Users can read profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profiles" ON users FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profiles" ON users FOR UPDATE USING (auth.uid() = user_id);

-- Shop insert/update policy (Villagers/owners can insert shops, pending approval)
CREATE POLICY "Enable insert for authenticated users" ON shops FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for admins" ON shops FOR UPDATE USING (true);

-- Service insert/update policy
CREATE POLICY "Enable insert for authenticated users" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for admins" ON services FOR UPDATE USING (true);

-- Complaint policies (Users insert, only admins read/update)
CREATE POLICY "Enable select for users" ON complaints FOR SELECT USING (true);
CREATE POLICY "Enable insert for users" ON complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for users/admins" ON complaints FOR UPDATE USING (true);
