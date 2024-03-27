import { useState } from "react";

function InputField( {label, type, value, onChange}) {
    return (
        <div>
            <label>
                {label}:
                <input
                type={type}
                value={value}
                onChange={onChange}
                required
                />
            </label>
        </div>
    );
}

function EducationInput({onAddEducation}) {
    const [schoolName, setSchoolName] = useState("")
    const [title, setTitle] = useState("")
    const [dateOfStudy, setDateOfStudy] = useState("");

    const handleAddEducation = () => {
        const id = schoolName + title + dateOfStudy;
        onAddEducation( { schoolName, title, dateOfStudy, id });
        setSchoolName("");
        setTitle("");
        setDateOfStudy("");
    }

    return (
        <div>
            <InputField 
            label="School Name " 
            type="text"
            value={schoolName}
            onChange={e => setSchoolName(e.target.value)}
            />
            <InputField 
            label="Subject Title " 
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
            <InputField
            label="Date of Study "
            type="date"
            value={dateOfStudy}
            onChange={e => setDateOfStudy(e.target.value)}
            />
            <button className="add-education" onClick={handleAddEducation}>Add Education</button>
        </div>
    )
}

function ExperienceInput( {onAddExperience} ) {
    const [companyName, setCompanyName] = useState("");
    const [positionTitle, setPositionTitle] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleAddExperience = () => {
        const id = companyName + positionTitle + responsibilities + startDate + endDate;
        onAddExperience( {companyName, positionTitle, responsibilities, startDate, endDate, id} )
        setCompanyName("");
        setPositionTitle("");
        setResponsibilities("");
        setStartDate("");
        setEndDate("");
    }


    return (
        <div>
            <InputField 
            label="Company Name " 
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            />
            <InputField 
            label="Position Title " 
            type="text"
            value={positionTitle}
            onChange={e => setPositionTitle(e.target.value)}
            />
            <label>Responsibilites:   
                <textarea
                    value={responsibilities}
                    onChange={e => setResponsibilities(e.target.value)}
                    rows={4}
                    cols={50}
                ></textarea>
            </label> 
            <InputField 
            label="Start Date " 
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            />
            <InputField 
            label="End Date " 
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            />
            <button className="add-experience" onClick={handleAddExperience}>Add Experience</button>
        </div>
    )
}

function Button( {className, text, onClick}) {
    return (
        <button className={className} onClick={onClick}>{text}</button>
    )
}

export { InputField, Button, EducationInput, ExperienceInput }

