import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Globe, Palette } from 'lucide-react';

const Settings: React.FC = () => {
  const settingsCategories = [
    {
      title: 'General',
      icon: SettingsIcon,
      settings: [
        { name: 'Site Name', value: 'EcoDelivery Admin', type: 'text' },
        { name: 'Time Zone', value: 'UTC-5 (Eastern)', type: 'select' },
        { name: 'Language', value: 'English', type: 'select' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { name: 'Email Notifications', value: true, type: 'toggle' },
        { name: 'SMS Alerts', value: false, type: 'toggle' },
        { name: 'Push Notifications', value: true, type: 'toggle' },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        { name: 'Two-Factor Authentication', value: true, type: 'toggle' },
        { name: 'Login Alerts', value: true, type: 'toggle' },
        { name: 'Session Timeout', value: '30 minutes', type: 'select' },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        { name: 'Dark Mode', value: false, type: 'toggle' },
        { name: 'Compact View', value: false, type: 'toggle' },
        { name: 'Sidebar Collapsed', value: false, type: 'toggle' },
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your application preferences and configuration</p>
      </div>

      <div className="space-y-6">
        {settingsCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Icon className="h-5 w-5 text-gray-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.settings.map((setting) => (
                  <div key={setting.name} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">{setting.name}</p>
                    </div>
                    <div>
                      {setting.type === 'toggle' ? (
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            setting.value ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              setting.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      ) : setting.type === 'select' ? (
                        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>{setting.value}</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={setting.value}
                          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          readOnly
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
          Reset to Defaults
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;