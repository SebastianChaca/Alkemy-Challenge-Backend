const Operation = require('../../models/Operation');

const resolvers = {
  Mutation: {
    newOperation: async (_, { input }, ctx) => {
      try {
        const newOperation = new Operation(input);
        newOperation.user = ctx.user.id;
        const result = await newOperation.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateOperation: async (_, { id, input }, ctx) => {
      let operations = await Operation.findById(id);

      if (!operations) {
        throw new Error('No existe la operación');
      }
      if (operations.user.toString() !== ctx.user.id) {
        throw new Error('No tienes las credenciales');
      }
      operation = await Operation.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return operation;
    },
    deleteOperation: async (_, { id }, ctx) => {
      let operations = await Operation.findById(id);

      if (!operations) {
        throw new Error('No existe la operación');
      }
      if (operations.user.toString() !== ctx.user.id) {
        throw new Error('No tienes las credenciales');
      }
      await Operation.findByIdAndDelete({ _id: id });
      return 'Operación Eliminada';
    },
  },
  Query: {
    getOperationById: async (_, { id }, ctx) => {
      let operations = await Operation.findById(id);
      if (!operations) {
        throw new Error('No existe la operación');
      }
      if (operations.user.toString() !== ctx.user.id) {
        throw new Error('No tienes las credenciales');
      }

      return [operations];
    },
    getUserOperations: async (_, {}, ctx) => {
      const operations = await Operation.find({
        user: ctx.user.id.toString(),
      });
      if (!operations) {
        throw new Error('Busqueda sin exito');
      }
      return operations;
    },
  },
};

module.exports = resolvers;
