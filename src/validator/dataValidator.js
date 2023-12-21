const joi = require("joi");

function schemaUpdateValidator(body) {
  const taskSchema = joi.object({
    title: joi.string().min(1).max(50),
    description: joi.string().min(1).max(100),
    completion: joi.boolean(),
    priority: joi.string().min(1).max(50),
    createdAt: joi.date(),
  });
  return taskSchema.validate(body);
}

function schemaInsertValidator(body) {
  const taskSchema = joi.object({
    id: joi.number().required(),
    title: joi.string().min(1).max(50).required(),
    description: joi.string().min(1).max(100).required(),
    completion: joi.boolean().required(),
    priority: joi.string().min(1).max(50).required(),
    createdAt: joi.date().required(),
  });
  return taskSchema.validate(body);
}

module.exports = {
  schemaUpdateValidator,
  schemaInsertValidator,
};
