import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const fullText =
    "I'm always open to opportunities or collaborations. Let's build something amazing!";
  const email = "margandas03@gmail.com";

  const [typedText, setTypedText] = useState("");
  const [typedEmail, setTypedEmail] = useState("");

  useEffect(() => {
    if (!isInView) return;

    let textIndex = 0;
    let emailIndex = 0;

    const textInterval = setInterval(() => {
      setTypedText(fullText.slice(0, textIndex + 1));
      textIndex++;
      if (textIndex === fullText.length) clearInterval(textInterval);
    }, 20);

    const emailDelay = fullText.length * 20 + 300;

    const emailTimeout = setTimeout(() => {
      const emailInterval = setInterval(() => {
        setTypedEmail(email.slice(0, emailIndex + 1));
        emailIndex++;
        if (emailIndex === email.length) clearInterval(emailInterval);
      }, 40);
    }, emailDelay);

    return () => {
      clearInterval(textInterval);
      clearTimeout(emailTimeout);
    };
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
