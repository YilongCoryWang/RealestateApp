const express = require("express")
const expressJoi = require("@escook/express-joi")
const propertyHandler = require("../route_handlers/property")
const { get_property_details_schema, get_properties_by_status_schema } = require("../schema/property")

const router = express()

router.get("/getPropertiesByStatus/:status", expressJoi(get_properties_by_status_schema), propertyHandler.getPropertiesByStatus)
router.get("/getProperties", propertyHandler.getProperties)
router.get("/:id", expressJoi(get_property_details_schema), propertyHandler.getPropertyDetails)
router.post("/update", propertyHandler.updatePropertyDetails)
router.post("/add", propertyHandler.addPropertyDetails)
router.delete("/delete/:id", propertyHandler.deletePropertyDetails)

module.exports = router