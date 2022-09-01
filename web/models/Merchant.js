import mongoose from 'mongoose';
const merchantSchema = mongoose.Schema({
  shop: {
    type: String,
  },
  tabs: [
    {
      title: {
        type: String,
        required: [true, 'Please enter title.'],
      },
      label: {
        type: String,
      },
      description: {
        type: String,
        required: [true, 'Please write some description.'],
      },
      assignedTo: {
        type: String,
        enum: ['All Products'],
        required: [true, 'Please select Assigned To'],
      },
      enable: {
        type: Boolean,
      },
    },
  ],
});

const MerchantModel = mongoose.model('Merchant', merchantSchema);

export default MerchantModel;
