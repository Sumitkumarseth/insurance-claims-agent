import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { claimsAPI } from '../api/client'
import toast from 'react-hot-toast'

const ProcessClaim = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }
      if (!['application/pdf', 'text/plain'].includes(selectedFile.type)) {
        toast.error('Only PDF and TXT files are allowed')
        return
      }
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      toast.error('Please select a file to upload')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('document', file)

    try {
      const response = await claimsAPI.processClaim(formData)
      setResult(response.data.data)
      toast.success('🎉 Claim processed successfully!')
    } catch (error) {
      console.error('Processing error:', error)
      setResult(null)
    } finally {
      setLoading(false)
    }
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

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          🚀 Process FNOL Document
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Upload a First Notice of Loss document to automatically extract data and route the claim
        </p>
      </div>

      {!result ? (
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Upload Area */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                📄 Upload FNOL Document
              </label>
              
              <div style={{
                border: '3px dashed #d1d5db',
                borderRadius: '20px',
                padding: '48px 24px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
              }}>
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                  }}>
                    ⬆️
                  </div>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    PDF or TXT files up to 10MB
                  </p>
                </label>
              </div>
              
              {file && (
                <div style={{
                  marginTop: '20px',
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '2px solid #10b981'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '32px' }}>📄</span>
                    <div>
                      <p style={{ fontWeight: '700', color: '#065f46', margin: 0 }}>
                        {file.name}
                      </p>
                      <p style={{ fontSize: '13px', color: '#047857', margin: '4px 0 0 0' }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!file || loading}
              style={{
                width: '100%',
                padding: '20px',
                fontSize: '18px',
                fontWeight: '700',
                color: 'white',
                background: file && !loading 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#9ca3af',
                border: 'none',
                borderRadius: '16px',
                cursor: file && !loading ? 'pointer' : 'not-allowed',
                boxShadow: file && !loading ? '0 10px 30px rgba(102, 126, 234, 0.4)' : 'none',
                transition: 'all 0.3s'
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div className="spinner" style={{ width: '24px', height: '24px' }}></div>
                  Processing with AI...
                </span>
              ) : (
                '🚀 Process Claim with AI'
              )}
            </button>
          </form>

          {/* Info Box */}
          <div style={{
            marginTop: '32px',
            padding: '24px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            borderRadius: '16px',
            border: '2px solid #3b82f6'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '800', 
              color: '#1e40af',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💡 How it works:
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', color: '#1e3a8a' }}>
              <li style={{ marginBottom: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                <strong>AI extracts</strong> key fields from your FNOL document (policy number, incident details, parties involved, etc.)
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                <strong>Identifies</strong> any missing or inconsistent information
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                <strong>Automatically routes</strong> to the appropriate queue based on claim complexity and value
              </li>
              <li style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <strong>Provides</strong> detailed reasoning for routing decisions
              </li>
            </ol>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Success Header */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '20px',
            padding: '32px',
            color: 'white',
            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '48px' }}>✅</span>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '900', margin: 0 }}>
                  Claim Processed Successfully!
                </h2>
                <p style={{ margin: '8px 0 0 0', fontSize: '16px', opacity: 0.9 }}>
                  Claim ID: <code style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontFamily: 'monospace'
                  }}>{result.claimId}</code>
                </p>
              </div>
            </div>
          </div>

          {/* Routing Decision */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
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
              gap: '10px'
            }}>
              🎯 Routing Decision
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', display: 'block' }}>
                  Queue:
                </label>
                <div style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: getQueueColor(result.routingDecision.queue),
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  {result.routingDecision.queue.replace('-', ' ')}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', display: 'block' }}>
                  Confidence:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    flex: 1,
                    height: '16px',
                    background: '#e5e7eb',
                    borderRadius: '20px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${result.routingDecision.confidence * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      transition: 'width 1s ease'
                    }} />
                  </div>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#667eea'
                  }}>
                    {(result.routingDecision.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', display: 'block' }}>
                  Reasoning:
                </label>
                <p style={{
                  margin: 0,
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                  borderRadius: '12px',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#374151'
                }}>
                  {result.routingDecision.reasoning}
                </p>
              </div>
            </div>
          </div>

          {/* Extracted Fields */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              📋 Extracted Information
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {Object.entries(result.extractedFields || {}).map(([key, value]) => {
                if (value && typeof value !== 'object') {
                  return (
                    <div key={key} style={{
                      padding: '16px',
                      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                      borderRadius: '12px',
                      border: '2px solid #d1d5db'
                    }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'block',
                        marginBottom: '6px'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <p style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#111827'
                      }}>
                        {value}
                      </p>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>

          {/* Missing/Inconsistent Fields */}
          {result.missingFields && result.missingFields.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              border: '2px solid #fbbf24'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#92400e',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                ⚠️ Missing Fields
              </h3>
              {result.missingFields.map((item, idx) => (
                <div key={idx} style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: '700', color: '#78350f' }}>
                    {item.field}
                  </span>
                  <span style={{
                    padding: '6px 14px',
                    background: item.severity === 'critical' ? '#ef4444' : item.severity === 'important' ? '#f59e0b' : '#6b7280',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <button
              onClick={() => navigate(`/claims/${result.claimId}`)}
              style={{
                padding: '18px',
                fontSize: '17px',
                fontWeight: '700',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
              }}
            >
              📄 View Full Claim Details
            </button>
            <button
              onClick={() => {
                setFile(null)
                setResult(null)
              }}
              style={{
                padding: '18px',
                fontSize: '17px',
                fontWeight: '700',
                color: '#374151',
                background: 'white',
                border: '2px solid #d1d5db',
                borderRadius: '14px',
                cursor: 'pointer'
              }}
            >
              ⬆️ Process Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProcessClaim