module.exports = {
  book: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        additionalProperties: false,
        required: ['name', 'tags'],
        properties: {
          _id: { bsonType: 'objectId' },
          name: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          tags: {
            bsonType: 'array',
            minItems: 1,
            items: {
              bsonType: 'string',
              description: 'required and must be a string',
            },
          },
        },
      },
    },
  },
};
