const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  // Policy Information
  policyNumber: {
    type: String,
    required: [true, 'Policy number is required'],
    trim: true,
    index: true
  },
  policyholderName: {
    type: String,
    required: [true, 'Policyholder name is required'],
    trim: true
  },
  effectiveDates: {
    start: Date,
    end: Date
  },

  // Incident Information
  incidentDate: {
    type: Date,
    required: [true, 'Incident date is required']
  },
  incidentTime: String,
  incidentLocation: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  incidentDescription: {
    type: String,
    required: [true, 'Incident description is required']
  },

  // Involved Parties
  claimant: {
    name: String,
    contactDetails: {
      phone: String,
      email: String,
      address: String
    }
  },
  thirdParties: [{
    name: String,
    role: String,
    contactDetails: String
  }],

  // Asset Details
  assetType: {
    type: String,
    enum: ['vehicle', 'property', 'personal', 'other'],
    required: true
  },
  assetId: String,
  estimatedDamage: {
    type: Number,
    required: [true, 'Estimated damage amount is required'],
    min: 0
  },

  // ✅ CLAIM CLASSIFICATION (FIXED)
  claimType: {
    type: String,
    enum: [
      'property-damage', // 🔥 AI jo bhej raha hai
      'accident',
      'damage',
      'theft',
      'injury',
      'total-loss',
      'other'
    ],
    required: true
  },

  // Routing Information
  routingDecision: {
    queue: {
      type: String,
      enum: ['fast-track', 'manual-review', 'specialist-queue', 'investigation'],
      required: true
    },
    reasoning: String,
    confidence: {
      type: Number,
      min: 0,
      max: 1
    }
  },

  // Extracted Fields & Validation
  extractedFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  missingFields: [{
    field: String,
    severity: {
      type: String,
      enum: ['critical', 'important', 'optional']
    }
  }],
  inconsistentFields: [{
    field: String,
    issue: String
  }],

  // Documents
  attachments: [{
    filename: String,
    filepath: String,
    filesize: Number,
    mimetype: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Processing Status
  status: {
    type: String,
    enum: ['pending', 'processing', 'approved', 'rejected', 'investigating'],
    default: 'pending'
  },

  // AI Processing
  aiProcessingLog: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    action: String,
    result: mongoose.Schema.Types.Mixed
  }],

  // User who submitted
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
claimSchema.index({ policyNumber: 1, createdAt: -1 });
claimSchema.index({ status: 1 });
claimSchema.index({ 'routingDecision.queue': 1 });
claimSchema.index({ estimatedDamage: 1 });

// Pre-save
claimSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Claim', claimSchema);
