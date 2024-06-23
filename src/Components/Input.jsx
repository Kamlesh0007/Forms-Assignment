// Input.js
import React from 'react';

function Input({ label, type, id, name, value, checked, onChange, onBlur, error, options }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === 'select' ? (
        <select id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} className={error ? 'error' : ''}>
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <div className="checkbox-group">
          {options.map((option) => (
            <label key={option}>
              <input type="checkbox" name={name} value={option} onChange={onChange} checked={ value && value.includes(option)} />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className={error ? 'error' : ''}
        />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Input;
