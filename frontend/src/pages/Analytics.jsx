const Analytics = () => {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          📈 Analytics
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Detailed insights and performance metrics
        </p>
      </div>

      {/* Coming Soon Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '80px 40px',
        textAlign: 'center',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
      }}>
        <div style={{ fontSize: '100px', marginBottom: '24px' }}>📊</div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          Advanced Analytics
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto 32px' }}>
          Detailed charts, trends, and performance metrics are coming soon. Stay tuned for powerful insights into your claims data!
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            borderRadius: '16px',
            border: '2px solid #3b82f6'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📉</div>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e40af' }}>
              Claim Trends
            </p>
          </div>
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '16px',
            border: '2px solid #f59e0b'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏱️</div>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#92400e' }}>
              Processing Time
            </p>
          </div>
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            borderRadius: '16px',
            border: '2px solid #10b981'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#065f46' }}>
              Accuracy Metrics
            </p>
          </div>
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
            borderRadius: '16px',
            border: '2px solid #ec4899'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💰</div>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#9f1239' }}>
              Cost Analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics