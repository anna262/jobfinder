import React, { useState, useEffect } from 'react';
import { Search, User, FileText, Send, BarChart, Settings, Play, Pause, Check, X, AlertCircle } from 'lucide-react';

const JobApplicationAgent = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    skills: [],
    experience: [],
    education: [],
    preferences: {
      salaryMin: '',
      remoteOk: false,
      locations: []
    }
  });
  
  const [searchParams, setSearchParams] = useState({
    keywords: '',
    location: '',
    maxApplications: 10,
    autoSubmit: false
  });
  
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    applied: 0,
    pending: 0,
    successRate: 0
  });

  // Mock job data for demo
  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      description: "Build amazing user interfaces with React and TypeScript",
      requirements: "3+ years React, TypeScript, CSS",
      matchScore: 92,
      priority: "high",
      url: "https://example.com/job1"
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      description: "Work on both frontend and backend systems",
      requirements: "Node.js, React, MongoDB, AWS",
      matchScore: 85,
      priority: "medium",
      url: "https://example.com/job2"
    },
    {
      id: 3,
      title: "Python Developer",
      company: "DataFlow Inc",
      location: "New York, NY",
      description: "Build data processing pipelines and APIs",
      requirements: "Python, Django, PostgreSQL, Docker",
      matchScore: 78,
      priority: "medium",
      url: "https://example.com/job3"
    }
  ];

  const handleSkillAdd = (skill) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const runJobSearch = async () => {
    setIsRunning(true);
    
    // Simulate job search process
    setTimeout(() => {
      setJobs(mockJobs);
      setStats(prev => ({
        ...prev,
        totalJobs: mockJobs.length
      }));
    }, 2000);

    // Simulate application process
    setTimeout(() => {
      const newApplications = mockJobs.slice(0, searchParams.maxApplications).map(job => ({
        ...job,
        status: Math.random() > 0.2 ? 'success' : 'pending',
        appliedAt: new Date().toISOString(),
        coverLetter: generateCoverLetter(job),
        resumeCustomization: generateResumeCustomization(job)
      }));
      
      setApplications(newApplications);
      setStats({
        totalJobs: mockJobs.length,
        applied: newApplications.filter(app => app.status === 'success').length,
        pending: newApplications.filter(app => app.status === 'pending').length,
        successRate: (newApplications.filter(app => app.status === 'success').length / newApplications.length) * 100
      });
      setIsRunning(false);
    }, 5000);
  };

  const generateCoverLetter = (job) => {
    return `Dear Hiring Manager,

I am excited to apply for the ${job.title} position at ${job.company}. With my background in ${profile.skills.slice(0, 3).join(', ')}, I am confident I can contribute significantly to your team.

My experience includes:
${profile.experience.slice(0, 2).map(exp => `• ${exp.title} at ${exp.company}: ${exp.description}`).join('\n')}

I am particularly drawn to ${job.company} because of your innovative approach to technology and commitment to excellence. The opportunity to work on ${job.description.toLowerCase()} aligns perfectly with my career goals and technical expertise.

Thank you for considering my application. I look forward to discussing how I can contribute to your team's success.

Best regards,
${profile.name}`;
  };

  const generateResumeCustomization = (job) => {
    return `Customization suggestions for ${job.title} at ${job.company}:

• Emphasize skills: ${job.requirements.split(',').slice(0, 3).join(', ')}
• Highlight relevant experience from your background
• Include keywords: ${job.requirements.toLowerCase()}
• Focus on achievements that demonstrate problem-solving and technical expertise`;
  };

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <User className="mr-2" size={20} />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="url"
            placeholder="LinkedIn Profile"
            value={profile.linkedin}
            onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              {skill}
              <button
                onClick={() => handleSkillRemove(skill)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a skill..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSkillAdd(e.target.value);
                e.target.value = '';
              }
            }}
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={(e) => {
              const input = e.target.parentElement.querySelector('input');
              handleSkillAdd(input.value);
              input.value = '';
            }}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Experience</h3>
        {profile.experience.map((exp, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Duration (e.g., 2020-2023)"
              value={exp.duration}
              onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <textarea
              placeholder="Job Description"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>
        ))}
        <button
          onClick={handleAddExperience}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add Experience
        </button>
      </div>
    </div>
  );

  const SearchTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Search className="mr-2" size={20} />
          Job Search Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Job Keywords (e.g., Python Developer)"
            value={searchParams.keywords}
            onChange={(e) => setSearchParams(prev => ({ ...prev, keywords: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Location (e.g., San Francisco)"
            value={searchParams.location}
            onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Max Applications"
            value={searchParams.maxApplications}
            onChange={(e) => setSearchParams(prev => ({ ...prev, maxApplications: parseInt(e.target.value) }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoSubmit"
              checked={searchParams.autoSubmit}
              onChange={(e) => setSearchParams(prev => ({ ...prev, autoSubmit: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="autoSubmit" className="text-sm text-gray-700">
              Auto-submit applications
            </label>
          </div>
        </div>
        
        <button
          onClick={runJobSearch}
          disabled={isRunning || !profile.name || !searchParams.keywords}
          className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors ${
            isRunning || !profile.name || !searchParams.keywords
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="mr-2" size={20} />
              Searching & Applying...
            </>
          ) : (
            <>
              <Play className="mr-2" size={20} />
              Start Job Application Process
            </>
          )}
        </button>
      </div>

      {jobs.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Found Jobs</h3>
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{job.title}</h4>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                      job.matchScore >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {job.matchScore}% Match
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{job.description}</p>
                <p className="text-sm text-gray-500">Requirements: {job.requirements}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const ApplicationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="mr-2" size={20} />
          Applications
        </h3>
        
        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>No applications yet. Run a job search to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{app.title}</h4>
                    <p className="text-gray-600">{app.company} • {app.location}</p>
                    <p className="text-sm text-gray-500">Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center">
                    {app.status === 'success' ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <Check size={14} className="mr-1" />
                        Submitted
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h5 className="font-medium mb-2">Generated Cover Letter:</h5>
                  <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{app.coverLetter}</pre>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h5 className="font-medium mb-2">Resume Customization:</h5>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <pre className="whitespace-pre-wrap">{app.resumeCustomization}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const StatsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart className="mr-2" size={20} />
          Application Statistics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalJobs}</div>
            <div className="text-sm text-blue-800">Jobs Found</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.applied}</div>
            <div className="text-sm text-green-800">Applications Sent</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-yellow-800">Pending Review</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.successRate.toFixed(1)}%</div>
            <div className="text-sm text-purple-800">Success Rate</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {applications.slice(0, 5).map(app => (
            <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{app.title} at {app.company}</p>
                <p className="text-sm text-gray-500">{new Date(app.appliedAt).toLocaleString()}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                app.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {app.status === 'success' ? 'Submitted' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-lg mr-3">
                <Search className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Job Application Agent</h1>
                <p className="text-gray-600">Automate your job search and applications</p>
              </div>
            </div>
            
            {isRunning && (
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Processing...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'search', label: 'Job Search', icon: Search },
              { id: 'applications', label: 'Applications', icon: FileText },
              { id: 'stats', label: 'Statistics', icon: BarChart }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'stats' && <StatsTab />}
      </div>
    </div>
  );
};
