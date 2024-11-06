import Transaction from "../models/transaction.model.js";

const transationResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;

        const transations = await Transaction.find({ userId });
        return transations;
      } catch (err) {
        console.error("Error getting transactions:", err);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { trasactionId }) => {
      try {
        const transaction = await Transaction.findById(trasactionId);

        return transaction;
      } catch (err) {
        console.error("Error getting transaction:", err);
        throw new Error("Error getting transaction");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error in creating transaction:", err);
        throw new Error("Error in creating transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );

        return updateTransaction;
      } catch (err) {
        console.error("Error in updating transaction:", err);
        throw new Error("Error in updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deleteTransaction = await Transaction.findByIdAndDelete(
          input.transactionId,
          input,
          { new: true }
        );
        return deleteTransaction;
      } catch (error) {
        console.error("Error in deleting transaction:", err);
        throw new Error("Error in deleting transaction");
      }
    },
  },
};

export default transationResolver;
