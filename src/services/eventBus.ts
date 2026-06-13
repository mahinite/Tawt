/**
 * A framework-agnostic Event Bus implementation.
 * Used for domain layer events (like timer session completion) 
 * to broadcast to decoupled systems (like task trackers)
 * without direct imports or UI layer constraints.
 */

export type EventCallback<T = any> = (payload: T) => void;

class EventBus {
  private subscriptions: Map<string, Set<EventCallback>> = new Map();

  /**
   * Subscribes to an event type. Returns an unsubscribe function.
   */
  public subscribe<T>(eventType: string, callback: EventCallback<T>): () => void {
    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, new Set());
    }
    
    const subs = this.subscriptions.get(eventType)!;
    subs.add(callback as EventCallback);

    return () => {
      const currentSubs = this.subscriptions.get(eventType);
      if (currentSubs) {
        currentSubs.delete(callback as EventCallback);
      }
    };
  }

  /**
   * Emits an event with the given payload to all active subscribers.
   */
  public emit<T>(eventType: string, payload?: T): void {
    const subs = this.subscriptions.get(eventType);
    console.log("EVENT EMITTED:", eventType, payload);
    console.log("SUBSCRIBERS COUNT:", subs?.size);
    if (subs) {
      // Create a shallow copy to prevent mutation issues during iteration
      Array.from(subs).forEach((callback) => {
        try {
          callback(payload);
        } catch (err) {
          console.error(`Error in event stream for ${eventType}:`, err);
        }
      });
    }
  }
}

const globalAny = globalThis as any;
if (!globalAny.__tawtEventBus) {
  globalAny.__tawtEventBus = new EventBus();
}
export const eventBus: EventBus = globalAny.__tawtEventBus;
