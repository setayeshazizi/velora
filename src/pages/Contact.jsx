import { useState } from 'react';
import { Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import FormInput from '../components/FormInput';
import Accordion from '../components/Accordion';
import Reveal from '../components/Reveal';
import { useToast } from '../context/ToastContext';

const faqs = [
  { title: 'How quickly do you respond?', content: <p>Our care team replies within one business day, Monday to Friday. For fit advice, include your usual size and the piece you are considering.</p> },
  { title: 'Can I change or cancel a demo order?', content: <p>This is a frontend demonstration, so no real orders are fulfilled. You can review every demo order from the Orders page at any time.</p> },
  { title: 'Do you offer repairs?', content: <p>In a real VELORA store, yes — we would rather repair a piece than replace it. Reach out with a photo and we will advise on the best repair path.</p> },
];

export default function Contact() {
  const { notify } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: 'General question', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Please write at least 10 characters.';
    if (Object.keys(next).length) { setErrors(next); return; }
    setSent(true);
    notify('Message received — thank you');
  };

  return (
    <div className="page contact-page">
      <header className="page__header">
        <p className="eyebrow">We are here</p>
        <h1 className="page__title">Contact the studio</h1>
        <p className="page__subtitle">Fit questions, care advice, or simply a hello — we read every message.</p>
      </header>

      <div className="contact-page__layout">
        <Reveal className="contact-page__form-wrap">
          {sent ? (
            <div className="contact-success" role="status">
              <CheckCircle2 size={34} strokeWidth={1.5} />
              <h2>Thank you, {form.name.split(' ')[0]}.</h2>
              <p>Your message about “{form.subject}” has been received. In this demo no email is sent, but in the real studio we would reply within one business day.</p>
              <button type="button" className="button button--outline" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General question', message: '' }); }}>Send another message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid form-grid--2">
                <FormInput label="Your name" value={form.name} onChange={update('name')} error={errors.name} autoComplete="name" required />
                <FormInput label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} autoComplete="email" required />
              </div>
              <FormInput label="Subject" as="select" value={form.subject} onChange={update('subject')}>
                {['General question', 'Fit & sizing', 'Order help', 'Care & repairs', 'Press & partnerships'].map((subject) => <option key={subject}>{subject}</option>)}
              </FormInput>
              <FormInput label="Message" as="textarea" rows={6} value={form.message} onChange={update('message')} error={errors.message} placeholder="Tell us how we can help…" required />
              <button type="submit" className="button button--primary button--large"><Send size={16} /> Send message</button>
            </form>
          )}
        </Reveal>

        <Reveal className="contact-page__aside" delay={100}>
          <div className="contact-info">
            <div className="contact-info__item"><Mail size={19} /><div><p className="contact-info__label">Email</p><a href="mailto:hello@velora.com">hello@velora.com</a></div></div>
            <div className="contact-info__item"><MapPin size={19} /><div><p className="contact-info__label">Studio</p><p>Studio 12, Studiestræde<br />Copenhagen, Denmark</p></div></div>
            <div className="contact-info__item"><Clock size={19} /><div><p className="contact-info__label">Hours</p><p>Monday – Friday, 9:00 – 17:00 CET<br />Replies within one business day</p></div></div>
          </div>
          <div className="contact-faq">
            <h2 className="contact-faq__title">Quick answers</h2>
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}