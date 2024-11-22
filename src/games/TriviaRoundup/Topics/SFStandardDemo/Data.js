// Data.js
import {
    shuffleArray,
    getQuestionsForDate as getGameQuestionsForDate,
  } from "../../../utils/game";
  
  export const SF_STANDARD_DEMO_QUESTIONS = [
    {
      questions: [
        {
          id: "sfs-demo-1",
          question: "Why does Geoffrey Frye keep returning to camp near Fell and Lyon streets?",
          options: [
            "It's outside his childhood home",
            "It's near essential services",
            "Police rarely patrol there",
            "It has the best shelter from rain"
          ],
          correctAnswer: "It's outside his childhood home",
          category: "Human Interest",
          difficulty: 1,
          explanation: "This reflects the human connection to place and family, even in difficult circumstances"
        },
        {
          id: "sfs-demo-2",
          question: "Based on the articles, what seems to be San Francisco's biggest transit challenge?",
          options: [
            "Success doesn't equal sustainability",
            "Riders are abandoning the system",
            "Service quality is declining",
            "Operating costs are too high"
          ],
          correctAnswer: "Success doesn't equal sustainability",
          category: "Transit",
          difficulty: 2,
          explanation: "Muni has high satisfaction and recovering ridership, but faces severe funding issues"
        },
        {
          id: "sfs-demo-3",
          question: "What appears to be the most realistic solution for Muni's funding crisis?",
          options: [
            "Regional cooperation and local taxes",
            "Federal government bailout",
            "State emergency funding",
            "Increased fare revenue"
          ],
          correctAnswer: "Regional cooperation and local taxes",
          category: "Policy",
          difficulty: 3,
          explanation: "The articles suggest local solutions are needed with federal aid unlikely"
        },
        {
          id: "sfs-demo-4",
          question: "What makes Frye's case particularly challenging for city officials?",
          options: [
            "Family ties complicate enforcement",
            "He refuses all services",
            "His frequent arrests",
            "Neighbor complaints"
          ],
          correctAnswer: "Family ties complicate enforcement",
          category: "Social Issues",
          difficulty: 4,
          explanation: "The situation highlights the complexity of enforcement when someone has local connections"
        },
        {
          id: "sfs-demo-5",
          question: "What pattern emerges from the homeless enforcement data?",
          options: [
            "People return to familiar areas",
            "Arrests reduce camping",
            "Services are effective",
            "Enforcement is random"
          ],
          correctAnswer: "People return to familiar areas",
          category: "Data Analysis",
          difficulty: 5,
          explanation: "81% of rearrests occur within five blocks of the first citation"
        },
        {
          id: "sfs-demo-6",
          question: "How does Daniel Lurie's position on transportation reflect broader city politics?",
          options: [
            "Mixed stance on controversial issues",
            "Strongly pro-public transit",
            "Focus on car infrastructure",
            "Opposition to new taxes"
          ],
          correctAnswer: "Mixed stance on controversial issues",
          category: "Politics",
          difficulty: 6,
          explanation: "He opposed the Great Highway closure but supported transit funding measures"
        },
        {
          id: "sfs-demo-7",
          question: "What does Frye's mother's approach to his situation suggest about family responses to homelessness?",
          options: [
            "Balance of support and boundaries",
            "Complete tough love approach",
            "Unconditional assistance",
            "Total disconnection"
          ],
          correctAnswer: "Balance of support and boundaries",
          category: "Social Analysis",
          difficulty: 7,
          explanation: "She provides some support while maintaining household rules and accepting his choices"
        },
        {
          id: "sfs-demo-8",
          question: "Why might the Bay Bridge truck accident response reveal wider infrastructure challenges?",
          options: [
            "Vulnerability to single-point failures",
            "Poor emergency response",
            "Inadequate safety measures",
            "Aging infrastructure"
          ],
          correctAnswer: "Vulnerability to single-point failures",
          category: "Infrastructure",
          difficulty: 8,
          explanation: "One incident caused major regional disruption, showing system fragility"
        },
        {
          id: "sfs-demo-9",
          question: "What does the Republican Assembly leadership choice suggest about SF politics?",
          options: [
            "Growing political polarization",
            "Shift toward centrism",
            "Declining party influence",
            "Increased voter engagement"
          ],
          correctAnswer: "Growing political polarization",
          category: "Political Analysis",
          difficulty: 9,
          explanation: "The selection of a controversial figure contrasts with moderate Republican gains"
        },
        {
          id: "sfs-demo-10",
          question: "Based on all articles, what's the biggest challenge facing SF's new mayor?",
          options: [
            "Balancing competing crises with limited resources",
            "Improving public transportation",
            "Addressing homelessness",
            "Political opposition"
          ],
          correctAnswer: "Balancing competing crises with limited resources",
          category: "Governance",
          difficulty: 10,
          explanation: "Stories show interconnected challenges of transit funding, homelessness, and political divisions"
        }
      ]
    }
  ];
  
  // Get questions with shuffled options
  export const getQuestions = () => {
    return SF_STANDARD_DEMO_QUESTIONS[0].questions.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
  };
  
