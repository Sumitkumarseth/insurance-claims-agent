import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store'
import { useState } from 'react'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navigation = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: '📊', 
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      name: 'Process Claim', 
      path: '/process', 
      icon: '⬆️', 
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    { 
      name: 'All Claims', 
      path: '/claims', 
      icon: '📄', 
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    { 
      name: 'Analytics', 
      path: '/analytics', 
      icon: '📈', 
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: '👤', 
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
    },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 14px',
                cursor: 'pointer',
                color: 'white',
                fontSize: '20px',
                fontWeight: '700'
              }}
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              🚀
            </div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '900',
              color: 'white',
              margin: 0,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Insurance Claims AI
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }} className="user-info">
              <p style={{ 
                fontSize: '15px', 
                fontWeight: '700', 
                color: 'white',
                margin: 0
              }}>
                {user?.name}
              </p>
              <p style={{
                fontSize: '12px',
                padding: '3px 12px',
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '12px',
                color: 'white',
                display: 'inline-block',
                margin: '4px 0 0 0',
                textTransform: 'capitalize',
                fontWeight: '600'
              }}>
                {user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 20px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside className="sidebar" style={{
          width: '280px',
          background: 'white',
          minHeight: 'calc(100vh - 82px)',
          boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
          padding: '24px 16px',
          transition: 'left 0.3s',
          zIndex: 40
        }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <p style={{
              fontSize: '13px',
              color: '#9ca3af',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Navigation
            </p>
          </div>
          
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 18px',
                marginBottom: '10px',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '16px',
                background: isActive(item.path) 
                  ? item.gradient
                  : 'transparent',
                color: isActive(item.path) ? 'white' : '#374151',
                boxShadow: isActive(item.path) ? '0 8px 20px rgba(0,0,0,0.15)' : 'none',
                transform: isActive(item.path) ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s',
                border: isActive(item.path) ? 'none' : '2px solid transparent',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
                  e.currentTarget.style.transform = 'scale(1.02) translateX(5px)'
                  e.currentTarget.style.borderColor = item.color
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'scale(1) translateX(0)'
                  e.currentTarget.style.borderColor = 'transparent'
                }
              }}
            >
              <span style={{ 
                fontSize: '28px',
                filter: isActive(item.path) ? 'none' : 'grayscale(40%)',
                transition: 'all 0.3s'
              }}>
                {item.icon}
              </span>
              <span>{item.name}</span>
              
              {isActive(item.path) && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '18px',
                  animation: 'pulse 2s infinite'
                }}>
                  ✨
                </span>
              )}
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '32px',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 30
          }}
        />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 1023px) {
          .sidebar {
            position: fixed !important;
            left: ${sidebarOpen ? '0' : '-280px'} !important;
          }
        }

        @media (min-width: 1024px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .sidebar {
            position: static !important;
          }
        }

        @media (max-width: 640px) {
          .user-info {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Layout