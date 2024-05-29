import leoProfanity from 'leo-profanity';

export const filter = (text) => leoProfanity.clean(text);