import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'

// Types
interface Submission {
  id: number
  businessName: string
  name: string
  email: string
  phone: string
  package: string
  packageOther?: string
  status: 'new' | 'contacted' | 'scheduled' | 'in-progress' | 'completed' | 'rejected'
  submittedAt: string
  businessDescription?: string
  hasExistingWebsite?: string
  existingWebsiteUrl?: string
  notes?: string
  internalNotes?: string
  industry?: string
  goals?: string[]
  timeline?: string
  files?: Array<{ name: string }>
}

interface ChatMessage {
  id: number
  sessionId: string
  userName?: string
  userEmail?: string
  message: string
  sentAt: string
  responded: number
  response?: string
}

interface Stats {
  submissions: {
    total: number
    new: number
    recent: number
  }
  chat: {
    total: number
    unread: number
  }
}

import { getApiUrl } from '../utils/api.js'
const API_URL = getApiUrl()

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [, setChatMessages] = useState<ChatMessage[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeView, setActiveView] = useState<'dashboard' | 'submissions'>('dashboard')
  const [loading, setLoading] = useState(false)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setAuthToken(savedToken)
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchSubmissions()
      fetchChatMessages()
      fetchStats()
    }
  }, [isAuthenticated, authToken, filterStatus])

  const fetchSubmissions = async () => {
    if (!authToken) return
    
    try {
      setLoading(true)
      const url = filterStatus === 'all' 
        ? `${API_URL}/api/submissions`
        : `${API_URL}/api/submissions?status=${filterStatus}`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout()
          return
        }
        // Read as text first, then try to parse as JSON
        let errorMessage = 'Failed to fetch submissions'
        try {
          const errorText = await response.text()
          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use text as-is
            errorMessage = errorText || errorMessage
          }
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchChatMessages = async () => {
    if (!authToken) return
    
    try {
      const response = await fetch(`${API_URL}/api/chat/messages`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout()
          return
        }
        // Read as text first, then try to parse as JSON
        let errorMessage = 'Failed to fetch chat messages'
        try {
          const errorText = await response.text()
          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use text as-is
            errorMessage = errorText || errorMessage
          }
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setChatMessages(data)
    } catch (error) {
      console.error('Error fetching chat messages:', error)
    }
  }

  const fetchStats = async () => {
    if (!authToken) return
    
    try {
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout()
          return
        }
        // Read as text first, then try to parse as JSON
        let errorMessage = 'Failed to fetch stats'
        try {
          const errorText = await response.text()
          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use text as-is
            errorMessage = errorText || errorMessage
          }
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)
    
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        // Read as text first, then try to parse as JSON
        let errorMessage = 'Login failed'
        try {
          const errorText = await response.text()
          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use text as-is
            errorMessage = errorText || errorMessage
          }
        } catch {
          // Failed to read response
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setAuthToken(data.token)
      setIsAuthenticated(true)
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_username', data.username)
    } catch (error: any) {
      const errorMessage = error.message || 'Invalid username or password'
      setLoginError(errorMessage)
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAuthToken(null)
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_username')
    setSubmissions([])
    setChatMessages([])
    setStats(null)
    setSelectedSubmission(null)
    setActiveView('dashboard')
  }

  const updateSubmissionStatus = async (id: number, status: string, notes?: string, internalNotes?: string) => {
    if (!authToken) return
    
    try {
      const response = await fetch(`${API_URL}/api/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ status, notes, internalNotes }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout()
          return
        }
        // Read as text first, then try to parse as JSON
        let errorMessage = 'Failed to update submission'
        try {
          const errorText = await response.text()
          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use text as-is
            errorMessage = errorText || errorMessage
          }
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const updated = await response.json()
      setSubmissions(prev => prev.map(s => s.id === id ? updated : s))
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(updated)
      }
      fetchStats() // Refresh stats
    } catch (error: any) {
      console.error('Error updating submission:', error)
      const errorMessage = error.message || 'Failed to update submission. Please try again.'
      alert(errorMessage)
    }
  }

  const handleStatusChange = async (submissionId: number, newStatus: Submission['status']) => {
    await updateSubmissionStatus(submissionId, newStatus)
  }

  const filteredSubmissions = submissions.filter(sub => {
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus
    const matchesSearch = 
      sub.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Use API stats if available, otherwise calculate from submissions
  const displayStats = stats ? {
    new: stats.submissions.new,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    scheduled: submissions.filter(s => s.status === 'scheduled').length,
    inProgress: submissions.filter(s => s.status === 'in-progress').length,
    completed: submissions.filter(s => s.status === 'completed').length,
    total: stats.submissions.total,
    chatUnread: stats.chat.unread,
    chatTotal: stats.chat.total
  } : {
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    scheduled: submissions.filter(s => s.status === 'scheduled').length,
    inProgress: submissions.filter(s => s.status === 'in-progress').length,
    completed: submissions.filter(s => s.status === 'completed').length,
    total: submissions.length,
    chatUnread: 0,
    chatTotal: 0
  }

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">Sign in to manage submissions</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {loginError}
              </div>
            )}

            <Button type="submit" variant="cta" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

        </motion.div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveView('dashboard')
              setSelectedSubmission(null)
            }}
            className={`px-6 py-3 font-medium transition-colors ${
              activeView === 'dashboard'
                ? 'text-cta border-b-2 border-cta'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setActiveView('submissions')
              setSelectedSubmission(null)
            }}
            className={`px-6 py-3 font-medium transition-colors ${
              activeView === 'submissions'
                ? 'text-cta border-b-2 border-cta'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            Submissions ({submissions.length})
          </button>
        </div>

        {/* Dashboard Overview */}
        {activeView === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">New Submissions</p>
                    <p className="text-3xl font-bold text-primary">{displayStats.new}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Scheduled Calls</p>
                    <p className="text-3xl font-bold text-primary">{displayStats.scheduled}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">In Progress</p>
                    <p className="text-3xl font-bold text-primary">{displayStats.inProgress}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚙️</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Contacted</p>
                    <p className="text-3xl font-bold text-primary">{displayStats.contacted}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Completed</p>
                    <p className="text-3xl font-bold text-primary">{displayStats.completed}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Total</p>
                    <p className="text-3xl font-bold text-primary">{displayStats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-cta/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-primary">Recent Submissions</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {submissions.slice(0, 5).map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => {
                      setSelectedSubmission(submission)
                      setActiveView('submissions')
                    }}
                    className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary">{submission.businessName}</h3>
                        <p className="text-sm text-text-secondary mt-1">
                          {submission.name} • {submission.email}
                        </p>
                        <p className="text-xs text-text-secondary mt-1">
                          {new Date(submission.submittedAt).toLocaleDateString()} • {submission.package} Package
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'new'
                            ? 'bg-blue-100 text-blue-800'
                            : submission.status === 'contacted'
                            ? 'bg-purple-100 text-purple-800'
                            : submission.status === 'scheduled'
                            ? 'bg-green-100 text-green-800'
                            : submission.status === 'in-progress'
                            ? 'bg-orange-100 text-orange-800'
                            : submission.status === 'completed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {submission.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Submissions List */}
        {activeView === 'submissions' && !selectedSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by business name, contact name, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Business
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Package
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                          No submissions found
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((submission) => (
                        <tr
                          key={submission.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-semibold text-primary">{submission.businessName}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-primary">{submission.name}</div>
                            <div className="text-sm text-text-secondary">{submission.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 bg-cta/10 text-cta rounded-full text-xs font-medium">
                              {submission.package}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                submission.status === 'new'
                                  ? 'bg-blue-100 text-blue-800'
                                  : submission.status === 'contacted'
                                  ? 'bg-purple-100 text-purple-800'
                                  : submission.status === 'scheduled'
                                  ? 'bg-green-100 text-green-800'
                                  : submission.status === 'in-progress'
                                  ? 'bg-orange-100 text-orange-800'
                                  : submission.status === 'completed'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {submission.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedSubmission(submission)
                              }}
                              className="text-cta hover:text-cta/80 font-medium text-sm"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submission Detail View */}
        {activeView === 'submissions' && selectedSubmission && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
              >
                <span>←</span> Back to Submissions
              </button>
              <div>
                <select
                  value={selectedSubmission.status}
                  onChange={(e) => handleStatusChange(Number(selectedSubmission.id), e.target.value as Submission['status'])}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Business Name</label>
                        <p className="text-primary font-semibold mt-1">{selectedSubmission.businessName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Contact Name</label>
                        <p className="text-primary mt-1">{selectedSubmission.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Email</label>
                        <p className="text-primary mt-1">
                          <a href={`mailto:${selectedSubmission.email}`} className="text-cta hover:underline">
                            {selectedSubmission.email}
                          </a>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Phone</label>
                        <p className="text-primary mt-1">
                          <a href={`tel:${selectedSubmission.phone}`} className="text-cta hover:underline">
                            {selectedSubmission.phone}
                          </a>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Package</label>
                        <p className="mt-1">
                          <span className="px-3 py-1 bg-cta/10 text-cta rounded-full text-sm font-medium">
                            {selectedSubmission.package}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedSubmission.businessDescription && (
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Business Description</h3>
                      <p className="text-text-primary">{selectedSubmission.businessDescription}</p>
                    </div>
                  )}

                  {selectedSubmission.industry && (
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Industry</h3>
                      <p className="text-text-primary">{selectedSubmission.industry}</p>
                    </div>
                  )}

                  {selectedSubmission.goals && selectedSubmission.goals.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.goals.map((goal, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-primary rounded-full text-sm"
                          >
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubmission.timeline && (
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Timeline</h3>
                      <p className="text-text-primary">{selectedSubmission.timeline}</p>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Submission Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Submitted:</span>
                        <span className="text-primary">
                          {new Date(selectedSubmission.submittedAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Status:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedSubmission.status === 'new'
                              ? 'bg-blue-100 text-blue-800'
                              : selectedSubmission.status === 'contacted'
                              ? 'bg-purple-100 text-purple-800'
                              : selectedSubmission.status === 'scheduled'
                              ? 'bg-green-100 text-green-800'
                              : selectedSubmission.status === 'in-progress'
                              ? 'bg-orange-100 text-orange-800'
                              : selectedSubmission.status === 'completed'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {selectedSubmission.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedSubmission.files && selectedSubmission.files.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Uploaded Files</h3>
                      <div className="space-y-2">
                        {selectedSubmission.files.map((file: { name: string }, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <span className="text-sm text-primary">{file.name}</span>
                            <button className="text-cta hover:text-cta/80 text-sm font-medium">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Internal Notes</h3>
                    <textarea
                      value={selectedSubmission.internalNotes || ''}
                      onChange={(e) => {
                        const updated = { ...selectedSubmission, internalNotes: e.target.value }
                        setSelectedSubmission(updated)
                        setSubmissions(prev =>
                          prev.map(s => s.id === updated.id ? updated : s)
                        )
                      }}
                      placeholder="Add internal notes about this submission..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
