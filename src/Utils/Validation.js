  // validateEventRegistrationForm
export const validateEventRegistrationForm = (values) => {
    let errors = {};
  
    if (!values.name) {
      errors.name = 'Name is required';
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!values.age) {
      errors.age = 'Age is required';
    } else if (isNaN(values.age) || Number(values.age) <= 0) {
      errors.age = 'Age must be a positive number';
    }
  
    if (values.hasGuest && !values.guestName) {
        errors.guestName = "Guest name is required when bringing a guest";
      }
  
    return errors;
  };


  // validateJobApplicationForm
export const validateJobApplicationForm = (values) => {
    const errors = {};
  
    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number is invalid';
    }
  
    if (values.applyingFor === 'Developer' || values.applyingFor === 'Designer') {
      if (!values.relevantExperience) {
        errors.relevantExperience = 'Relevant Experience is required';
      } else if (isNaN(values.relevantExperience) || values.relevantExperience <= 0) {
        errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
      }
    }
  
    if (values.applyingFor === 'Designer' && !values.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required';
    } else if (values.applyingFor === 'Designer' && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioUrl)) {
      errors.portfolioUrl = 'Portfolio URL is invalid';
    }
  
    if (values.applyingFor === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
  
    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
  
    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }
  
    return errors;
  };
  
  // validateSurveyForm
  export const validateSurveyForm = (values) => {
    const errors = {};
  
    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!values.surveyTopic) {
      errors.surveyTopic = 'Survey Topic is required';
    }
  
    if (values.surveyTopic === 'Technology') {
      if (!values.favoriteProgrammingLanguage) {
        errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      }
      if (!values.yearsOfExperience) {
        errors.yearsOfExperience = 'Years of Experience is required';
      } else if (values.yearsOfExperience <= 0) {
        errors.yearsOfExperience = 'Years of Experience must be greater than 0';
      }
    }
  
    if (values.surveyTopic === 'Health') {
      if (!values.exerciseFrequency) {
        errors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!values.dietPreference) {
        errors.dietPreference = 'Diet Preference is required';
      }
    }
  
    if (values.surveyTopic === 'Education') {
      if (!values.highestQualification) {
        errors.highestQualification = 'Highest Qualification is required';
      }
      if (!values.fieldOfStudy) {
        errors.fieldOfStudy = 'Field of Study is required';
      }
    }
  
    if (!values.feedback) {
      errors.feedback = 'Feedback is required';
    } else if (values.feedback.length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters long';
    }
  
    return errors;
  };
  