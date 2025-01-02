import React, { useState } from 'react';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [companyType, setCompanyType] = useState('');
  const [employeeCount, setEmployeeCount] = useState<number | null>(null);
  const [software, setSoftware] = useState<{ [key: string]: string[] }>({});
  const [issues, setIssues] = useState<{ [key: string]: string[] }>({});
  const [requirements, setRequirements] = useState<string[]>([]);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const softwareCategories = ['Boekhouding', 'CRM', 'HR', 'Project Management'];
  const issuesCategories = ['Algemeen', 'Klant & Sales', 'Financieel', 'HR'];
  const modulesCategories = ['Boekhouding', 'CRM', 'HR', 'Project Management'];

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSoftwareChange = (category: string, value: string, index: number) => {
    const newSoftware = { ...software };
    if (!newSoftware[category]) newSoftware[category] = [];
    newSoftware[category][index] = value;
    setSoftware(newSoftware);
  };

  const handleAddSoftware = (category: string) => {
    const newSoftware = { ...software };
    if (!newSoftware[category]) newSoftware[category] = [];
    newSoftware[category].push('');
    setSoftware(newSoftware);
  };

  const handleIssueToggle = (category: string, issue: string) => {
    const newIssues = { ...issues };
    if (!newIssues[category]) newIssues[category] = [];
    if (newIssues[category].includes(issue)) {
      newIssues[category] = newIssues[category].filter((i) => i !== issue);
    } else {
      newIssues[category].push(issue);
    }
    setIssues(newIssues);
  };

  const handleRequirementToggle = (module: string) => {
    if (requirements.includes(module)) {
      setRequirements(requirements.filter((m) => m !== module));
    } else {
      setRequirements([...requirements, module]);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Odoo Adviseur</h1>
            <p className="text-gray-600 mb-8">Welkom! Laten we beginnen met wat basisinformatie over uw bedrijf.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type bedrijf</label>
                <input
                  type="text"
                  placeholder="Bijv. Retail, IT, etc."
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Aantal medewerkers</label>
                <input
                  type="number"
                  value={employeeCount || ''}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Software Infrastructuur</label>
                {softwareCategories.map((category) => (
                  <div key={category} className="mt-4">
                    <h3 className="text-lg font-semibold">{category}</h3>
                    {(software[category] || []).map((value, index) => (
                      <div key={index} className="mt-2">
                        <select
                          value={value}
                          onChange={(e) => handleSoftwareChange(category, e.target.value, index)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Selecteer software</option>
                          <option value="Anders">Anders</option>
                        </select>
                        {value === 'Anders' && (
                          <input
                            type="text"
                            placeholder="Specificeer software"
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddSoftware(category)}
                      className="mt-2 flex items-center justify-center w-8 h-8 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
              >
                Volgende
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Selecteer uw knelpunten</h1>
            <div className="space-y-6">
              {issuesCategories.map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <div className="mt-2 space-y-2">
                    {['Knelpunt 1', 'Knelpunt 2', 'Knelpunt 3'].map((issue) => (
                      <label key={issue} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={issues[category]?.includes(issue) || false}
                          onChange={() => handleIssueToggle(category, issue)}
                          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span>{issue}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Terug
                </button>
                <button
                  onClick={handleNext}
                  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Volgende
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Selecteer de gewenste modules</h1>
            <div className="space-y-6">
              {modulesCategories.map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <div className="mt-2 space-y-2">
                    {['Module 1', 'Module 2', 'Module 3'].map((module) => (
                      <label key={module} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={requirements.includes(module)}
                          onChange={() => handleRequirementToggle(module)}
                          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span>{module}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Terug
                </button>
                <button
                  onClick={handleNext}
                  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Volgende
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Aanbevolen modules</h1>
            {requirements.length > 0 ? (
              <div className="space-y-4">
                {requirements.map((module) => (
                  <div key={module} className="p-4 bg-gray-50 rounded-md">
                    {module}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Geen modules aanbevolen. Controleer je selecties.</p>
            )}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Contactgegevens</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Naam"
                  value={contact.name}
                  onChange={handleContactChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={handleContactChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Telefoonnummer"
                  value={contact.phone}
                  onChange={handleContactChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Bedrijfsnaam"
                  value={contact.companyName}
                  onChange={handleContactChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Terug
              </button>
              <button
                onClick={handleNext}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
              >
                Volgende
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Aanvraag succesvol verzonden!</h1>
            <p className="text-gray-600">Bedankt voor uw aanvraag. Wij nemen spoedig contact met u op.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min- bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Odoo Adviseur</h1>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    step === s ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default App;