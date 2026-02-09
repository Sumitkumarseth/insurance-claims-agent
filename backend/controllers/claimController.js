const Claim = require('../models/Claim');
const aiService = require('../services/aiService');
const logger = require('../utils/logger');
const fs = require('fs');

// Process FNOL document
exports.processClaim = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;

    logger.info(`Processing claim document: ${fileName}`);

    // Read file content
    const documentText = fs.readFileSync(filePath, 'utf-8');

    // Process with AI
    const aiResult = await aiService.processFNOLDocument(documentText);

    // Create claim with proper data mapping
    const claimData = {
      policyNumber: aiResult.extractedFields?.policyNumber || 'N/A',
      policyholderName: aiResult.extractedFields?.policyholderName || 'Unknown',
      effectiveDates: aiResult.extractedFields?.effectiveDates || {},
      incidentDate: aiResult.extractedFields?.incidentDate || null,
      incidentTime: aiResult.extractedFields?.incidentTime || null,
      incidentLocation: aiResult.extractedFields?.incidentLocation || {},
      incidentDescription: aiResult.extractedFields?.incidentDescription || 'No description',
      claimant: aiResult.extractedFields?.claimant || {},
      thirdParties: aiResult.extractedFields?.thirdParties || [],
      assetType: aiResult.extractedFields?.assetType || 'vehicle',
      assetId: aiResult.extractedFields?.assetId || null,
      estimatedDamage: aiResult.extractedFields?.estimatedDamage || 0,
      claimType: aiResult.extractedFields?.claimType || 'property-damage',
      status: 'pending',
      routingDecision: aiResult.routingDecision || {},
      missingFields: aiResult.missingFields || [],
      inconsistentFields: aiResult.inconsistentFields || [],
      assignedTo: req.user._id,
      documentPath: filePath,
      documentName: fileName
    };

    const claim = await Claim.create(claimData);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.status(201).json({
      success: true,
      message: 'Claim processed successfully',
      data: {
        claimId: claim._id,
        extractedFields: aiResult.extractedFields,
        missingFields: aiResult.missingFields,
        inconsistentFields: aiResult.inconsistentFields,
        routingDecision: aiResult.routingDecision
      }
    });

  } catch (error) {
    logger.error(error);
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || 'Error processing claim'
    });
  }
};

// Get claim by ID
exports.getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    res.status(200).json({
      success: true,
      data: claim
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching claim'
    });
  }
};

// Get all claims
exports.getAllClaims = async (req, res) => {
  try {
    const { status, queue, search } = req.query;
    
    let query = {};

    if (status) {
      query.status = status;
    }

    if (queue) {
      query['routingDecision.queue'] = queue;
    }

    if (search) {
      query.$or = [
        { policyNumber: { $regex: search, $options: 'i' } },
        { policyholderName: { $regex: search, $options: 'i' } }
      ];
    }

    const claims = await Claim.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: claims.length,
      data: {
        claims
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching claims'
    });
  }
};

// Update claim
exports.updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    res.status(200).json({
      success: true,
      data: claim
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating claim'
    });
  }
};

// Delete claim
exports.deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndDelete(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Claim deleted successfully'
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting claim'
    });
  }
};