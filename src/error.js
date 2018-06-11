class SimulatorError extends Error {
    constructor(code, message) {
        super('SimulatorError', message);
        this.name = 'SimulatorError';
        this.code = code;
        this.message = message;
    }
}

module.exports = SimulatorError;