/* eslint-disable */
const express = require('express');
const Inquiry = require('../models/Inquiry');
const { sendAppointmentEmail } = require('../utils/sendAppointmentEmail.cjs');
const router = express.Router();

// Public POST new inquiry (from forms)
router.post('/', async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const inquiry = await newInquiry.save();

    // Send email only for appointments
    if (req.body?.type === 'appointment') {
      const { name, email, phone, country, date } = req.body;

      // EmailJS template will use these variables.
      const toEmail = email;

      // Non-blocking: don't fail the booking if email fails.
      const emailPayload = {
        toEmail,
        name,
        email,
        phone,
        country,
        appointmentDate: date,
      };

      // store email debug for admin troubleshooting
      Inquiry.findByIdAndUpdate(inquiry._id, {
        $set: {
          emailDebug: {
            type: 'appointment',
            success: undefined,
            at: new Date(),
            payload: emailPayload,
          },
        },
      }).catch(() => { });

      sendAppointmentEmail(emailPayload)
        .then((result) => {
          // sendAppointmentEmail returns { ok:true } on success, otherwise { ok:false, status, body, reason }
          if (!result?.ok) {
            console.warn('[appointment-email] failed:', result);

            // Helpful log: print missing config reason
            if (result?.reason === 'missing-config') {
              console.warn(
                '[appointment-email] Missing EmailJS env vars. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY.'
              );
            }
          }

          Inquiry.findByIdAndUpdate(inquiry._id, {
            $set: {
              emailDebug: {
                type: 'appointment',
                success: !!result?.ok,
                at: new Date(),
                payload: emailPayload,
                result: result?.ok ? { body: result.body } : result,
              },
            },
          }).catch(() => { });
        })
        .catch((err) => {
          console.warn('[appointment-email] exception:', err?.message || err);

          Inquiry.findByIdAndUpdate(inquiry._id, {
            $set: {
              emailDebug: {
                type: 'appointment',
                success: false,
                at: new Date(),
                payload: emailPayload,
                error: {
                  message: err?.message || String(err),
                },
              },
            },
          }).catch(() => { });
        });
    }

    res
      .status(201)
      .json({ message: 'Inquiry submitted successfully', id: inquiry._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


