import mongoose from "mongoose";                         

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },                        
    language: { type: String, required: true }, // telugu / hindi / english
    type: { type: String, required: true },     // movie / music / webseries
    genre: { type: String, required: true },    // motivation / tragedy / comedy
    moodEffect: { type: String, required: true } // uplifting / calm / sad
});

const Content = mongoose.model("Content", ContentSchema);                         
export default Content