export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class RateLimitExceededError extends Error {
  constructor(message: string = 'Rate limit exceeded. Try again later.') {
    super(message);
    this.name = 'RateLimitExceededError';
  }
}
