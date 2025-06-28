import React, { useState, useEffect } from 'react';
import { 
  Bell, Search, Settings, Mail, MessageSquare, Newspaper, Clock, ExternalLink, User, ChevronRight,
  Calendar, CheckSquare, Cloud, Sun, Moon, CloudRain, Wind, Eye, Thermometer,
  Activity, Heart, Footprints, Timer, Target, TrendingUp, Plus, Check, X
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
  url: string;
}

interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isUnread: boolean;
}

interface WhatsAppMessage {
  id: string;
  contact: string;
  message: string;
  time: string;
  isUnread: boolean;
  avatar: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'meeting' | 'personal' | 'work' | 'health';
  location?: string;
}

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueTime?: string;
  category: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  airQuality: number;
  forecast: {
    time: string;
    temp: number;
    condition: string;
  }[];
}

interface FitnessData {
  steps: number;
  stepGoal: number;
  activeMinutes: number;
  activeGoal: number;
  heartRate: number;
  sleepHours: number;
  sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
  calories: number;
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [unreadEmails, setUnreadEmails] = useState(3);
  const [unreadWhatsApp, setUnreadWhatsApp] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const [newsItems] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Revolutionary AI Breakthrough Transforms Healthcare Industry',
      source: 'TechCrunch',
      time: '2 minutes ago',
      category: 'Technology',
      url: '#'
    },
    {
      id: '2',
      title: 'Global Climate Summit Reaches Historic Agreement',
      source: 'Reuters',
      time: '15 minutes ago',
      category: 'Environment',
      url: '#'
    },
    {
      id: '3',
      title: 'Stock Markets Hit Record Highs Amid Economic Recovery',
      source: 'Financial Times',
      time: '32 minutes ago',
      category: 'Finance',
      url: '#'
    }
  ]);

  const [emails] = useState<EmailItem[]>([
    {
      id: '1',
      sender: 'Sarah Chen',
      subject: 'Project Update - Q1 Results',
      preview: 'Hi there! I wanted to share the latest updates on our Q1 project results...',
      time: '5 minutes ago',
      isUnread: true
    },
    {
      id: '2',
      sender: 'LinkedIn',
      subject: 'Your weekly job matches',
      preview: 'We found 12 new job opportunities that match your profile...',
      time: '1 hour ago',
      isUnread: true
    },
    {
      id: '3',
      sender: 'Michael Rodriguez',
      subject: 'Meeting reschedule request',
      preview: 'Would it be possible to move our meeting from 3 PM to 4 PM tomorrow?',
      time: '2 hours ago',
      isUnread: false
    }
  ]);

  const [whatsappMessages] = useState<WhatsAppMessage[]>([
    {
      id: '1',
      contact: 'Mom 💕',
      message: 'Don\'t forget dinner at 7 PM tonight!',
      time: '2 minutes ago',
      isUnread: true,
      avatar: '👩‍🦳'
    },
    {
      id: '2',
      contact: 'Team Group',
      message: 'Alex: Great job on the presentation today 👏',
      time: '15 minutes ago',
      isUnread: true,
      avatar: '👥'
    },
    {
      id: '3',
      contact: 'John Parker',
      message: 'Are we still on for lunch tomorrow?',
      time: '1 hour ago',
      isUnread: false,
      avatar: '👨‍💼'
    }
  ]);

  const [calendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Standup',
      time: '9:00 AM',
      duration: '30 min',
      type: 'work',
      location: 'Conference Room A'
    },
    {
      id: '2',
      title: 'Client Presentation',
      time: '2:00 PM',
      duration: '1 hour',
      type: 'meeting',
      location: 'Zoom'
    },
    {
      id: '3',
      title: 'Gym Session',
      time: '6:00 PM',
      duration: '1 hour',
      type: 'health',
      location: 'FitLife Gym'
    },
    {
      id: '4',
      title: 'Dinner with Sarah',
      time: '7:30 PM',
      duration: '2 hours',
      type: 'personal',
      location: 'Italian Bistro'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review quarterly reports',
      priority: 'high',
      completed: false,
      dueTime: '11:00 AM',
      category: 'Work'
    },
    {
      id: '2',
      title: 'Call dentist for appointment',
      priority: 'medium',
      completed: false,
      dueTime: '2:00 PM',
      category: 'Personal'
    },
    {
      id: '3',
      title: 'Update project documentation',
      priority: 'high',
      completed: true,
      category: 'Work'
    },
    {
      id: '4',
      title: 'Buy groceries',
      priority: 'low',
      completed: false,
      category: 'Personal'
    },
    {
      id: '5',
      title: 'Prepare presentation slides',
      priority: 'high',
      completed: false,
      dueTime: '1:00 PM',
      category: 'Work'
    }
  ]);

  const [weatherData] = useState<WeatherData>({
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6,
    airQuality: 42,
    forecast: [
      { time: '12 PM', temp: 26, condition: 'sunny' },
      { time: '3 PM', temp: 28, condition: 'sunny' },
      { time: '6 PM', temp: 25, condition: 'cloudy' },
      { time: '9 PM', temp: 22, condition: 'cloudy' }
    ]
  });

  const [fitnessData] = useState<FitnessData>({
    steps: 8420,
    stepGoal: 10000,
    activeMinutes: 45,
    activeGoal: 60,
    heartRate: 72,
    sleepHours: 7.5,
    sleepQuality: 'good',
    calories: 2150
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setUnreadEmails(prev => prev + Math.floor(Math.random() * 2));
      }
      if (Math.random() > 0.8) {
        setUnreadWhatsApp(prev => prev + Math.floor(Math.random() * 3));
      }
    }, 10000);

    return () => clearInterval(updateInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'meeting': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'personal': return 'bg-green-100 text-green-700 border-green-200';
      case 'health': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getAirQualityLevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-600 bg-green-100' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600 bg-orange-100' };
    return { level: 'Unhealthy', color: 'text-red-600 bg-red-100' };
  };

  const getSleepQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Personal Dashboard</h1>
                <p className="text-sm text-gray-500">{formatDate(currentTime)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search across all services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{formatTime(currentTime)}</div>
                </div>
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {(unreadEmails + unreadWhatsApp) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {unreadEmails + unreadWhatsApp}
                  </span>
                )}
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column - News */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Newspaper className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Google News</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live</span>
                  </div>
                </div>
                <p className="text-red-100 mt-2">Latest breaking news and trending stories</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {newsItems.map((item) => (
                    <div 
                      key={item.id}
                      className="group p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-100 hover:border-gray-200 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              {item.category}
                            </span>
                            <span className="text-sm text-gray-500">{item.source}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{item.time}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 ml-4 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <span>View All News</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Multiple Widgets */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Weather Widget */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-5 h-5" />
                    <h2 className="text-lg font-bold">Weather</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                    <div className="text-sm opacity-90">{weatherData.condition}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Wind: {weatherData.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Humidity: {weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">UV Index: {weatherData.uvIndex}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAirQualityLevel(weatherData.airQuality).color}`}>
                      AQI: {weatherData.airQuality}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  {weatherData.forecast.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{item.time}</div>
                      {getWeatherIcon(item.condition)}
                      <div className="text-sm font-medium mt-1">{item.temp}°</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fitness Widget */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Fitness Tracker</h2>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Footprints className="w-5 h-5 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">
                        {Math.round((fitnessData.steps / fitnessData.stepGoal) * 100)}%
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{fitnessData.steps.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">of {fitnessData.stepGoal.toLocaleString()} steps</div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((fitnessData.steps / fitnessData.stepGoal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Timer className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        {Math.round((fitnessData.activeMinutes / fitnessData.activeGoal) * 100)}%
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{fitnessData.activeMinutes}</div>
                    <div className="text-xs text-gray-600">of {fitnessData.activeGoal} active min</div>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((fitnessData.activeMinutes / fitnessData.activeGoal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      <span className="text-xs text-red-600 font-medium">Heart Rate</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{fitnessData.heartRate} BPM</div>
                    <div className="text-xs text-gray-600">Resting</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Moon className="w-5 h-5 text-purple-600" />
                      <span className="text-xs text-purple-600 font-medium">Sleep</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{fitnessData.sleepHours}h</div>
                    <div className={`text-xs font-medium ${getSleepQualityColor(fitnessData.sleepQuality)}`}>
                      {fitnessData.sleepQuality}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gmail and WhatsApp Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Gmail */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <h2 className="text-lg font-bold">Gmail</h2>
                    </div>
                    {unreadEmails > 0 && (
                      <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {unreadEmails}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    {emails.slice(0, 3).map((email) => (
                      <div 
                        key={email.id}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                          email.isUnread 
                            ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium text-sm ${email.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                                {email.sender}
                              </span>
                              {email.isUnread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className={`text-sm mt-1 truncate ${email.isUnread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                              {email.subject}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 ml-2">
                            {email.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5" />
                      <h2 className="text-lg font-bold">WhatsApp</h2>
                    </div>
                    {unreadWhatsApp > 0 && (
                      <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {unreadWhatsApp}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    {whatsappMessages.slice(0, 3).map((message) => (
                      <div 
                        key={message.id}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                          message.isUnread 
                            ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-lg">{message.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`font-medium text-sm ${message.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                                {message.contact}
                              </span>
                              <span className="text-xs text-gray-400">
                                {message.time}
                              </span>
                            </div>
                            <p className={`text-sm mt-1 truncate ${message.isUnread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                              {message.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar and Tasks Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Calendar */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <h2 className="text-lg font-bold">Today's Schedule</h2>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    {calendarEvents.map((event) => (
                      <div 
                        key={event.id}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${getEventTypeColor(event.type)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{event.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs">{event.time}</span>
                              <span className="text-xs">•</span>
                              <span className="text-xs">{event.duration}</span>
                            </div>
                            {event.location && (
                              <p className="text-xs mt-1 opacity-75">{event.location}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckSquare className="w-5 h-5" />
                      <h2 className="text-lg font-bold">Tasks</h2>
                    </div>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                      {tasks.filter(t => !t.completed).length} pending
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    {tasks.slice(0, 4).map((task) => (
                      <div 
                        key={task.id}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                          task.completed ? 'bg-gray-50 border-gray-200 opacity-75' : 'bg-white border-gray-200'
                        }`}
                        onClick={() => toggleTask(task.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <button className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            task.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300 hover:border-green-500'
                          }`}>
                            {task.completed && <Check className="w-3 h-3" />}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {task.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">{task.category}</span>
                              {task.dueTime && (
                                <>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">Due: {task.dueTime}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;