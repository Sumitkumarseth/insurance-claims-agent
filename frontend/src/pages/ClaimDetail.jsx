import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { claimsAPI } from '../api/client'

const ClaimDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: claimData, isLoading } = useQuery(['claim', id], () =>
    claimsAPI.getClaimById(id)
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
          <p style={{ color: '#6b7280', fontSize: '16px', fontWeight: '600' }}>Loading claim...</p>
        </div>
      </div>
    )
  }

  const claim = claimData?.data

  if (!claim) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '80px 40px',
        textAlign: 'center',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
      }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>❌</div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', marginBottom: '16px' }}>
          Claim Not Found
        </h2>
        <button
          onClick={() => navigate('/claims')}
          style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Back to Claims
        </button>
      </div>
    )
  }

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
      'rejected': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    }
    return colors[status] || 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate('/claims')}
          style={{
            padding: '12px 24px',
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            color: '#374151'
          }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#111827',
            margin: 0
          }}>
            Claim Details
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: '4px 0 0 0' }}>
            ID: {claim._id}
          </p>
        </div>
      </div>

      {/* Status & Queue Badges */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{
          padding: '12px 24px',
          background: getStatusColor(claim.status),
          color: 'white',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '700',
          textTransform: 'uppercase'
        }}>
          📊 {claim.status}
        </div>
        <div style={{
          padding: '12px 24px',
          background: getQueueColor(claim.routingDecision?.queue),
          color: 'white',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '700',
          textTransform: 'uppercase'
        }}>
          🎯 {claim.routingDecision?.queue?.replace('-', ' ')}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Policy Info */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>
              📋 Policy Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                  Policy Number
                </p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  {claim.policyNumber || 'N/A'}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                  Policyholder
                </p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  {claim.policyholderName || 'N/A'}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                  Claim Type
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0, textTransform: 'capitalize' }}>
                  {claim.claimType || 'N/A'}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                  Asset Type
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0, textTransform: 'capitalize' }}>
                  {claim.assetType || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>
              🚗 Incident Details
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                Description
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6', margin: 0 }}>
                {claim.incidentDescription || 'No description available'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                  Date
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                  {claim.incidentDate ? new Date(claim.incidentDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                  Time
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                  {claim.incidentTime || 'N/A'}
                </p>
              </div>
            </div>
            {claim.incidentLocation && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                  Location
                </p>
                <p style={{ fontSize: '15px', color: '#374151', margin: 0 }}>
                  {[
                    claim.incidentLocation.street,
                    claim.incidentLocation.city,
                    claim.incidentLocation.state,
                    claim.incidentLocation.zip
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* AI Routing Decision */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>
              🤖 AI Routing Decision
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                Confidence Score
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  flex: 1,
                  height: '12px',
                  background: '#e5e7eb',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(claim.routingDecision?.confidence || 0) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                  }} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#667eea' }}>
                  {((claim.routingDecision?.confidence || 0) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>
                Reasoning
              </p>
              <p style={{
                fontSize: '15px',
                color: '#374151',
                lineHeight: '1.6',
                margin: 0,
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '12px'
              }}>
                {claim.routingDecision?.reasoning || 'No reasoning provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Damage Amount */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '20px',
            padding: '32px',
            color: 'white',
            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>💰</div>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 8px 0', fontWeight: '600' }}>
              Estimated Damage
            </p>
            <p style={{ fontSize: '36px', fontWeight: '900', margin: 0 }}>
              ₹{(claim.estimatedDamage || 0).toLocaleString()}
            </p>
          </div>

          {/* Timeline */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
              📅 Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '700', marginBottom: '4px' }}>
                  Created
                </p>
                <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                  {new Date(claim.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '700', marginBottom: '4px' }}>
                  Last Updated
                </p>
                <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                  {new Date(claim.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
              ⚡ Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                📝 Update Status
              </button>
              <button style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                💬 Add Comment
              </button>
              <button style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                📄 Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimDetail