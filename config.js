/**
 * MajiHesabu - Configuration File
 * Frontend configuration for Admin Dashboard & Customer Portal
 * 
 * 🏢 Powered by Albuk Technologies Ltd
 * "Empowering Small Businesses Through Practical Technology"
 */

// ============================================================================
// GLOBAL SCOPE INITIALIZATION
// ============================================================================

// Attach to window/globalThis to avoid block-scoping issues (const inside if block)
var root = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this);

if (typeof root.CONFIG === 'undefined') {
  root.CONFIG = {
    // ✅ Deployed Apps Script URL
    API_ENDPOINT: "https://script.google.com/macros/s/AKfycbwpK9chdjn0UvkLLQq8u7H1DpLGep7SMSPYtxp41_hjvOIlydqRjfQYzPh6OXNzUSnd/exec",

    // ============================================================================
    // COMPANY INFORMATION
    // ============================================================================

    COMPANY_NAME: "Joy Water Supplies",
    COMPANY_PHONE: "+254768789382",
    COMPANY_EMAIL: "joywatersupplies@gmail.com",
    COMPANY_LOCATION: "Mlolongo, Kenya",

    // ============================================================================
    // PAYMENT INFORMATION
    // ============================================================================

    MPESA_TILL: "4984254",
    MPESA_BUSINESS_NAME: "Joy Water Supplies",

    // ============================================================================
    // WHATSAPP CONFIGURATION
    // ============================================================================

    WHATSAPP_PHONE: "+254768789382",
    WHATSAPP_BUSINESS_NAME: "Joy Water Supplies",

    // ============================================================================
    // BILLING CONFIGURATION
    // ============================================================================

    WATER_RATE: 100, // KES per unit
    PAYMENT_DEADLINE_DAYS: 15, // Days until bill is due
    CURRENCY: "KES",
    CURRENCY_SYMBOL: "KES",

    // ============================================================================
    // SYSTEM CONFIGURATION
    // ============================================================================

    // Portal timeout (in milliseconds)
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    
    // Page refresh interval for admin dashboard
    DASHBOARD_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    
    // Number of debtors to show in list
    DEBTORS_LIMIT: 50,
    
    // Consumption history to display
    HISTORY_MONTHS: 6,

    // ============================================================================
    // BRANDING & APPEARANCE
    // ============================================================================

    // Colors (Albuk Global branding)
    COLORS: {
      primary: "#1a3a3a",
      secondary: "#2d5a5a",
      accent: "#C49424",
      success: "#4CAF50",
      danger: "#ff6b6b",
      warning: "#ffc107",
      light_bg: "#f5f5f5"
    },

    // Typography
    FONTS: {
      primary: "'DM Mono', 'Courier New', monospace",
      secondary: "'Playfair Display', serif"
    },

    // ============================================================================
    // FEATURE FLAGS
    // ============================================================================

    FEATURES: {
      whatsapp_integration: true,
      mpesa_integration: false, // Set to true when M-Pesa credentials added
      sms_notifications: false,
      email_notifications: false,
      pdf_export: false,
      bulk_import: false
    },

    // ============================================================================
    // VALIDATION RULES
    // ============================================================================

    VALIDATION: {
      // Phone number format - accepts both +254 and 0 prefix
      // Examples: +254700000001, 0700000001, 254700000001
      phone_pattern: /^(\+254|0|254)[0-9]{9}$/,
      phone_example: "+254700000001 or 0700000001",

      // Meter number format (alphanumeric)
      meter_pattern: /^[A-Z0-9-]{5,20}$/,
      meter_example: "M-00123",

      // Email format
      email_pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

      // Minimum consumption (units)
      min_consumption: 0.1,

      // Maximum consumption alert (units) - anything above triggers inspection
      max_consumption_alert: 200,
    },

    // ============================================================================
    // API ENDPOINTS (used internally - do not modify)
    // ============================================================================

    ENDPOINTS: {
      authenticate: "authenticate",
      recordMeterReading: "recordMeterReading",
      generateInvoice: "generateInvoice",
      recordPayment: "recordPayment",
      getInvoiceHistory: "getInvoiceHistory",
      getPaymentHistory: "getPaymentHistory",
      getDashboard: "getDashboard",
      getDebtors: "getDebtors",
      getConsumptionTrends: "getConsumptionTrends",
      sendInvoiceWhatsApp: "sendInvoiceWhatsApp",
      sendReminderWhatsApp: "sendReminderWhatsApp",
      createCustomer: "createCustomer",
      getCustomer: "getCustomer"
    },

    // ============================================================================
    // ERROR MESSAGES
    // ============================================================================

    MESSAGES: {
      LOGIN_REQUIRED: "Please login to continue",
      INVALID_CREDENTIALS: "Invalid phone number or meter number",
      NETWORK_ERROR: "Network error. Please check your connection.",
      FIELD_REQUIRED: "This field is required",
      INVALID_PHONE: "Please enter a valid phone number",
      INVALID_METER: "Please enter a valid meter number",
      INVALID_AMOUNT: "Please enter a valid amount",
      PAYMENT_SUCCESS: "Payment recorded successfully",
      INVOICE_SENT: "Invoice sent via WhatsApp",
      REMINDER_SENT: "Reminder sent to customer",
      CUSTOMER_ADDED: "Customer added successfully",
      READING_RECORDED: "Meter reading recorded successfully",
      ERROR_SAVING_DATA: "Error saving data. Please try again.",
      SESSION_EXPIRED: "Your session has expired. Please login again.",
      UNAUTHORIZED: "You do not have permission to access this"
    },

    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================

    /**
     * Format currency value
     */
    formatCurrency: function(amount) {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
      }).format(amount).replace('KES', '').trim();
    },

    /**
     * Format date
     */
    formatDate: function(date) {
      if (!date) return '-';
      const d = new Date(date);
      return d.toLocaleDateString('en-KE');
    },

    /**
     * Format date and time
     */
    formatDateTime: function(date) {
      if (!date) return '-';
      const d = new Date(date);
      return d.toLocaleString('en-KE');
    },

    /**
     * Calculate days overdue
     */
    daysOverdue: function(dueDate) {
      const today = new Date();
      const due = new Date(dueDate);
      const diffTime = today - due;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },

    /**
     * Validate phone number
     */
    isValidPhone: function(phone) {
      return this.VALIDATION.phone_pattern.test(phone);
    },

    /**
     * Validate meter number
     */
    isValidMeter: function(meter) {
      return this.VALIDATION.meter_pattern.test(meter);
    },

    /**
     * Validate email
     */
    isValidEmail: function(email) {
      return this.VALIDATION.email_pattern.test(email);
    },

    /**
     * Check if consumption is abnormally high
     */
    isAbnormalConsumption: function(consumption) {
      return consumption > this.VALIDATION.max_consumption_alert;
    },

    /**
     * Get consumption alert message
     */
    getConsumptionAlert: function(consumption, averageConsumption) {
      const percentAboveAvg = ((consumption - averageConsumption) / averageConsumption * 100).toFixed(0);
      if (consumption > this.VALIDATION.max_consumption_alert) {
        return `⚠️ ALERT: Consumption is ${percentAboveAvg}% above average! Check for leaks.`;
      }
      return null;
    }
  };
}

// Assign to global variable scope using var to prevent block-scope isolation
var CONFIG = root.CONFIG;

// ============================================================================
// EXPORT (for Node / build systems)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
