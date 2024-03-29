'use client';
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const allGods = [
    'Jesus',
    'Deus Judaico',
    'Buda',
    'Krishna',
    'Maomé',
    'Brahma',
    'Olodumaré',
    'Arcturiano'
  ]
  const [subjectInput, setSubjectInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [gods, setGods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let godsAux = [];
    for (let i = 0; i < 4; i++) {
      let god = allGods[Math.floor(Math.random() * allGods.length)];
      if (!godsAux.includes(god)) godsAux.push(god);
      else i--;
    }
    setGods(godsAux);
  }, [])

  const scrollRef = useRef(null);

  const [fontSize, setFontSize] = useState(16);

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 2);
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  useEffect(() => {
    setMessages([{ text: 'Olá, como você gostaria de ser chamado?', isUser: false }]);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    let subject = subjectInput;
    let allMessages = [...messages]

    setMessages(() => [...messages, { text: subject, isUser: true }]);

    setSubjectInput("");

    setLoading(true);

    if (messages.length === 1) {
      setMessages((messages) => [...messages, { text: 'Agora, me fale mais, o que gostaria de saber?', isUser: false }])
    }

    else if (messages.length > 2) {
      for (let god of gods) {
        allMessages.push({ text: `${god}, ${subject}`, isUser: true });
        allMessages.push(await sendMessage(subject, god, allMessages));
      }
    }

    setLoading(false);

  }

  useEffect(() => scrollToBottom(), [messages]);

  function scrollToBottom() {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }

  async function sendMessage(subject, god, allMessages) {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: subject, god: god, messages: allMessages }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setMessages((messages) => [...messages, { text: data.result, isUser: false }]);

      return { text: data.result, isUser: false };

    } catch (error) {
      // TODO: handle error
      console.error(error);
      alert(error.message);

    }
  }

  const handleSelectGod = (god) => {
    if (gods.includes(god)) {
      setGods(gods.filter(g => g !== god))
    } else {
      setGods((gods) => [...gods, god])
    }
  }

  useEffect(() => { console.log(gods) }, [gods])

  return (
    <div>
      <Head>
        <title>Diviknown</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <style jsx global>{`
         body{
             margin: 0px;
             padding: 0px;
         }
      `}</style>

      <main className={styles.main}>
        <header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: "20px" }}>
            <div style={{ width: '120px' }}></div>
            <h1 style={{ margin: 0, textAlign: 'center', flex: 1 }}>Sabedoria Divina</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <button style={{ width: '40px', justifyContent: 'right' }} className={`${styles.godsButton} ${styles.godsButtonActive}`} onClick={decreaseFontSize}>-A</button>
              <button style={{ width: '40px', justifyContent: 'right' }} className={`${styles.godsButton} ${styles.godsButtonActive}`} onClick={resetFontSize}>A</button>
              <button style={{ width: '40px', justifyContent: 'right' }} className={`${styles.godsButton} ${styles.godsButtonActive}`} onClick={increaseFontSize}>+A</button>
            </div>
          </div>
          <h3>Quero conversar com...</h3>

          <div className={styles.godsContainer}>
            {allGods.map((god, i) => (
              <button keys={`${god}-${i}`}
                className={`${styles.godsButton} ${gods.includes(god) && styles.godsButtonActive}`}
                style={{ fontSize: `${fontSize}px` }}
                onClick={() => handleSelectGod(god)}>
                {god}
              </button>
            ))}
          </div>
        </header>

        <div className={styles.chatContainer} ref={scrollRef} >
          {messages.map((message, i) => (
            <div className={`${styles.chatMessage} ${message.isUser && styles.chatMessageRight}`} key={i}>
              <div className={`${styles.chatBubble} ${message.isUser && styles.chatBubbleRight}`}>
                <p key={i} style={{ fontSize: `${fontSize}px` }}>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {loading && <div className={styles.loading}>Loading...</div>}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Ex: Qual o sentido da vida? Minha vizinha está traindo o marido, devo avisar o marido?"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
            disabled={loading}
            style={{ fontSize: `${fontSize}px` }}
          />
          <input
            type="submit"
            disabled={loading || subjectInput.length === 0}
            value=">"
            style={{ fontSize: `${fontSize}px` }}
          />
        </form>
        {/* do buttons to add in the gods*/}


      </main >
    </div >
  );
}
