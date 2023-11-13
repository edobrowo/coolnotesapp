const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Note must be associated with a user'],
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Note must have a title field'],
    },
    content: {
      type: String,
      required: [true, 'Note must have a content field'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
