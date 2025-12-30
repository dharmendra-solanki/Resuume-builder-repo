import mongoose  from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, default: " Untitled Resume"},
    public:{type: Boolean, default: false},
    template:{type: String , default: "classic"},
    accent_color: {type: String , default: "#3b82f6"},
    professional_summary: { type: String},
    skills: [{ type: String }],
    personal_info: {
        image: { type: String},
        full_name: { type: String},
        profession: { type: String},
        email: { type: String},
        phone: { type: String},
        location: { type: String},
        linkedin: { type: String, default: ""},
        website: { type: String},
    },
    experience: [{
        company: { type: String},
        position: { type: String},
        start_date: { type: String},
        end_date: { type: String},
        description: { type: String},
        is_current: { type: Boolean},
    }],
    projects: [{
        name: { type: String},
        type: { type: String},
        description: { type: String},
    }],
    education: [{
        institution: { type: String},
        degree: { type: String},
        field: { type: String},
        graduation_date: { type: String},
        gpa: { type: String},
    }],
}, { timestamps: true, minimize: false });

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;