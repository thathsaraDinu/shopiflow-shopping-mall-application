import QueueSchema from '../models/queue.model.js';

// Get all queues in a shop by shop ID
export const getQueues = async (shopID) => {
  try {
    // Find all queues in the shop
    const queues = await QueueSchema.find({
      shopID
    })
      .populate('userID')
      .populate('shopID');

    return queues;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get count of all queues in a shop by shop ID
export const getNumberOfQueues = async (shopID) => {
  try {
    // Find all queues in the shop
    const queues = await QueueSchema.countDocuments({
      shopID
    });

    return queues;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get a user's queue in a shop
export const getUserShopQueue = async (userID, shopID) => {
  try {
    // Find the user's queue in the shop
    const queue = await QueueSchema.findOne({
      userID,
      shopID
    });

    return queue;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get a all queues of a user
export const getUserQueues = async (userID) => {
  try {
    // Find all queues of the user
    const queues = await QueueSchema.find({
      userID
    })
      .populate('shopID')
      .populate('userID');

    return queues;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Join a queue
export const joinQueue = async (data) => {
  try {
    // Check if the user is already in the queue
    const existingQueue = await QueueSchema.findOne({
      userID: data.userID,
      shopID: data.shopID
    });

    if (existingQueue) {
      throw {
        status: 400,
        message: 'User already in the queue'
      };
    }

    // Get the last position in the queue
    const lastQueue = await QueueSchema.findOne({
      shopID: data.shopID
    }).sort({ position: -1 });

    // Create a new queue object
    const queue = new QueueSchema({
      ...data,
      position: lastQueue ? lastQueue.position + 1 : 1,
      status: 'waiting'
    });

    // Save the queue object to the database
    await queue.save();

    return queue;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Change queue position
export const changeQueuePosition = async (id, position) => {};

// Leave a queue
export const leaveQueue = async (userID, id) => {
  try {
    // Find the queue by ID
    const queue = await QueueSchema.findOne({
      _id: id,
      userID: userID
    });

    // If the queue is not found, throw an error
    if (!queue) {
      throw {
        status: 404,
        message: 'Queue not found'
      };
    }

    // Remove the queue object from the database
    await QueueSchema.findByIdAndDelete(id);

    return queue;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Clear all queues in a shop
export const clearShopQueues = async (shopID) => {
  try {
    if (!shopID) {
      throw {
        status: 400,
        message: 'Invalid shop ID'
      };
    }

    const numberOfQueues = await QueueSchema.countDocuments({
      shopID
    });

    if (numberOfQueues === 0) {
      return true;
    }

    // Remove all queues in the shop
    await QueueSchema.deleteMany({
      shopID
    });

    return true;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};
