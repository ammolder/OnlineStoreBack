const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const {typeSex, typeCategory, typeSize} = require("../constants/constantsItem");

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

const modelItems = model("items", itemSchema);

module.exports = { modelItems };
