// Newsletter subscriber store
// In production, this would be stored in a database

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
  source: string;
}

// In-memory store (replace with database in production)
let subscribers: Subscriber[] = [
  {
    id: "1",
    email: "demo@example.com",
    subscribedAt: "2024-01-15T10:30:00Z",
    status: "active",
    source: "footer",
  },
];

export function getAllSubscribers(): Subscriber[] {
  return [...subscribers];
}

export function getActiveSubscribers(): Subscriber[] {
  return subscribers.filter((s) => s.status === "active");
}

export function addSubscriber(email: string, source: string = "footer"): Subscriber {
  const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
  
  if (existing) {
    // Reactivate if unsubscribed
    if (existing.status === "unsubscribed") {
      existing.status = "active";
      existing.subscribedAt = new Date().toISOString();
    }
    return existing;
  }

  const newSubscriber: Subscriber = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
    status: "active",
    source,
  };

  subscribers.push(newSubscriber);
  return newSubscriber;
}

export function unsubscribe(email: string): boolean {
  const subscriber = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (subscriber) {
    subscriber.status = "unsubscribed";
    return true;
  }
  return false;
}

export function deleteSubscriber(id: string): boolean {
  const index = subscribers.findIndex((s) => s.id === id);
  if (index !== -1) {
    subscribers.splice(index, 1);
    return true;
  }
  return false;
}

export function getSubscriberStats() {
  const total = subscribers.length;
  const active = subscribers.filter((s) => s.status === "active").length;
  const unsubscribed = subscribers.filter((s) => s.status === "unsubscribed").length;
  
  // Get signups in the last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentSignups = subscribers.filter(
    (s) => new Date(s.subscribedAt) > weekAgo && s.status === "active"
  ).length;

  return { total, active, unsubscribed, recentSignups };
}
