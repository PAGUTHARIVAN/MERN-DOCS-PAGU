import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
const initialForm = {
  name: "",
  email: "",
  phone: "",
  age: "",
  role: "",
  experience: "",
  coverLetter: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

export function JobApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [err, setErr] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  //useNavigate
  const navigate = useNavigate();

  //useRefs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const ageRef = useRef(null);
  const coverLetterRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const roleRef = useRef(null);
  const termsRef = useRef(null);

  //useEffect
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  //handleChanges
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErr({ ...err, [name]: "" });
  }

  function validate() {
    const newErrors = {};
    //nameErr
    if (!form.name.trim()) {
      newErrors.name = "Name required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name should be minimum 3 characters";
    }
    //emailErr
    if (!form.email.trim()) {
      newErrors.email = "Email required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Invalid Email, please enter valid email";
    }
    //phoneErr
    if (!form.phone.trim()) {
      newErrors.phone = "Phone required!";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = "Phone should be exactly 10 digits(Numbers only!)";
    }
    //ageErr
    if (!form.age.trim()) {
      newErrors.age = "Age required";
    } else if (Number(form.age) < 18 || Number(form.age) > 60) {
      newErrors.age = "Age should be 18 to 60";
    }
    //roleErr
    if (!form.role) {
      newErrors.role = "Role required";
    }
    //experienceErr
    if (!form.experience) {
      newErrors.experience = "Experience required";
    }
    //coverLetterErr
    if (!form.coverLetter.trim()) {
      newErrors.coverLetter = "CoverLetter required";
    } else if (form.coverLetter.trim().length > 150) {
      newErrors.coverLetter = "Maximum 150 characters";
    }
    //passwordErr
    if (!form.password.trim()) {
      newErrors.password = "Password required";
    } else if (form.password.trim().length < 8) {
      newErrors.password = "Password should be minimum 8 characters";
    }
    //confirmPasswordErr
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password required";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword =
        "Confirm Password does not match with previous one";
    }
    //Terms and conditions
    if (!form.terms) {
      newErrors.terms = "Terms and Conditions required";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErr(newErrors);

    const refs = {
      name: nameRef,
      email: emailRef,
      phone: phoneRef,
      age: ageRef,
      role: roleRef,
      coverLetter: coverLetterRef,
      password: passwordRef,
      confirmPassword: confirmPasswordRef,
      terms: termsRef,
    };

    const firstErrorKey = Object.keys(newErrors)[0];

    if (firstErrorKey) {
      refs[firstErrorKey]?.current?.focus();
      return;
    }

    console.log("Submitted:", form);
    navigate("/success", { replace: true, state: { name: form.name } });
    setForm(initialForm);
    setShowPassword(false);
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="form-container">
        <label>
          Name
          <input
            ref={nameRef}
            type="text"
            value={form.name}
            onChange={handleChange}
            name="name"
            placeholder="Add Name..."
            className="name-field"
          />
        </label>
        {err.name && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.name}</p>
        )}

        <label>
          Email
          <input
            ref={emailRef}
            type="email"
            value={form.email}
            onChange={handleChange}
            name="email"
            placeholder="Add Email..."
            className="email-field"
          />
        </label>
        {err.email && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.email}</p>
        )}

        <label>
          Phone
          <input
            ref={phoneRef}
            type="text"
            value={form.phone}
            onChange={handleChange}
            name="phone"
            placeholder="Add Phone..."
            className="phone-field"
          />
        </label>
        {err.phone && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.phone}</p>
        )}

        <label>
          Age
          <input
            ref={ageRef}
            type="number"
            value={form.age}
            onChange={handleChange}
            placeholder="Add Age..."
            name="age"
            className="age-field"
          />
        </label>
        {err.age && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.age}</p>
        )}

        <label>
          Role
          <select
            ref={roleRef}
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">--Select Role--</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
          </select>
        </label>
        {err.role && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.role}</p>
        )}

        <fieldset className="legend-field">
          <legend>Experience</legend>
          <label>
            <input
              type="radio"
              name="experience"
              value="Fresher"
              checked={form.experience === "Fresher"}
              onChange={handleChange}
            />
            Fresher
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value="1-2years"
              checked={form.experience === "1-2years"}
              onChange={handleChange}
            />
            1-2 years
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value="3+years"
              checked={form.experience === "3+years"}
              onChange={handleChange}
            />
            3+ years
          </label>
        </fieldset>
        {err.experience && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.experience}</p>
        )}

        <label>
          Cover Letter
          <textarea
            ref={coverLetterRef}
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            placeholder="Add Letter..."
          ></textarea>
          <span>{form.coverLetter.length}/150</span>
        </label>
        {err.coverLetter && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.coverLetter}</p>
        )}

        <label>
          Password
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Add Password..."
          />
        </label>
        {err.password && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.password}</p>
        )}

        <label>
          Confirm Password
          <input
            ref={confirmPasswordRef}
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Add Confirm Password..."
          />
        </label>
        {err.confirmPassword && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {err.confirmPassword}
          </p>
        )}
        <button
          type="button"
          onClick={togglePassword}
          className="show-hide-btn"
        >
          {showPassword ? "Hide" : "show"}
        </button>

        <label className="terms-label">
          <input
            className="agree-condition"
            ref={termsRef}
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          <span>Agree with Terms and Conditions</span>
        </label>

        {err.terms && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{err.terms}</p>
        )}

        <button type="submit" className="sub">
          Submit
        </button>
      </form>
    </>
  );
}
