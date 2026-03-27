import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';

const AccountChangePasswordTab = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required('Current password is required'),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least 1 number')
      .required('New password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Confirm password must match new password')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      try {
        await authService.changePassword(values.currentPassword, values.newPassword);
        
        toast.success('Password changed successfully!', {
          theme: 'colored',
        });
        
        resetForm();
      } catch (error) {
        toast.error(error.message || 'Failed to change password. Please try again.', {
          theme: 'colored',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formik.values.newPassword);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#dc3545', '#fd7e14', '#ffc107', '#20c997', '#198754'];

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="card common-card">
          <div className="card-body">
            <h6 className="loginRegister__title text-poppins">Password Change</h6>

            <div className="row gy-lg-4 gy-3">
              <div className="col-12">
                <label htmlFor="current-password" className="form-label">Current Password</label>
                <div className="position-relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className={`common-input ${
                      formik.touched.currentPassword && formik.errors.currentPassword ? 'is-invalid' : ''
                    }`}
                    placeholder="Current password"
                    id="current-password"
                    autoComplete="current-password"
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="password-show-hide password-toggle-btn"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                  >
                    <i className={`fas ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                  </button>
                </div>
                {formik.touched.currentPassword && formik.errors.currentPassword && (
                  <div className="text-danger mt-1">{formik.errors.currentPassword}</div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="new-password" className="form-label">New Password</label>
                <div className="position-relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className={`common-input ${
                      formik.touched.newPassword && formik.errors.newPassword ? 'is-invalid' : ''
                    }`}
                    placeholder="New password"
                    id="new-password"
                    autoComplete="new-password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="password-show-hide password-toggle-btn"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  >
                    <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                  </button>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-danger mt-1">{formik.errors.newPassword}</div>
                )}

                {formik.values.newPassword && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="text-muted">Password Strength</small>
                      <small style={{ color: strengthColors[passwordStrength] }}>
                        {strengthLabels[passwordStrength]}
                      </small>
                    </div>
                    <div className="progress" style={{ height: '4px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${(passwordStrength + 1) * 20}%`,
                          backgroundColor: strengthColors[passwordStrength],
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <small className="text-muted d-block mb-2">Password requirements:</small>
                  <ul className="list-unstyled mb-0">
                    <li className="small">
                      <i className={`fas ${formik.values.newPassword.length >= 8 ? 'fa-check text-success' : 'fa-circle text-muted'} me-2`}></i>
                      At least 8 characters
                    </li>
                    <li className="small">
                      <i className={`fas ${/[A-Z]/.test(formik.values.newPassword) ? 'fa-check text-success' : 'fa-circle text-muted'} me-2`}></i>
                      At least 1 uppercase letter
                    </li>
                    <li className="small">
                      <i className={`fas ${/[0-9]/.test(formik.values.newPassword) ? 'fa-check text-success' : 'fa-circle text-muted'} me-2`}></i>
                      At least 1 number
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`common-input ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                    placeholder="Confirm password"
                    id="confirm-password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="password-show-hide password-toggle-btn"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                  </button>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="text-danger mt-1">{formik.errors.confirmPassword}</div>
                )}
              </div>

              <div className="col-12">
                <button 
                  type="submit" 
                  className="btn btn-main w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving Changes...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountChangePasswordTab;
