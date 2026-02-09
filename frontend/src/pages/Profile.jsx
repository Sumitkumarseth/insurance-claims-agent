import { useAuthStore } from '../store'
import { useQuery } from 'react-query'
import { claimsAPI } from '../api/client'

const Profile = () => {
  const { user } = useAuthStore()

  // Get user's claims stats
  const { data: claimsData } = useQuery('userClaims', () =>
    claimsAPI.getAllClaims({ userId: user?._id })
  )

  const userClaims = claimsData?.data?.claims || []
  const totalClaims = userClaims.length
  const approvedClaims = userClaims.filter(c => c.status === 'approved').length
  const successRate = totalClaims > 0 ? ((approvedClaims / totalClaims) * 100).toFixed(1) : 0

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          👤 My Profile
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Manage your account and view your activity
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '24px' }}>
        {/* Left Column - Profile Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          {/* Animated Avatar */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
            <div style={{
              position: 'absolute',
              inset: '-6px',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #f59e0b 100%)',
              borderRadius: '50%',
              animation: 'rotate 3s linear infinite'
            }} />
            <div style={{
              position: 'relative',
              width: '140px',
              height: '140px',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '56px',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)',
              border: '6px solid white'
            }}>
              👤
            </div>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '8px'
          }}>
            {user?.name}
          </h2>

          <p style={{
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
            color: '#9f1239',
            borderRadius: '12px',
            display: 'inline-block',
            fontWeight: '700',
            fontSize: '14px',
            textTransform: 'capitalize',
            marginBottom: '24px'
          }}>
            🎯 {user?.role}
          </p>

          {/* Quick Info */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            borderRadius: '16px',
            border: '2px solid #e5e7eb',
            marginBottom: '16px',
            textAlign: 'left'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              📧 Email
            </p>
            <p style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#111827',
              margin: 0,
              wordBreak: 'break-all'
            }}>
              {user?.email}
            </p>
          </div>

          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            borderRadius: '16px',
            border: '2px solid #e5e7eb',
            textAlign: 'left'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              🏢 Department
            </p>
            <p style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#111827',
              margin: 0,
              textTransform: 'capitalize'
            }}>
              {user?.department || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Column - Stats & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '24px',
              color: 'white',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
              <p style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>
                {totalClaims}
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, fontWeight: '600' }}>
                Total Claims
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '20px',
              padding: '24px',
              color: 'white',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
              <p style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>
                {approvedClaims}
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, fontWeight: '600' }}>
                Approved
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '20px',
              padding: '24px',
              color: 'white',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎯</div>
              <p style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>
                {successRate}%
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, fontWeight: '600' }}>
                Success Rate
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              ⚡ Quick Actions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <button style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                <span style={{ fontSize: '20px' }}>⬆️</span>
                Process Claim
              </button>

              <button style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                <span style={{ fontSize: '20px' }}>📄</span>
                View Claims
              </button>

              <button style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                <span style={{ fontSize: '20px' }}>📈</span>
                Analytics
              </button>

              <button style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                <span style={{ fontSize: '20px' }}>📋</span>
                Reports
              </button>
            </div>
          </div>

          {/* Settings Preview */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              ⚙️ Account Settings
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                borderRadius: '14px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔐</div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', margin: 0 }}>
                  Security
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                borderRadius: '14px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981'
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔔</div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', margin: 0 }}>
                  Notifications
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                borderRadius: '14px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b'
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎨</div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#374151', margin: 0 }}>
                  Theme
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Profile