import { AlertCircle, Database, Server, CheckCircle } from 'lucide-react';

export function SetupGuide() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#004d00]">Welcome to AHUON</h1>
              <p className="text-[#666666]">Let's get started with your platform</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-[#008000] pl-4 py-2">
              <h2 className="font-bold text-lg mb-2 flex items-center">
                <Database className="mr-2" size={20} />
                Step 1: Seed Demo Data
              </h2>
              <p className="text-[#666666] mb-3">
                Click the purple "Seed Demo Data" button in the bottom-right corner to populate the database with 10 sample operators.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm">
                <p className="text-purple-800">
                  👉 Look for the purple button with a database icon in the bottom-right of your screen.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-gray-300 pl-4 py-2">
              <h2 className="font-bold text-lg mb-2 flex items-center">
                <Server className="mr-2" size={20} />
                Step 2: Server Setup (Optional)
              </h2>
              <p className="text-[#666666] mb-3">
                The backend server should be automatically deployed. If you're seeing this message, the server might still be initializing.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                <p className="text-yellow-800">
                  ⏳ Server functions typically take 30-60 seconds to deploy in Figma Make.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-gray-300 pl-4 py-2">
              <h2 className="font-bold text-lg mb-2 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                What You'll Get
              </h2>
              <ul className="text-[#666666] space-y-2">
                <li className="flex items-start">
                  <span className="text-[#008000] mr-2">✓</span>
                  <span>10 demo operators across different Nigerian states</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#008000] mr-2">✓</span>
                  <span>Full member directory with search and filters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#008000] mr-2">✓</span>
                  <span>Working registration and login system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#008000] mr-2">✓</span>
                  <span>Complaint filing and tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#008000] mr-2">✓</span>
                  <span>EXCO dashboard for management</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-green-900 mb-2">Quick Test</h3>
              <p className="text-green-800 text-sm mb-3">
                After seeding data, try logging in with:
              </p>
              <div className="bg-white rounded p-3 font-mono text-sm">
                <div><span className="text-gray-600">Email:</span> al-hidaya@example.com</div>
                <div><span className="text-gray-600">Password:</span> password123</div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-[#666666] text-center">
                For full documentation, see <code className="bg-gray-100 px-2 py-1 rounded">AHUON_README.md</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
