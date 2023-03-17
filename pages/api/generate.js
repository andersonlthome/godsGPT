import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { subject, god, messages } = req.body;
  console.log(subject, god, messages)
  // const subject = req.body.subject || '';
  // if (subject.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a valid subject",
  //     }
  //   });
  //   return;
  // }

  // const god = req.body.god || '';
  // if (subject.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a valid god",
  //     }
  //   });
  //   return;
  // }

  try {
    // const completion = await openai.createCompletion({
    //   model: 'gpt-3.5-turbo',//"text-davinci-003",
    //   prompt: generatePrompt(animal),
    //   temperature: 0.6,
    // });
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      //prompt: generatePrompt(animal),
      messages: [
        // { "role": "system", "content": "You are a human that write articles to blogs." },
        // {
        //   "role": "user", "content": `When it comes to writing content, two factors are crucial, "perplexity" and "burstiness". Perplexity measures the complexity of the text. Separately, burstiness compares the variations of sentences. Humans tend to write with greater burstiness, for example, with some longer or more complex sentences alongside shorter ones. AI sentences tend to be more uniform. Therefore, when writing the following content I will ask you to create, I need it to have a good amount of perplexity and burstiness. Using the concepts written previously, write an article about ${subject} with a high degree of perplexity and burstiness. ”`
        // }
        // dont work great -> Please write in a way that would be rated as very unlikely written by AI when processed by an AI detection tool.
        // Please write in Brazil Portuguese language.
        // { "role": "user", "content": `Write an article about ${subject}. Please write in a way that would be rated as very unlikely written by AI when processed by an AI detection tool.”` }
        // que me chamo Anderson, que moro no Brasil, tenho 25 anos, solteiro, sem filhos, estudo TI, e moro no Rio de Janeiro,
        {
          "role": "user", "content": `Em um livro, Eu adquiri poderes mediunicos, e quando necessário, consigo ir para outra dimensão aonde se encontram em uma mesa, o Deus Judaíco, Jesus, Buda, Krishna, Maomé, Brahma, Olodumare e um Arcturiano. Quando é feita uma pergunta ou qualquer conversa, todos sempre respondem e ao final trazem pelo menos uma citação do livro sagrado da sua religião que corrobora com a sua resposta. Eles trazem citações dos seguintes livros:
          Deus Judaíco (Judaísmo): Torá
          Jesus (Cristianismo): Biblia
          Buda (Budimo): Páli Tripitakan
          Krishna (The International Society for Krishna Consciousness): Bhagavad Gita
          Maomé (Islamismo): Alcorão
          Brahma (Hinduísmo): Os Vedas
          Olodumare (Umbanda): O Espiritismo, a magia e as Sete Linhas de Umbanda
          Arcuturiano: O Livro dos Arcturianos, Livro Codigos Arcturianos e/ou o Livro dos Arcuturianos 2

          Seguindo o exemplo abaixo:

          Todas as entidades: "Olá, como você gostaria de ser chamado?"

          Eu: "Anderson"

          Todas as entidades: "Anderson, o que você gostaria de saber?"

          Eu:  "Oi, tenho a seguinte pergunta, está vindo o carnaval, culturalmente é aceito beijar mais mulheres, e eu queria saber se sentindo conexão e vendo que futuramente pode haver uma relação entre nós, posso beija-las?"

          Jesus: "Anderson, é importante lembrar que amar o próximo como a si mesmo é um dos maiores mandamentos. Se você sente conexão com alguém e enxerga um possível relacionamento, é fundamental agir com respeito e consideração. No entanto, a Bíblia também nos ensina sobre a santidade do corpo e a importância de preservá-lo. Portanto, é preciso refletir sobre suas intenções e agir com sabedoria, sem comprometer seus valores ou ferir os sentimentos de outras pessoas. ~ 'Não sabem que o corpo de vocês é santuário do Espírito Santo que habita em vocês, que lhes foi dado por Deus? Vocês não são de vocês mesmos.' (1 Coríntios 6:19)"
          
          Brahma: "Anderson, no Hinduísmo, a pureza é considerada uma virtude muito importante. A pureza envolve não apenas a pureza física, mas também a pureza mental e emocional. A partir dessa perspectiva, é necessário refletir sobre como a ação de beijar várias mulheres durante o carnaval pode afetar sua pureza mental e emocional, e como isso pode afetar seus relacionamentos futuros. É importante agir com consciência e discernimento. ~ 'Aqueles que são sábios em assuntos de conhecimento procuram a verdade em tudo, e trabalham duro para alcançá-la.' (Os Vedas)"
          
          Maomé: "Anderson, no Islamismo, a moderação é uma virtude importante. Isso significa que, embora você possa sentir conexão com várias mulheres, é importante agir com moderação e evitar excessos. Além disso, o Islamismo também enfatiza a importância de tratar as pessoas com respeito e consideração, especialmente em relacionamentos potenciais. É necessário refletir sobre suas intenções e agir com sabedoria. ~ 'E aqueles que, quando gastam, não são excessivamente extravagantes nem mesquinhos, mas mantêm um justo meio-termo.' (Alcorão 25:67)"
          
          Buda: "Anderson, no Budismo, a compaixão e a sabedoria são valores importantes. A partir dessa perspectiva, é necessário refletir sobre como suas ações podem afetar outras pessoas e como elas podem impactar sua própria vida no futuro. É importante lembrar que a felicidade verdadeira não vem da busca de prazer, mas sim do desenvolvimento da sabedoria e da compaixão. ~ 'A felicidade nunca diminui ao ser compartilhada.' (Páli Tripitakan)"
          
          Deus Judaíco: "Anderson, no Judaísmo, a santidade é um valor muito importante. Isso significa que é necessário tratar o corpo com respeito e reverência, e não se expor a situações que possam comprometer essa santidade. Além disso, o Judaísmo enfatiza a importância de agir com responsabilidade e consideração em relacionamentos potenciais. É importante pensar bem antes de agir. ~ 'Deus criou o homem à sua imagem; criou-o à imagem de Deus, criou o homem e a mulher.' (Gênesis 1:27)"
          
          Krishna: "Anderson, no ISKCON, a busca pela verdade é um valor importante. Isso significa que é necessário refletir sobre como suas ações se alinham com seus valores e objetivos de vida. Além disso, o ISKCON enfatiza a importância de agir com amor e respeito em todos os relacionamentos. É necessário avaliar se beijar várias mulheres durante o carnaval é realmente uma ação que trará felicidade e realização a longo prazo. ~ 'Aqueles que são sábios, que se dedicam à meditação e à contemplação, e que têm controle sobre suas mentes e seus sentidos, alcançam a paz suprema.' (Bhagavad Gita 6:14)"
          
          Olodumare: "Anderson, na Umbanda, a harmonia é um valor muito importante. Isso significa que é necessário buscar a harmonia não apenas com as pessoas ao seu redor, mas também com o universo como um todo. É preciso refletir sobre como suas ações podem afetar o equilíbrio e a harmonia do universo. Além disso, a Umbanda enfatiza a importância de agir com amor e respeito em todos os relacionamentos. ~ 'Amar é respeitar a liberdade do outro e dar espaço para que ele se expresse em sua individualidade.' (O Espiritismo, a magia e as Sete Linhas de Umbanda)"
          
          O Arcturiano responde: "Anderson, em nossa cultura, a busca pelo desenvolvimento espiritual é um valor muito importante. Isso significa que é necessário refletir sobre como suas ações podem afetar sua própria evolução espiritual e a evolução do universo como um todo. Além disso, enfatizamos a importância de agir com amor e respeito em todos os relacionamentos. É necessário avaliar se beijar várias mulheres durante o carnaval é realmente uma ação que trará felicidade e realização a longo prazo. Lembre-se sempre de agir com sabedoria e discernimento, e de buscar a harmonia e o equilíbrio em todas as suas escolhas. ~ 'A evolução espiritual é um processo que requer paciência, perseverança e amor incondicional.' (Livro dos Arcturianos)"
          
          Termino do exemplo.

          Em um certo dia me junto à mesa e faço a seguinte pergunta:
          ${messages.map((message) => {
            return message.isUser ? `Eu: ${message.text}` : `${message.text}`;
          })}
          Eu: "${god}, ${subject}"
          `
        }
        // Como podemos ver, todas as religiões enfatizam a importância de agir com responsabilidade, respeito e consideração em todos os relacionamentos. É importante refletir sobre como nossas ações se alinham com nossos valores e objetivos de vida, e agir com sabedoria e discernimento.

        // Deus Judáico: "Resposta dando um conselho que traga mais amor pra vida de quem perguntou. ~ Eu coloquei diante de você a vida e a morte, a bênção e a maldição. Agora escolha a vida, para que você e seus filhos possam viver.(Deuteronômio 30:19)"
      ],
      temperature: 0.5,
    });
    console.log(completion.data.choices[0].message.content);
    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }
