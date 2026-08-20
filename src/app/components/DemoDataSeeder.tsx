import { useState } from 'react';
import { Database, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function DemoDataSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);

  const seedDemoData = async () => {
    setIsSeeding(true);
    toast.info('Seeding comprehensive demo data... This may take a moment.');

    try {
      // Create comprehensive demo members across different states and cities
      const demoMembers = [
        {
          email: 'al-hidaya@example.com',
          password: 'password123',
          companyName: 'Al-Hidaya Hajj & Umrah Services',
          rcNumber: 'RC-123456',
          nahconLicense: 'NHL-2024-001',
          yearsInOperation: '10-15',
          officeAddress: '123 Ibrahim Taiwo Road, Ikoyi',
          officeCity: 'Lagos',
          officeState: 'Lagos',
          servicesOffered: ['Hajj', 'Umrah', 'Both'],
          principalOfficerName: 'Alhaji Ibrahim Mohammed',
          principalOfficerPhone: '08012345678',
          principalOfficerPosition: 'CEO',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'First Bank',
          accountNumber: '1234567890',
          accountName: 'Al-Hidaya Hajj Services',
        },
        {
          email: 'madinah-travels@example.com',
          password: 'password123',
          companyName: 'Madinah Travels & Tours Ltd',
          rcNumber: 'RC-234567',
          nahconLicense: 'NHL-2024-002',
          yearsInOperation: '5-10',
          officeAddress: '45 Ahmadu Bello Way',
          officeCity: 'Kano',
          officeState: 'Kano',
          servicesOffered: ['Both'],
          principalOfficerName: 'Hajiya Aisha Abdullahi',
          principalOfficerPhone: '08023456789',
          principalOfficerPosition: 'Managing Director',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'GTBank',
          accountNumber: '2345678901',
          accountName: 'Madinah Travels Ltd',
        },
        {
          email: 'barakah-tours@example.com',
          password: 'password123',
          companyName: 'Barakah Tours & Pilgrimage Services',
          rcNumber: 'RC-345678',
          nahconLicense: 'NHL-2024-003',
          yearsInOperation: '5-10',
          officeAddress: '78 Constitution Avenue, Central Area',
          officeCity: 'Abuja',
          officeState: 'FCT',
          servicesOffered: ['Hajj', 'Umrah'],
          principalOfficerName: 'Alhaji Usman Bello',
          principalOfficerPhone: '08034567890',
          principalOfficerPosition: 'Director',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'Zenith Bank',
          accountNumber: '3456789012',
          accountName: 'Barakah Tours',
        },
        {
          email: 'al-iman@example.com',
          password: 'password123',
          companyName: 'Al-Iman Pilgrimage Agency',
          rcNumber: 'RC-456789',
          nahconLicense: 'NHL-2024-004',
          yearsInOperation: '15+',
          officeAddress: '234 New Market Road',
          officeCity: 'Onitsha',
          officeState: 'Anambra',
          servicesOffered: ['Both'],
          principalOfficerName: 'Alhaji Abdul-Malik Okafor',
          principalOfficerPhone: '08045678901',
          principalOfficerPosition: 'CEO',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'UBA',
          accountNumber: '4567890123',
          accountName: 'Al-Iman Pilgrimage',
        },
        {
          email: 'khadijah-travels@example.com',
          password: 'password123',
          companyName: 'Khadijah Travels International',
          rcNumber: 'RC-567890',
          nahconLicense: 'NHL-2024-005',
          yearsInOperation: '10-15',
          officeAddress: '12 Bompai Road',
          officeCity: 'Kano',
          officeState: 'Kano',
          servicesOffered: ['Umrah'],
          principalOfficerName: 'Hajiya Khadijah Aliyu',
          principalOfficerPhone: '08056789012',
          principalOfficerPosition: 'Managing Director',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'Access Bank',
          accountNumber: '5678901234',
          accountName: 'Khadijah Travels',
        },
        {
          email: 'nasrul-lahi@example.com',
          password: 'password123',
          companyName: 'Nasrul-Lahi Hajj Services',
          rcNumber: 'RC-678901',
          nahconLicense: 'NHL-2024-006',
          yearsInOperation: '5-10',
          officeAddress: '89 Ilorin Road',
          officeCity: 'Ilorin',
          officeState: 'Kwara',
          servicesOffered: ['Hajj'],
          principalOfficerName: 'Sheikh Muhammad Salihu',
          principalOfficerPhone: '08067890123',
          principalOfficerPosition: 'Director',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'Ecobank',
          accountNumber: '6789012345',
          accountName: 'Nasrul-Lahi Hajj',
        },
        {
          email: 'al-furqan@example.com',
          password: 'password123',
          companyName: 'Al-Furqan Tours & Travel',
          rcNumber: 'RC-789012',
          nahconLicense: 'NHL-2024-007',
          yearsInOperation: '10-15',
          officeAddress: '45 Sapele Road',
          officeCity: 'Benin City',
          officeState: 'Edo',
          servicesOffered: ['Both'],
          principalOfficerName: 'Alhaji Yusuf Omoregbe',
          principalOfficerPhone: '08078901234',
          principalOfficerPosition: 'CEO',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'Stanbic IBTC',
          accountNumber: '7890123456',
          accountName: 'Al-Furqan Tours',
        },
        {
          email: 'al-baraka@example.com',
          password: 'password123',
          companyName: 'Al-Baraka Pilgrimage Limited',
          rcNumber: 'RC-890123',
          nahconLicense: 'NHL-2024-008',
          yearsInOperation: '5-10',
          officeAddress: '67 Aba Road',
          officeCity: 'Port Harcourt',
          officeState: 'Rivers',
          servicesOffered: ['Hajj', 'Umrah'],
          principalOfficerName: 'Alhaji Musa Pepple',
          principalOfficerPhone: '08089012345',
          principalOfficerPosition: 'Managing Director',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'FCMB',
          accountNumber: '8901234567',
          accountName: 'Al-Baraka Pilgrimage',
        },
        {
          email: 'rahma-tours@example.com',
          password: 'password123',
          companyName: 'Rahma Tours & Pilgrimage',
          rcNumber: 'RC-901234',
          nahconLicense: 'NHL-2024-009',
          yearsInOperation: '15+',
          officeAddress: '123 Challawa Industrial Area',
          officeCity: 'Kano',
          officeState: 'Kano',
          servicesOffered: ['Both'],
          principalOfficerName: 'Hajiya Hafsat Dankano',
          principalOfficerPhone: '08090123456',
          principalOfficerPosition: 'CEO',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'Union Bank',
          accountNumber: '9012345678',
          accountName: 'Rahma Tours',
        },
        {
          email: 'al-mu-min@example.com',
          password: 'password123',
          companyName: 'Al-Mu\'min Travel & Tours',
          rcNumber: 'RC-012345',
          nahconLicense: 'NHL-2024-010',
          yearsInOperation: '5-10',
          officeAddress: '56 Maiduguri Road',
          officeCity: 'Kaduna',
          officeState: 'Kaduna',
          servicesOffered: ['Umrah'],
          principalOfficerName: 'Alhaji Nasiru Kaduna',
          principalOfficerPhone: '08001234567',
          principalOfficerPosition: 'Director',
          referee1Name: 'Demo Referee 1',
          referee1MembershipNo: 'AHUON-2025-00001',
          referee2Name: 'Demo Referee 2',
          referee2MembershipNo: 'AHUON-2025-00002',
          bankName: 'Sterling Bank',
          accountNumber: '0123456789',
          accountName: 'Al-Mu\'min Travel',
        },
      ];

      let successCount = 0;
      for (const member of demoMembers) {
        try {
          await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6dc3601f/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(member),
          });
          successCount++;
        } catch (err) {
          console.error(`Failed to seed member: ${member.companyName}`, err);
        }
      }

      toast.success(`Successfully seeded ${successCount} demo members! You can now test the application.`);
    } catch (error) {
      console.error('Error seeding demo data:', error);
      toast.error('Failed to seed demo data');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={seedDemoData}
        disabled={isSeeding}
        className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Seed demo data to populate the database with sample members"
      >
        {isSeeding ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" aria-hidden="true"></div>
            <span>Seeding...</span>
          </>
        ) : (
          <>
            <Database size={20} aria-hidden="true" />
            <span>Seed Demo Data</span>
          </>
        )}
      </button>
    </div>
  );
}
