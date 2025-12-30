import Resume from "../models/resume.js";
import fs from "fs";
import imageKit from "../configs/imageKit.js";

//controller for creating a new resume
//POST: /api/resumes/create
export const createResume = async (req, res)=>{
    try {
        const userId = req.userId;
        const {title} = req.body;

        // create new resume
        const newResume = await Resume.create({userId,title});

        // return success message
        return res.status(201).json({message: "Resume created successfully", resume: newResume});
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
};

//controller for delete a resume
//DELETE: /api/resumes/delete

export const deleteResume = async (req, res)=>{
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        await Resume.findOneAndDelete({ _id: resumeId, userId});

        // return success message
        return res.status(201).json({message: "Resume deleted successfully"});
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
};

//get user resume by id
//GET: /api/resumes/get

export const getResumeById = async (req, res)=>{
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        const resume = await Resume.findOne({ _id: resumeId, userId});
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        // return success message
        return res.status(200).json({resume});
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
};

//get resume by id public
//GET: /api/resumes/public
export const getPublicResumeById = async (req, res)=>{
    try {
        const {resumeId} = req.params;

        const resume = await Resume.findOne({ _id: resumeId, isPublic: true});
        if(!resume){
            return res.status(404).json({message: "Resume not found or not public"});
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        // return success message
        return res.status(200).json({resume});
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
};


//controller for updating a resume
//PUT: /api/resumes/update
export const updateResume = async (req, res)=>{
    try {
        const userId = req.userId;
        const {resumeId, resumeData, removeBackground} = req.body;
        const image = req.file;

        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = await JSON.parse(resumeData)
        }else{
            resumeDataCopy = structuredClone(resumeData)
        }

        if(image){
            const imageBufferData = fs.createReadStream(image.path);
            //upload image to imagekit
            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation:{
                    pre: 'w-300, h-300, fo-face,  z-0.75' + (removeBackground ? ', e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url;
        }

        const resume = await Resume.findByIdAndUpdate({
            _id: resumeId,
            userId
        }, resumeDataCopy, {new: true}); 

        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }
        // return success message
        return res.status(200).json({message: "Resume updated successfully", resume});
    }
    catch (error) {
        return res.status(400).json({message: error.message});
    }
};