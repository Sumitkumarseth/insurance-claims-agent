import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { claimsAPI } from '../api/client'
import { useState } from 'react'

const ClaimsList = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    status: '',
    queue: '',
    search: ''
  })

  const { data: claimsData, isLoading } = useQuery(['claims', filters], () =>
    claimsAPI.getAllClaims({ ...filters })
  )

  const getQueueColor = (queue) => {
    const colors = {
      'fast-track': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'manual-review': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'specialist-queue': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'investigation': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    }
    return colors[queue] || 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
  }

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      'processing': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'approved': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'rejected': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      'completed': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    }
    return colors[status] || 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
  }

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
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Loading claims...</p>
        </div>
      </div>
    )
  }

  const claims = claimsData?.data?.claims || []

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          📄 All Claims
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          View and manage all insurance claims
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {/* Search */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '700',
              color: '#374151',
              marginBottom: '8px'
            }}>
              🔍 Search
            </label>
            <input
              type="text"
              placeholder="Policy number, name..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '700',
              color: '#374151',
              marginBottom: '8px'
            }}>
              📊 Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Queue Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '700',
              color: '#374151',
              marginBottom: '8px'
            }}>
              🎯 Queue
            </label>
            <select
              value={filters.queue}
              onChange={(e) => setFilters({ ...filters, queue: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">All Queues</option>
              <option value="fast-track">Fast Track</option>
              <option value="manual-review">Manual Review</option>
              <option value="specialist-queue">Specialist Queue</option>
              <option value="investigation">Investigation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Claims Grid */}
      {claims.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {claims.map((claim) => (
            <div
              key={claim._id}
              onClick={() => navigate(`/claims/${claim._id}`)}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'
                e.currentTarget.style.borderColor = '#667eea'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '32px' }}>📋</span>
                <span style={{
                  padding: '6px 12px',
                  background: getStatusColor(claim.status),
                  color: 'white',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}>
                  {claim.status}
                </span>
              </div>

              {/* Policy Info */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                {claim.policyNumber || 'N/A'}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                margin: '0 0 20px 0'
              }}>
                {claim.policyholderName || 'Unknown'}
              </p>

              {/* Damage Amount */}
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '2px solid #86efac'
              }}>
                <p style={{ fontSize: '13px', color: '#047857', margin: '0 0 4px 0', fontWeight: '600' }}>
                  Estimated Damage
                </p>
                <p style={{ fontSize: '28px', fontWeight: '900', color: '#065f46', margin: 0 }}>
                  ₹{(claim.estimatedDamage || 0).toLocaleString()}
                </p>
              </div>

              {/* Queue */}
              <div style={{
                padding: '12px 16px',
                background: getQueueColor(claim.routingDecision?.queue),
                color: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {claim.routingDecision?.queue?.replace('-', ' ') || 'N/A'}
              </div>

              {/* Date */}
              <p style={{
                fontSize: '12px',
                color: '#9ca3af',
                margin: '16px 0 0 0',
                textAlign: 'center'
              }}>
                {new Date(claim.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '80px 40px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>📭</div>
          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1f2937', marginBottom: '12px' }}>
            No Claims Found
          </h3>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px' }}>
            Try adjusting your filters or process a new claim
          </p>
          <button
            onClick={() => navigate('/process')}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
            }}
          >
            🚀 Process New Claim
          </button>
        </div>
      )}
    </div>
  )
}

export default ClaimsList