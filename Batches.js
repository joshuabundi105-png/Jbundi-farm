// Batches.js

class Batch {
    constructor(id, name, quantity, status) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.status = status;
    }
}

class BatchManager {
    constructor() {
        this.batches = [];
    }

    addBatch(batch) {
        this.batches.push(batch);
    }

    removeBatch(id) {
        this.batches = this.batches.filter(batch => batch.id !== id);
    }

    updateBatch(id, updatedBatch) {
        const index = this.batches.findIndex(batch => batch.id === id);
        if (index !== -1) {
            this.batches[index] = updatedBatch;
        }
    }

    getBatch(id) {
        return this.batches.find(batch => batch.id === id);
    }

    getAllBatches() {
        return this.batches;
    }
}

// Example usage:
const batchManager = new BatchManager();
batchManager.addBatch(new Batch(1, 'Batch A', 100, 'active'));

console.log(batchManager.getAllBatches());