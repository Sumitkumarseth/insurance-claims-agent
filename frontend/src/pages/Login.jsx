import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store'
import { authAPI } from '../api/client'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await authAPI.login(formData)
      const { token, user } = response.data
      login(user, token)
      toast.success(`🎉 Welcome back, ${user.name}!`)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '450px' }} className="animate-fadeIn">
        
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(245, 87, 108, 0.4)',
            animation: 'pulse 2s infinite'
          }}>
            <span style={{ fontSize: '40px' }}>🚀</span>
          </div>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '900', 
            color: 'white',
            marginBottom: '10px',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)'
          }}>
            Welcome Back!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
            ✨ Sign in to your AI-powered account
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 80px rgba(0,0,0,0.15)',
        }}>
          <form onSubmit={handleSubmit}>
            
            {/* Email */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                📧 Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                🔒 Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '700',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                  Signing in...
                </span>
              ) : (
                '🚀 Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div style={{ 
            marginTop: '24px', 
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '15px' }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{ 
                  color: '#6366f1', 
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                Create one →
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '12px',
            border: '2px solid #fbbf24'
          }}>
            <p style={{ 
              fontSize: '13px', 
              fontWeight: '700',
              color: '#92400e',
              marginBottom: '8px'
            }}>
              🎯 Quick Demo Access:
            </p>
            <p style={{ fontSize: '12px', color: '#92400e', marginBottom: '4px' }}>
              📧 Email: <code style={{ 
                background: 'white', 
                padding: '4px 8px', 
                borderRadius: '6px',
                fontFamily: 'monospace'
              }}>demo@example.com</code>
            </p>
            <p style={{ fontSize: '12px', color: '#92400e' }}>
              🔑 Password: <code style={{ 
                background: 'white', 
                padding: '4px 8px', 
                borderRadius: '6px',
                fontFamily: 'monospace'
              }}>demo123</code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          color: 'rgba(255,255,255,0.8)',
          fontSize: '13px'
        }}>
          🔐 Secured with 256-bit encryption
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

export default Login