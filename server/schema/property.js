const joi = require("joi")

const status = joi.any().valid('FORSALE', 'RENT', 'SOLD').required()
exports.get_properties_by_status_schema = {
	params: {
		status,
	}
}

const id = joi.number().integer().min(1).required()
exports.get_property_details_schema = {
	params: {
		id,
	}
}