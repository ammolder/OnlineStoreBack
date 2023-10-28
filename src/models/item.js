const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers/index");
const Joi = require("joi");

const typeSex = ["NoN", "чоловічий", "жіночий", "дитячий"];
const typeCategory = ["NoN", "футболки", "кофти", "леггінси", "костюми"];
const typeSize = ["NoN", "XS", "S", "M", "L", "XL", "XXL"];
// const typeRating = ["1", "2", "3", "4", "5"];

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    sex: {
      type: String,
      required: [true, "Sex is required"],
      enum: typeSex, // NoN | чоловічий | жіночий | дитячий
      default: typeSex[0],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: typeCategory, // NoN | футболки | кофти | леггінси |
      default: typeCategory[0],
    },
    size: {
      type: String,
      required: [true, "Size is required"],
      enum: typeSize, // NoN | XS | S | M | L | XL | XXL
      default: typeSize[0],
    },
    description: {
      type: String,
    },
    // rating: {
    //   type: String,
    //   enum: typeRating, // 1 | 2 | 3 | 4 | 5
    // },
    status: {
      type: Boolean,
      required: [true, "Status is required"],
      default: true,
    },
  },
  { versionKey: false }
);

itemSchema.post("save", handleMongooseError);

// * JOI
// * Validation start < end
const schemaAddItem = Joi.object({
  title: Joi.string().max(250).required(),
  price: Joi.number().max(5).required(),
  sex: Joi.string()
    .valid(...typeSex)
    .required(),
  category: Joi.string().valid(...typeCategory),
  // .required(),
  size: Joi.string()
    .valid(...typeSize)
    .required(),
  description: Joi.string().max(350),
  status: Joi.boolean().required(),
  // rating: Joi.string()
  //   .valid(...typeRating)
  //   .required(),
});

const schemaChangeSexItem = Joi.object({
  sex: Joi.string()
    .valid(...typeSex)
    .required(),
});
const schemaChangeCategoryItem = Joi.object({
  category: Joi.string().valid(...typeCategory),
  // .required(),
});
const schemaChangeSizeItem = Joi.object({
  size: Joi.string()
    .valid(...typeSize)
    .required(),
});
const schemaChangeStatusItem = Joi.object({
  status: Joi.boolean().required(),
});
// const schemaChangeRatingItem = Joi.object({
//   rating: Joi.string()
//     .valid(...typeRating)
//     .required(),
// });

const schemas = {
  schemaAddItem,
  schemaChangeSexItem,
  schemaChangeCategoryItem,
  schemaChangeSizeItem,
  schemaChangeStatusItem,
  // schemaChangeRatingItem,
};
const modelItems = model("items", itemSchema);

module.exports = { modelItems, schemas };
