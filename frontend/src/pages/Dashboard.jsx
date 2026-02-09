import { useQuery } from 'react-query'
import { analyticsAPI } from '../api/client'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useQuery('dashboard', () => 
    analyticsAPI.getDashboard()
  )

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '400px' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
          <p style={{ color: '#6b7280', fontSize: '16px', fontWeight: '600' }}>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = dashboardData?.data

  // Chart data
  const queueData = [
    { name: 'Fast Track', value: stats?.queueStats?.['fast-track'] || 0, color: '#10b981' },
    { name: 'Manual Review', value: stats?.queueStats?.['manual-review'] || 0, color: '#f59e0b' },
    { name: 'Specialist', value: stats?.queueStats?.['specialist-queue'] || 0, color: '#3b82f6' },
    { name: 'Investigation', value: stats?.queueStats?.investigation || 0, color: '#ef4444' },
  ]

  const statusData = [
    { name: 'Pending', count: stats?.statusStats?.pending || 0 },
    { name: 'Processing', count: stats?.statusStats?.processing || 0 },
    { name: 'Approved', count: stats?.statusStats?.approved || 0 },
    { name: 'Rejected', count: stats?.statusStats?.rejected || 0 },
  ]

  const COLORS = ['#fbbf24', '#3b82f6', '#10b981', '#ef4444']

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }} className="animate-fadeIn">
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '48px' }}>📊</span>
          Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Overview of your AI-powered claims processing system
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Total Claims */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '48px' }}>📄</span>
            <span style={{ 
              fontSize: '14px', 
              background: 'rgba(255,255,255,0.2)', 
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '700'
            }}>
              TOTAL
            </span>
          </div>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: '0 0 8px 0', fontWeight: '600' }}>
            Total Claims
          </p>
          <p style={{ fontSize: '48px', fontWeight: '900', margin: 0 }}>
            {stats?.overview?.totalClaims || 0}
          </p>
        </div>

        {/* High Value Claims */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '48px' }}>💰</span>
            <span style={{ 
              fontSize: '14px', 
              background: 'rgba(255,255,255,0.2)', 
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '700'
            }}>
              HIGH VALUE
            </span>
          </div>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: '0 0 8px 0', fontWeight: '600' }}>
            High Value Claims
          </p>
          <p style={{ fontSize: '48px', fontWeight: '900', margin: 0 }}>
            {stats?.overview?.highValueClaims || 0}
          </p>
        </div>

        {/* Avg Processing */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '48px' }}>⏱️</span>
            <span style={{ 
              fontSize: '14px', 
              background: 'rgba(255,255,255,0.2)', 
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '700'
            }}>
              SPEED
            </span>
          </div>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: '0 0 8px 0', fontWeight: '600' }}>
            Avg Processing Time
          </p>
          <p style={{ fontSize: '48px', fontWeight: '900', margin: 0 }}>
            {stats?.overview?.avgProcessingDays || 0}<span style={{ fontSize: '24px', marginLeft: '8px' }}>days</span>
          </p>
        </div>

        {/* Total Damages */}
        <div style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          boxShadow: '0 10px 40px rgba(236, 72, 153, 0.3)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '48px' }}>💸</span>
            <span style={{ 
              fontSize: '14px', 
              background: 'rgba(255,255,255,0.2)', 
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '700'
            }}>
              AMOUNT
            </span>
          </div>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: '0 0 8px 0', fontWeight: '600' }}>
            Total Damages
          </p>
          <p style={{ fontSize: '42px', fontWeight: '900', margin: 0 }}>
            ₹{((stats?.damageStats?.totalDamage || 0) / 1000).toFixed(1)}K
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Queue Distribution Chart */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            🎯 Claims by Queue
          </h3>
          {queueData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={queueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {queueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
              <p style={{ color: '#6b7280', fontWeight: '600' }}>No data yet</p>
            </div>
          )}
        </div>

        {/* Status Distribution Chart */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            📈 Claims by Status
          </h3>
          {statusData.some(d => d.count > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#667eea" radius={[8, 8, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📈</div>
              <p style={{ color: '#6b7280', fontWeight: '600' }}>No data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Claims Table */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: '800', 
            color: '#1f2937',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            📋 Recent Claims
          </h3>
          <span style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '700'
          }}>
            Latest Updates
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: '800px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)' }}>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontSize: '13px', 
                  fontWeight: '800', 
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderTopLeftRadius: '12px'
                }}>
                  Policy #
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontSize: '13px', 
                  fontWeight: '800', 
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Policyholder
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontSize: '13px', 
                  fontWeight: '800', 
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Damage
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontSize: '13px', 
                  fontWeight: '800', 
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Status
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontSize: '13px', 
                  fontWeight: '800', 
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderTopRightRadius: '12px'
                }}>
                  Queue
                </th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentClaims && stats.recentClaims.length > 0 ? (
                stats.recentClaims.map((claim, idx) => (
                  <tr key={claim._id} style={{
                    borderBottom: idx < stats.recentClaims.length - 1 ? '1px solid #f3f4f6' : 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '20px', fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                      {claim.policyNumber || 'N/A'}
                    </td>
                    <td style={{ padding: '20px', fontSize: '15px', color: '#374151' }}>
                      {claim.policyholderName || 'N/A'}
                    </td>
                    <td style={{ padding: '20px', fontSize: '17px', fontWeight: '800', color: '#10b981' }}>
                      ₹{(claim.estimatedDamage || 0).toLocaleString()}
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        padding: '6px 14px',
                        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                        color: '#1e40af',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '700',
                        textTransform: 'capitalize'
                      }}>
                        {claim.status}
                      </span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        padding: '6px 14px',
                        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                        color: '#065f46',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '700',
                        textTransform: 'capitalize'
                      }}>
                        {claim.routingDecision?.queue?.replace('-', ' ') || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ 
                    padding: '60px 20px', 
                    textAlign: 'center' 
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚀</div>
                    <p style={{ 
                      fontSize: '18px', 
                      color: '#6b7280', 
                      fontWeight: '600',
                      margin: 0
                    }}>
                      No claims yet. Process your first claim to get started!
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard