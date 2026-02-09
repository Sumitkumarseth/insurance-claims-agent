const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log('DB Name:', mongoose.connection.name);

    const result = await mongoose.connection.db
      .collection('claims')
      .deleteMany({});

    console.log(`Deleted ${result.deletedCount} claims`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
