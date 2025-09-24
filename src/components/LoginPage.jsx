import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('police');
  const [credentials, setCredentials] = useState({
    employeeId: '',
    password: '',
    department: 'police'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Authentication handler - In real app, this would be handled by backend API
  const authenticateUser = (employeeId, password, department) => {
    // Simulate backend authentication
    // For demo purposes, accept any credentials with proper format
    if (!employeeId || !password) return null;
    
    // Basic format validation
    const isPoliceFormat = department === 'police' && (employeeId.startsWith('POL') || employeeId === 'ADMIN');
    const isTourismFormat = department === 'tourism' && (employeeId.startsWith('TOU') || employeeId === 'ADMIN');
    
    if (!isPoliceFormat && !isTourismFormat) return null;
    
    // Return mock user data
    return {
      name: `${department === 'police' ? 'Officer' : 'Tourism Executive'} ${employeeId}`,
      department: department,
      station: department === 'police' ? 'Smart Tourism Safety Unit' : 'Tourism Safety Division',
      role: employeeId === 'ADMIN' ? 'Administrator' : 'Officer'
    };
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    setCredentials({
      employeeId: '',
      password: '',
      department: department
    });
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
      department: selectedDepartment
    }));
    setError('');
  };

  const validateCredentials = () => {
    const { employeeId, password, department } = credentials;
    
    if (!employeeId.trim()) {
      return 'Employee ID is required';
    }
    
    if (!password.trim()) {
      return 'Password is required';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    // Check department-specific ID format
    if (department === 'police' && !employeeId.startsWith('POL') && employeeId !== 'ADMIN') {
      return 'Police Employee ID must start with "POL" (e.g., POL001) or use "ADMIN"';
    }
    
    if (department === 'tourism' && !employeeId.startsWith('TOU') && employeeId !== 'ADMIN') {
      return 'Tourism Employee ID must start with "TOU" (e.g., TOU001) or use "ADMIN"';
    }

    // Authenticate with backend (simulated)
    const userInfo = authenticateUser(employeeId, password, department);
    if (!userInfo) {
      return 'Invalid credentials. Please check your Employee ID and password.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate credentials
    const validationError = validateCredentials();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userInfo = authenticateUser(credentials.employeeId, credentials.password, selectedDepartment);
      setSuccess(`Welcome ${userInfo.name}! Redirecting to dashboard...`);
      
      // Store user session (in real app, use proper session management)
      localStorage.setItem('userSession', JSON.stringify({
        ...credentials,
        userInfo: userInfo,
        loginTime: new Date().toISOString()
      }));

      // Redirect to appropriate dashboard
      setTimeout(() => {
        if (selectedDepartment === 'police') {
          navigate('/police-dashboard');
        } else {
          navigate('/tourism-dashboard');
        }
      }, 1500);
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="login-page">
      <div className={`login-container ${selectedDepartment}-theme`}>
      {/* Logo and Title Section */}
      <div className="logo-section">
        <div className="logo">
          {selectedDepartment === 'police' ? '🚔' : '🏛️'}
        </div>
        <h1 className="app-title">Smart Tourism Safety</h1>
        <p className="app-subtitle">Blockchain-Powered Security System</p>
      </div>

      {/* Department Selection */}
      <div className="department-selector">
        <div className="department-buttons">
          <button
            type="button"
            className={`dept-btn ${selectedDepartment === 'police' ? 'active' : ''}`}
            onClick={() => handleDepartmentChange('police')}
          >
            <span>🚔 Police Department</span>
          </button>
          <button
            type="button"
            className={`dept-btn ${selectedDepartment === 'tourism' ? 'active' : ''}`}
            onClick={() => handleDepartmentChange('tourism')}
          >
            <span>🏛️ Tourism Department</span>
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label className="form-label">
            {selectedDepartment === 'police' ? '👮 Police Employee ID' : '🏛️ Tourism Officer ID'}
          </label>
          <input
            type="text"
            name="employeeId"
            className="form-input"
            placeholder={selectedDepartment === 'police' ? 'POL001 or ADMIN' : 'TOU001 or ADMIN'}
            value={credentials.employeeId}
            onChange={handleInputChange}
            disabled={isLoading}
            autoComplete="username"
          />
          <div className="input-hint">
            Enter your department ID or use "ADMIN" for administrative access
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">🔐 Secure Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your secure password"
            value={credentials.password}
            onChange={handleInputChange}
            disabled={isLoading}
            autoComplete="current-password"
          />
          <div className="input-hint">
            Minimum 6 characters required
          </div>
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading"></span>
              Authenticating...
            </>
          ) : (
            `Login to ${selectedDepartment === 'police' ? 'Police' : 'Tourism'} Dashboard`
          )}
        </button>
      </form>

      {/* Security Information */}
      <div className="security-info">
        <div className="security-title">
          🔐 Security Features
        </div>
        <ul className="security-list">
          <li>End-to-end Encryption</li>
          <li>Blockchain Authentication</li>
          <li>Role-based Access Control</li>
          <li>Real-time Security Monitoring</li>
          <li>Multi-layer Data Protection</li>
        </ul>
      </div>

      {/* Login Instructions */}
      <div className="security-info instruction-card">
        <div className="security-title">
          ℹ️ Login Instructions
        </div>
        <div className="instruction-content">
          <p><strong>For {selectedDepartment === 'police' ? 'Police Officers' : 'Tourism Officials'}:</strong></p>
          <p>• Use your assigned department ID (e.g., {selectedDepartment === 'police' ? 'POL001, POL002' : 'TOU001, TOU002'})</p>
          <p>• Administrators can use "ADMIN" as Employee ID</p>
          <p>• Password must be at least 6 characters</p>
          <p>• Contact your department IT for credentials</p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>Smart India Hackathon 2024 | Secure • Reliable • Advanced</p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;