const mongoose = require('mongoose')

const BundelSchem = new mongoose.Schema(
    {
        bundleId: { type: String, required: true, unique: true },
        amount: { type: Number, default: null },
        bundleDescription: { type: String, required: true },
        category: { type: String, required: true },
        operatorCode: { type: String, required: true },
        validity: { type: String, required: true },
        flag: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
      },
      {timestamps:true}
);

const Bundel = mongoose.model('Bundel', BundelSchem)

module.exports = Bundel;