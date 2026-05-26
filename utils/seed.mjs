import { userModel } from '../models/index.mjs';

export const seedUser = async () => {
    const user = await userModel.findOne({
        email: "user@gmail.com"
    });

    if (!user) {
        await userModel.create({
            firstName: "User",
            lastName: "User",
            email: "user@gmail.com",
            // password: User@1234, hashed using bcrypt with 12 rounds
            password: "$2a$12$X5LBb19Fhb8kTvRhX7YkHe9bCFgqJU31lPXfyF7pq/mrBZyfdZrci",
        });
    }

    console.log("User seeded");
    console.log("Email: user@gmail.com");
    console.log("Password: User@1234");

}