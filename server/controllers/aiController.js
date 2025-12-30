import ai from '../configs/ai.js';
import Resume from '../models/resume.js';

// controller for enhancing a resume's professional summary using AI
//POST /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const model = process.env.OPENAI_MODEL || 'gemini-2.5-flash';

        const response = await ai.chat.completions.create({
            model: model,
            messages: [
                { role: 'system', content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume to make it more impactful and appealing to potential employers. Improve clarity, conciseness, and overall presentation while maintaining the original intent." },
                { role: 'user', content: userContent }
            ],
        });
        const enhancedContent = response.choices[0].message.content;
        res.status(200).json({ enhancedContent });
    }
    catch (error) {
        res.status(400).json({ message: error.message});
    }
};

//controller for enhancing a resume's job description using AI
//POST /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const model = process.env.OPENAI_MODEL || 'gemini-2.5-flash';

        const response = await ai.chat.completions.create({
            model: model,
            messages: [
                { role: 'system', content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume to make it more impactful and appealing to potential employers. Improve clarity, conciseness, and overall presentation while maintaining the original intent." },
                { role: 'user', content: userContent }
            ],
        });
        const enhancedContent = response.choices[0].message.content;
        res.status(200).json({ enhancedContent });
    }
    catch (error) {
        res.status(400).json({ message: error.message});
    }
};

// controller for uploading a resume to the database
//POST /api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try {
        const {resumeText, title} = req.body;
        const userId = req.user.Id;

        if(!resumeText){
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        const userPrompt = `extract data from this resume: ${resumeText}
        Provide data in the following JSON format with no additional text before or after:
        {
        professional_summary: { type: String},
        skills: [{ type: String }],
        personal_info: {
            image: { type: String},
            full_name: { type: String},
            profession: { type: String},
            email: { type: String},
            phone: { type: String},
            location: { type: String},
            linkdin: { type: String},
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
        }
        `
        const model = process.env.OPENAI_MODEL || 'gemini-2.5-flash';
        const response = await ai.chat.completions.create({
            model: model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' }
        });
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({userId, title, ...parsedData})

        res.json({resumeId: newResume._id});
    }catch (error) {
        res.status(400).json({ message: error.message});
    }
};
