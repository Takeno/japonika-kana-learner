const gtag = window.gtag || function gtag() {};

export function trackEvent(eventName: string, args?: Record<string, string>) {
  gtag('event', 'kana_quiz', {
    event_label: eventName,
    ...args,
  });
}
