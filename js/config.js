// Configuration for static deployment (GitHub Pages)
// This approach minimizes exposure while maintaining functionality

window.CONFIG = {
    // Firebase configuration - these are client-side safe values
    firebase: {
        apiKey: "AIzaSyAVsXzqI9MRxA8BuB6KQvGF4p-BGAlX9rA",
        authDomain: "edited-frame.firebaseapp.com", 
        databaseURL: "https://edited-frame-default-rtdb.firebaseio.com",
        projectId: "edited-frame",
        storageBucket: "edited-frame.firebasestorage.app",
        messagingSenderId: "149877290361",
        appId: "1:149877290361:web:08a8be44122721ff962ba8",
        measurementId: "G-ZNF7KDC521"
    },
    
    // Security settings
    allowedDomains: [
        'algsoch.github.io',
        'localhost',
        '127.0.0.1'
    ],
    
    // Features
    discord: {
        enabled: false, // Disable for client-side security
        webhookUrl: '' // Never expose webhook URLs client-side
    }
};
