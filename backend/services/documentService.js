const pdf = require('pdf-parse');
const fs = require('fs').promises;
const logger = require('../utils/logger');

class DocumentService {
  /**
   * Extract text from PDF file
   */
  async extractTextFromPDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      
      logger.info(`Extracted ${data.numpages} pages from PDF`);
      return {
        text: data.text,
        pages: data.numpages,
        info: data.info
      };
    } catch (error) {
      logger.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  /**
   * Extract text from TXT file
   */
  async extractTextFromTXT(filePath) {
    try {
      const text = await fs.readFile(filePath, 'utf-8');
      return {
        text: text,
        pages: 1
      };
    } catch (error) {
      logger.error('TXT extraction error:', error);
      throw new Error('Failed to read text file');
    }
  }

  /**
   * Process uploaded document based on type
   */
  async processDocument(file) {
    const { path, mimetype } = file;

    try {
      let extractedData;

      if (mimetype === 'application/pdf') {
        extractedData = await this.extractTextFromPDF(path);
      } else if (mimetype === 'text/plain') {
        extractedData = await this.extractTextFromTXT(path);
      } else {
        throw new Error('Unsupported file type. Please upload PDF or TXT files.');
      }

      return extractedData;

    } catch (error) {
      logger.error('Document processing error:', error);
      throw error;
    }
  }

  /**
   * Validate FNOL document structure
   */
  validateFNOLDocument(text) {
    const requiredKeywords = [
      'policy', 'incident', 'date', 'loss', 'damage'
    ];

    const foundKeywords = requiredKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );

    const isValid = foundKeywords.length >= 3;

    return {
      isValid,
      foundKeywords,
      missingKeywords: requiredKeywords.filter(k => !foundKeywords.includes(k)),
      confidence: foundKeywords.length / requiredKeywords.length
    };
  }

  /**
   * Clean and normalize extracted text
   */
  cleanText(text) {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines
      .trim();
  }
}

module.exports = new DocumentService();
