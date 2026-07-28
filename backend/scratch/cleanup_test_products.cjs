const mongoose = require('mongoose');

async function cleanup() {
    try {
        await mongoose.connect('mongodb://localhost:27017/koreanza');
        const db = mongoose.connection.db;
        
        // Delete products with ID > 36 (keeping the original 36)
        const result = await db.collection('products').deleteMany({ id: { $gt: 36 } });
        
        console.log(`Successfully deleted ${result.deletedCount} new products.`);
        process.exit(0);
    } catch (err) {
        console.error('Error during cleanup:', err);
        process.exit(1);
    }
}

cleanup();
