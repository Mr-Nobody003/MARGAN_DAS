import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const fullText = ` I'm always open to opportunities or collaborations. Let's build something amazing!`;
  const email = ' your.email@example.com ';

  const [typedText, setTypedText] = useState('');
  const [typedEmail, setTypedEmail] = useState('');

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const introInterval = setInterval(() => {
        setTypedText((prev) => prev + fullText[i]);
        i++;
        if (i === fullText.length) clearInterval(introInterval);
      }, 20);

      const emailDelay = fullText.length * 20 + 300;

      setTimeout(() => {
        let j = 0;
        const emailInterval = setInterval(() => {
          setTypedEmail((prev) => prev + email[j]);
          j++;
          if (j === email.length) clearInterval(emailInterval);
        }, 40);
      }, emailDelay);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-start min-h-screen py-24 px-4 sm:px-8 bg-black text-teal-400 font-mono text-center flex flex-col justify-center items-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 border-b border-teal-400 pb-2">
        Contact Me
      </h2>

      <p className="text-base sm:text-lg max-w-xl mx-auto mb-4 whitespace-pre-wrap text-teal-300">
        {typedText}
        {isInView && typedText.length < fullText.length && (
          <span className="animate-pulse text-teal-500">|</span>
        )}
      </p>

      <p className="text-lg sm:text-xl font-medium text-teal-200">
        {typedEmail}
        {isInView && typedEmail.length < email.length && (
          <span className="animate-pulse text-teal-500">|</span>
        )}
      </p>
    </section>
  );
};

export default Contact;
