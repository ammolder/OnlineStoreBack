const Joi = require("joi");

const {typeSex, typeCategory, typeSize} = require("../constants/constantsItem");

// * JOI
// * Validation start < end
const addItemVldtr = Joi.object({
	title: Joi.string().max(250).required(),
	price: Joi.number().max(10000).required(),
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

const changeSexItemVldtr = Joi.object({
	sex: Joi.string()
		.valid(...typeSex)
		.required(),
});
const changeCategoryItemVldtr = Joi.object({
	category: Joi.string().valid(...typeCategory),
	// .required(),
});
const changeSizeItemVldtr = Joi.object({
	size: Joi.string()
		.valid(...typeSize)
		.required(),
});
const changeStatusItemVldtr = Joi.object({
	status: Joi.boolean().required(),
});
// const changeRatingItemVldtr = Joi.object({
//   rating: Joi.string()
//     .valid(...typeRating)
//     .required(),
// });

module.exports = {
	addItemVldtr,
	changeSexItemVldtr,
	changeCategoryItemVldtr,
	changeSizeItemVldtr,
	changeStatusItemVldtr,
	// changeRatingItemVldtr,
};
