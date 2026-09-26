const Groq = require("groq-sdk")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
const Listing = require("../models/listings.js")

module.exports.showChat = (req,res)=>{
    res.render("chatbox.ejs")
}

module.exports.startChat = async(req,res)=>{
    try {

        const { message } = req.body;


        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: `
                        text
                    You are Stayora AI, an Indian travel and accommodation search assistant.

                    Understand the user's message and return ONLY valid JSON.

                    There are two possible intents:

                    1. "chat"
                    Use this for greetings, casual conversation, thanks, or questions that do not require searching listings.

                    Format:
                    {
                    "intent": "chat",
                    "reply": "natural response to the user"
                    }

                    2. "search"
                    Use this when the user wants to find a Stayora listing.

                    Format:
                    {
                    "intent": "search",
                    "reply": {
                        "location": "...",
                        "country": "...",
                        "category": "...",
                        "minPrice": 0,
                        "maxPrice": 0
                    }
                    }

                    Available database fields:
                    - location
                    - country
                    - category
                    - price

                    Allowed categories:
                    "Trending", "Iconic", "Mountains", "Rooms", "Castles",
                    "Pools", "Camping", "Farms", "Arctic", "Domes", "Boats"

                    Rules:
                    - Return only fields relevant to the user's request.
                    - Never invent information.
                    - Do not return null or empty fields.
                    - For "under", "below", "less than", or "up to" → maxPrice.
                    - For "above", "over", "more than", or "at least" → minPrice.
                    - For "between X and Y" → minPrice and maxPrice.
                    - For location requests such as "in", "near", or "around", return the place as location.
                    - Use only the allowed category values.
                    - Do not return propertyType, amenities, guests, bedrooms, rating, or other fields.
                    - If the user says "near me" or "near my house" and their location is unknown, use "chat" and ask for their location.
                    - If a greeting also contains a search request, use "search".
                    - Return ONLY JSON. No markdown or explanation.
                    `
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });
        const Groqreply = completion.choices[0].message.content;
        
        const data = JSON.parse(Groqreply);

            if(data.intent ==="chat"){
                return res.render("listings/chatListings",{
                    message:data.reply,
                    listings:[]
                })
            }else{
                let filter = {}
                if(data.reply.minPrice){
                    filter.price = { $gt: data.reply.minPrice };
                    delete data.reply.minPrice;
                }

                if(data.reply.maxPrice){
                    filter.price = {
                        ...(filter.price || {}),
                        $lt: data.reply.maxPrice
                    };
                    delete data.reply.maxPrice;
                }
            
                filter = { ...filter, ...data.reply };
                let listings = await Listing.find(filter).limit(5)

                if (listings.length === 0) {
                    return res.render("listings/chatListings", {
                        message: "No listing found of your choice",
                        listings: []
                    });
                }
                return res.render("listings/chatListings", {
                    message: "I found these listings:",
                    listings
                });

            }
        }catch (error) {

        console.log(error);

        return res.status(500).render("listings/chatListings", {
            message: "Sorry, something went wrong.",
            listings: []
        });
    }
    
}