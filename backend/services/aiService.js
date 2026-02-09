const Groq = require('groq-sdk');
const logger = require('../utils/logger');

class AIService {
  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }

  async processFNOLDocument(documentText) {
    try {
      const prompt = this.buildFNOLProcessingPrompt(documentText);
      
      const completion = await this.groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 4000
      });

      const responseText = completion.choices[0].message.content;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('Invalid JSON response');
      }
      
      const parsedResult = JSON.parse(jsonMatch[0]);
      logger.info('AI Processing completed');
      return parsedResult;

    } catch (error) {
      logger.error('Error:', error.message);
      throw new Error('AI processing failed: ' + error.message);
    }
  }

 buildFNOLProcessingPrompt(documentText) {
  return `Extract insurance claim data from this FNOL document.

DOCUMENT:
${documentText}

Return ONLY valid JSON with ALL required fields:
{
  "extractedFields": {
    "policyNumber": "POL-2024-001234",
    "policyholderName": "Rajesh Kumar",
    "effectiveDates": {
      "start": "2024-01-15",
      "end": "2025-01-14"
    },
    "incidentDate": "2024-11-20",
    "incidentTime": "10:30",
    "incidentLocation": {
      "street": "MG Road",
      "city": "Bangalore",
      "state": "Karnataka",
      "zip": "560001"
    },
    "incidentDescription": "Minor collision at traffic signal",
    "claimant": {
      "name": "Rajesh Kumar",
      "phone": "+91-9876543210",
      "email": "rajesh.kumar@email.com"
    },
    "thirdParties": [],
    "assetType": "vehicle",
    "assetId": "KA-01-AB-1234",
    "estimatedDamage": 8500,
    "claimType": "property-damage"
  },
  "missingFields": [],
  "inconsistentFields": [],
  "routingDecision": {
    "queue": "fast-track",
    "reasoning": "Low damage amount under 25000, all fields present, no fraud indicators",
    "confidence": 0.95
  }
}

CRITICAL - ALWAYS include:
- assetType: "vehicle" (always use this)
- claimType: "property-damage" (or "injury", "theft", "total-loss")
- estimatedDamage: must be a number

ROUTING RULES:
- fast-track: damage < 25000, no missing fields
- manual-review: missing mandatory fields
- specialist-queue: injuries or multiple parties
- investigation: fraud keywords (fraud, suspicious, staged)

Return ONLY the JSON object, no extra text.`;
}

  async analyzeFraudRisk(claimData) {
    return {
      fraudScore: 0.1,
      riskLevel: "low",
      indicators: [],
      recommendation: "proceed"
    };
  }

  async generateClaimSummary(claimData) {
    return "Claim processed successfully";
  }
}

module.exports = new AIService();