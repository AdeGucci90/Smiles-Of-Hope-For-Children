# Email Form Implementation Plan

## Forms Updated:
1. ~~ContactPage.tsx~~ - Contact form
2. ~~JoinPage.tsx~~ - Volunteer signup form  
3. ~~DonatePage.tsx~~ - Donation support form

## Steps Completed:
- [x] Install EmailJS package
- [x] Create emailService.ts utility
- [x] Update ContactPage.tsx with EmailJS integration
- [x] Update JoinPage.tsx with EmailJS integration
- [x] Update DonatePage.tsx with EmailJS integration

## Next Steps - Required Setup:
1. Create free account at https://www.emailjs.com/
2. Add EmailJS service (Gmail or SMTP)
3. Create 3 email templates:
   - template_contact
   - template_join
   - template_donate
4. Update services/emailService.ts with your credentials:
   - Replace 'YOUR_EMAILJS_PUBLIC_KEY' with your actual Public Key
   - Replace 'YOUR_EMAILJS_SERVICE_ID' with your actual Service ID
5. Test the forms

