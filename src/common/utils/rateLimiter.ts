import Bottleneck from 'bottleneck';
import { RateLimitExceededError } from '../handlers';
import { ENV } from '../config/env';

export class RateLimiter {
  limiter: Bottleneck;

  constructor(reservoir: number) {
    this.limiter = new Bottleneck({
      reservoir: reservoir,

      reservoirRefreshAmount: reservoir,
      reservoirRefreshInterval: 60 * 1000,
    });
  }

  async scheduleFnWithRejection<T>(task: () => Promise<T>): Promise<T> {
    const currentTokens = await this.limiter.incrementReservoir(-1);
    if (currentTokens < 0) {
      await this.limiter.incrementReservoir(1);
      throw new RateLimitExceededError();
    }

    try {
      return await task();
    } catch (err) {
      await this.limiter.incrementReservoir(1);
      throw err;
    }
  }
}
