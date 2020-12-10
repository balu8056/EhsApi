const mongoose = require("mongoose");
const constants = require("../../routes/constants");

const quiz = mongoose.model(
  "quiz",
  new mongoose.Schema(
    {
      business_id: { type: Number, index: true },
      quiz_id: { type: Number, index: true },
      quiz_name: { type: String, trim: true },
      quiz_description: { type: String, trim: true },
      quiz_instruction: { type: String, trim: true },
      no_of_parts: { type: Number, default: 1 },
      total_question: { type: Number, default: 1 },
      total_time: { type: Number, default: 1 },
      total_marks: { type: Number, default: 1 },
      negative_marks: { type: Number, default: 1 },
      question_ids: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
          },
        ],
        default: [],
      },
      subject: { type: Array, default: [] },
      topic: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "workflow",
          },
        ],
        default: [],
      },
      sub_topic: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subworkflow",
          },
        ],
        default: [],
      },
      difficulty_level: { type: Number, default: 1 },
      quiz_type: { type: Number, default: 1 },
      has_verified_answer: { type: Number, default: 1 },
      is_active: { type: Number, default: 1 },
      updated_by: { type: String, default: null },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  )
);

module.exports = quiz;
