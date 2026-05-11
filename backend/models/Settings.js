const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
    {
        companyName: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
    },
    { timestamps: true }
);

// Keep a single document for site settings.
settingsSchema.statics.getSingleton = async function getSingleton() {
    const doc = await this.findOne({});
    if (doc) return doc;
    return this.create({});
};

module.exports = mongoose.model('Settings', settingsSchema);


