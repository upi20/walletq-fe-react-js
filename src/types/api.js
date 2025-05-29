/**
 * @typedef {Object} ApiResponse
 * @property {boolean} status - Status response (true/false)
 * @property {string} message - Response message
 * @property {any} data - Response data
 * @property {Object} [metadata] - Optional metadata for pagination
 * @property {number} [metadata.page] - Current page
 * @property {number} [metadata.limit] - Items per page
 * @property {number} [metadata.totalData] - Total data count
 */

/**
 * @typedef {Object} ApiError
 * @property {boolean} status - Always false for errors
 * @property {string} message - Error message
 * @property {Array<{field: string, message: string}>} [errors] - Validation errors
 * @property {string} [code] - Error code
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} username - Username
 * @property {string} email - Email address
 * @property {string} fullName - Full name
 * @property {string} [avatar] - Avatar URL
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id - Transaction ID
 * @property {number} amount - Transaction amount
 * @property {string} type - Transaction type (income/expense)
 * @property {string} categoryId - Category ID
 * @property {string} walletId - Wallet ID
 * @property {string} description - Transaction description
 * @property {Date} date - Transaction date
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Category ID
 * @property {string} name - Category name
 * @property {string} icon - Category icon name
 * @property {string} type - Category type (income/expense)
 * @property {string} color - Category color code
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

/**
 * @typedef {Object} Wallet
 * @property {string} id - Wallet ID
 * @property {string} name - Wallet name
 * @property {string} type - Wallet type (cash/bank/etc)
 * @property {number} balance - Current balance
 * @property {string} currency - Currency code
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */
