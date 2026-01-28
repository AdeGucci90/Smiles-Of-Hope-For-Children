import emailjs from '@emailjs/browser';
import { LEAD_EMAIL } from '../constants';

// EmailJS configuration - Replace with your actual EmailJS credentials
// Get these from https://dashboard.emailjs.com/
const EMAILJS_CONFIG = {
  publicKey: 'u98xOCQKvqrVvKQnD', // Replace with your EmailJS Public Key
  serviceId: 'service_p2uw57q', // Replace with your EmailJS Service ID
};

export interface FormData {
  // Contact form fields
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
  
  // Join form fields
  full_name?: string;
  email_address?: string;
  area_of_interest?: string;
  about_yourself?: string;
  
  // Donate form fields
  first_name?: string;
  last_name?: string;
  email?: string;
  donation_purpose?: string;
  amount?: string;
}

export const sendContactForm = async (formData: FormData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: LEAD_EMAIL,
      from_name: formData.from_name || formData.full_name,
      from_email: formData.from_email || formData.email_address || formData.email,
      subject: formData.subject || 'New Contact Form Submission',
      message: formData.message || '',
      form_type: 'Contact Form',
      submission_date: new Date().toLocaleString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_contact',
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    
    console.log('Contact form email sent successfully:', response.status);
    return true;
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    return false;
  }
};

export const sendJoinForm = async (formData: FormData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: LEAD_EMAIL,
      from_name: formData.full_name,
      from_email: formData.email_address,
      subject: 'New Volunteer/Partner Application',
      area_of_interest: formData.area_of_interest || 'Not specified',
      about_yourself: formData.about_yourself || '',
      form_type: 'Join Form (Volunteer/Partner)',
      submission_date: new Date().toLocaleString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_join',
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    
    console.log('Join form email sent successfully:', response.status);
    return true;
  } catch (error) {
    console.error('Failed to send join form email:', error);
    return false;
  }
};

export const sendDonateForm = async (formData: FormData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: LEAD_EMAIL,
      from_name: `${formData.first_name || ''} ${formData.last_name || ''}`.trim(),
      from_email: formData.email,
      subject: 'New Donation Inquiry',
      donation_purpose: formData.donation_purpose || 'General Support',
      amount: formData.amount || 'Not specified',
      form_type: 'Donate Form',
      submission_date: new Date().toLocaleString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_donate',
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    
    console.log('Donate form email sent successfully:', response.status);
    return true;
  } catch (error) {
    console.error('Failed to send donate form email:', error);
    return false;
  }
};

export const initializeEmailJS = () => {
  // Initialize EmailJS with public key
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

