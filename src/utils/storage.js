export const storage = (prefix = '') => {
    return {
        set: (key, value) => {
            localStorage.setItem(prefix + key, JSON.stringify(value));
        },
        get: (key, fallback = null) => {
            const value = localStorage.getItem(prefix + key);
            if (value === null) {
                return fallback;
            }

            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        },
        remove: (key) => {
            localStorage.removeItem(prefix + key);
        },
        clearAll: () => {
            // Clear hanya untuk prefix tertentu
            Object.keys(localStorage).forEach((key) => {
                if (key.startsWith(prefix)) {
                    localStorage.removeItem(key);
                }
            });
        }
    };
};
