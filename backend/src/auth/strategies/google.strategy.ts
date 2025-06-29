import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';

export class GoogleStrategy extends Strategy {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
      passReqToCallback: true, 
    } as StrategyOptionsWithRequest, (req, accessToken, refreshToken, profile, done) => {
      done(null, profile);
    });
  }
}