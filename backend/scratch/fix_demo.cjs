const mongoose = require('mongoose');

async function fixDemo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/koreanza');
        const db = mongoose.connection.db;
        
        await db.collection('products').updateOne(
            { id: 999 },
            { 
                $set: { 
                    image: '/uploads/skincare.png', 
                    benefits: 'Hydrating & Glowing', 
                    original_price: 'Rs 2000' 
                } 
            }
        );
        
        console.log('Successfully updated Postman Demo Cream with image and details.');
        process.exit(0);
    } catch (err) {
        console.error('Error updating demo product:', err);
        process.exit(1);
    }
}

fixDemo();
