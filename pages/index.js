import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [subjectInput, setSubjectInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: subjectInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setMessages([...messages,
      { text: subjectInput, isUser: true },
      { text: data.result, isUser: false }
      ]);
      setSubjectInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Ask the deities</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <style jsx global>{`
         body{
             margin: 0px;
             padding: 0px;
         }
      `}</style>

      <main className={styles.main}>
        <h3>Ask the deities</h3>

        <div className={styles.chatContainer}>
          {messages.map((message) => {
            return message.text.split("\n").map((text, i) => {
              return text.length > 0 && (
                <div className={`${styles.chatMessage} ${message.isUser && styles.chatMessageRight}`} key={i}>
                  <div className={`${styles.chatBubble} ${message.isUser && styles.chatBubbleRight}`}>
                    <p key={i}>{text}</p>
                  </div>
                </div>
              )
            })
          })}
        </div>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Enter a subject, e.g. 'How great ninjas are', 'How to become a ninja', 'Ninja history', etc."
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <input type="submit" value="Ask" />
        </form>

      </main>
    </div>
  );
}
