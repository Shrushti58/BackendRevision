import express from 'express'
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/users.js';


configDotenv();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received Credentials:', username, password);
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Inccorect Username' })
        }
        const isPasswordMatch = user.password === password ? true : false;
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password' });
        }

    } catch (error) {
        return done(err);
    }
}))

app.use(passport.initialize());

import productRoutes from './routes/productRoutes.js'

app.use('/api/products',productRoutes);

app.get('/',passport.authenticate('local',{session:false}) ,(req, res) => {
    res.send("Server Working");
})

app.listen(3000, () => {
    console.log("Server Running");
})