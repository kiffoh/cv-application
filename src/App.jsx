import { useState } from 'react';
import { EducationInput, InputField, ExperienceInput } from './InputField';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generalArray, setGeneralArray] = useState({});
  const [educationArray, setEducationArray] = useState([]);
  const [experienceArray, setExperienceArray] = useState([]);

  const [generalEditMode, setGeneralEditMode] = useState(true);
  const [educationEditMode, setEducationEditMode] = useState(true);
  const [experienceEditMode, setExperienceEditMode] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const handleAdd = (item, arraySetter) => {
    arraySetter(prevArray => [...prevArray, item]);
  };

  const handleRemove = (id, arraySetter) => {
    arraySetter(prevArray => prevArray.filter(item => item.id !== id));
  };

  const handleEdit = (id, arraySetter) => {
    // arraySetter.id
    handleRemove(id, arraySetter);
  }

  function saveInformation() {
    if (nameValid && emailValid && phoneValid) {
      setGeneralArray({name, email, phoneNumber});
      setGeneralEditMode(false);
    } else {
      alert("Please fill in all required fields in the correct format.");
    }
  }

  const toggleEditMode = (arraySetter) => {
    arraySetter(prevMode => !prevMode);
    
    /*
    if (!generalEditMode) {
      setName(generalArray.name);
      setEmail(generalArray.email);
      setPhoneNumber(generalArray.phoneNumber)
    }
    */
  }

  const allSectionsComplete = () => {
    return !generalEditMode && !educationEditMode && !experienceEditMode
  }

  const handleSubmission = () => {
    setSubmitted(true);
    console.log("SUBMITTED")
  } 

  // Validation functions
  const validateName = (value) => {
    setName(value);
    setNameValid(value.trim() !== '');
  }

  const validateEmail = (value) => {
    setEmail(value);
    // Simple email validation, you can enhance it further
    setEmailValid(value.trim() !== '' && value.includes('@'));
  }

  const validatePhoneNumber = (value) => {
    setPhoneNumber(value);
    // Simple phone number validation, you can enhance it further
    setPhoneValid(value.trim() !== '');
  }

  return (
    <div>
      {submitted ? (
          <div>
          <h1 className='submitted'>Submitted information</h1>
          <h2 className="general-information">General Information</h2>
          <div>
            <p>Name: {generalArray.name}</p>
            <p>Email: {generalArray.email}</p>
            <p>Phone Number: {generalArray.phoneNumber}</p>
          </div>
          <h2 className="education-information">Educational Information</h2>
          <>
            {educationArray.map(education => (
                <div className="education-div" key={education.id}>
                  <p>School Name: {education.schoolName}</p>
                  <p>Subject Title: {education.title}</p>
                  <p>Date Of Study: {education.dateOfStudy}</p>
                </div>
              ))}
          </>
          <h2 className="experience-information">Previous Experience</h2>
          <div>
            {experienceArray.map(experience => (
              <div className="education-div" key={experience.id}>
                <p>Company Name: {experience.companyName}</p>
                <p>Position Title: {experience.positionTitle}</p>
                <p className='responsibilities-HTML-text'>Responsibilities:<br />{experience.responsibilities}</p>
                <p>Start Date: {experience.startDate}</p>
                <p>End Date: {experience.endDate}</p>
              </div>
            ))}
          </div>
        </div>
    ) : ( 
        <div>
          <h1 className='title'>CV Application</h1>
          <p>Please save each section after you have completed it! Once all sections are saved, the submit button will activated.</p>
          <h2 className="general-information">General Information</h2>
          {generalEditMode ? (
            <>
            <InputField
              label="Name "
              type="text"
              value={name}
              onChange={e => validateName(e.target.value)}
            />
            <InputField
              label="Email "
              type="email"
              value={email}
              onChange={e => validateEmail(e.target.value)}
            />
            <InputField
              label="Phone Number "
              type="tel"
              value={phoneNumber}
              onChange={e => validatePhoneNumber(e.target.value)}
            />
            <button className='save-edit-btn' onClick={() => saveInformation()}>Save</button>
          </>
          ) : (
            <div>
              <p>Name: {generalArray.name}</p>
              <p>Email: {generalArray.email}</p>
              <p>Phone Number: {generalArray.phoneNumber}</p>
              <button
                className="save-edit-btn"
                onClick={() => toggleEditMode(setGeneralEditMode)}
              >
                Edit
              </button>
            </div>
          )}
          <h2 className="education-information">Educational Information</h2>
          {educationEditMode ? (
            <>
              <div>
                {educationArray.map(education => (
                  <div className="education-div" key={education.id}>
                    <p>School Name: {education.schoolName}</p>
                    <p>Subject Title: {education.title}</p>
                    <p>Date Of Study: {education.dateOfStudy}</p>
                    <button
                      className="edit-education"
                      onClick={() => handleRemove(education.id, setEducationArray)}
                    >
                      Edit Above
                    </button>
                    <button
                      className="remove-education"
                      onClick={() => handleRemove(education.id, setEducationArray)}
                    >
                      Delete Above
                    </button>
                  </div>
                ))}
              </div>
              <EducationInput onAddEducation={(education) => handleAdd(education, setEducationArray)} />
              <button className='save-edit-btn' onClick={() => toggleEditMode(setEducationEditMode)}>Save</button>
            </> ) : (
              <>
                {educationArray.map(education => (
                    <div className="education-div" key={education.id}>
                      <p>School Name: {education.schoolName}</p>
                      <p>Subject Title: {education.title}</p>
                      <p>Date Of Study: {education.dateOfStudy}</p>
                    </div>
                  ))}
                <button className='save-edit-btn' onClick={() => toggleEditMode(setEducationEditMode)}>Edit</button>

              </>
            )}
          <h2 className="experience-information">Previous Experience</h2>
          { experienceEditMode ? (
            <>
              <div>
              {experienceArray.map(experience => (
                <div className="education-div" key={experience.id}>
                  <p>Company Name: {experience.companyName}</p>
                  <p>Position Title: {experience.positionTitle}</p>
                  <p>Responsibilites: {experience.responsibilities}</p>
                  <p>Start Date: {experience.startDate}</p>
                  <p>End Date: {experience.endDate}</p>
                  <button
                    className="edit-education"
                    onClick={() => handleEdit(experience.id, setExperienceArray)}
                  >
                    Edit Above
                  </button>
                  <button
                    className="remove-education"
                    onClick={() => handleRemove(experience.id, setExperienceArray)}
                  >
                    Delete Above
                  </button>
                </div>
              ))}
              </div>
              <ExperienceInput onAddExperience={(experience) => handleAdd(experience, setExperienceArray)} />
              <button className='save-edit-btn' onClick={() => toggleEditMode(setExperienceEditMode)}>Save</button>
            </>
          ) : (
            <>
              <div>
              {experienceArray.map(experience => (
                <div className="education-div" key={experience.id}>
                  <p>Company Name: {experience.companyName}</p>
                  <p>Position Title: {experience.positionTitle}</p>
                  <p className='responsibilities-HTML-text'>Responsibilities:<br />{experience.responsibilities}</p>
                  <p>Start Date: {experience.startDate}</p>
                  <p>End Date: {experience.endDate}</p>
                </div>
              ))}
              <button className='save-edit-btn' onClick={() => toggleEditMode(setExperienceEditMode)}>Edit</button>
              </div>
            </>
          )}
          <div className='submit-btn-container'>
            <button className="submit-form-btn" onClick={handleSubmission} disabled={!allSectionsComplete()}>
              Submit
            </button>
          </div>
        </div> )}
    </div>
  );
}

export default App;
