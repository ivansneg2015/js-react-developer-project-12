import leoProfanity from 'leo-profanity';

const filter = (text) => leoProfanity.clean(text);

export default filter;
