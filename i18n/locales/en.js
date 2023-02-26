const emotional = "emotional";
const behaviour = "behaviour";
const hyperactive = "hyperactive";
const communication = "communication";
const prosocial = "prosocial";

const en = {
  usernamemust: "Username must be at least 3 characters.",
  passeqpassrep: "Password and password repeat must be equal",
  enterpsych: "Enter the psychologist code",
  greeting: "Hello",
  tests: "Tests",
  diagnostic: "Diagnostic",
  mins: "5 mins",
  start: "Start",
  repeat: "Repeat",
  needhelp: "Need help?",
  talktoprof: "Talk to a professional💬",
  start: "Start",
  hotline: "Hot Line☎️",
  call: "Call",
  back: "Back",
  options: "Options",
  general: "General Checkup",
  username: "Username",
  passwordrep: "Пароль и повторный пароль должны иметь одинаковое значение",
  passchar: "Password must be at least 8 characters",
  user: "User",
  teacher: "Teacher👨‍🏫",
  psychologist: "Psychologist🧑‍⚕️",
  student: "Student🧑‍🎓",
  students: "Students🎓",
  checkprog: "Check progress",
  invite: "Invite students",
  birthday: "Birthday",
  password: "Password",
  signout: "Sign out",
  chooseanswer: "Choose an answer✨",
  finish: "Finish",
  next: "Next",
  pendingtests: "Pending tests✏️",
  sendbackup: "Send backup test",
  changepass: "Change password",
  newpass: "New password🔒",
  repeatnewpass: "Repeat new password",
  areusure: "Are you sure you want to change your password?",
  signin: "Sign in",
  signup: "Sign up",
  psychcode: "Psychologist code",
  repeatpass: "Repeat password",
  donthaveacc: "Don't have an account?",
  deleteacc: "Delete account",
  test: [
    {
      question:
        "I try to be nice to other people. I am attentive to their feelings",
      answers: ["Agree", "Partially agree", "Disagree"],
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I'm restless, I can't stay calm for long",
      answerWeight: [2, 1, 0],
      category: hyperactive,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I often have headaches, stomach pains and nausea",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I usually share with others (food, money, etc.)",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I get very angry, annoyed and lose my temper",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question:
        "I am usually alone. Most often I play alone and enjoy being by myself",
      answerWeight: [2, 1, 0],
      category: communication,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      answerWeight: [0, 1, 2],
      question: "I usually do what I'm told",
      category: behaviour,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I feel anxious on a regular basis",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I try to help if anyone is upset, offended or sick",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question:
        "I constantly fidget with my surroundings and can't stand still.",
      answerWeight: [2, 1, 0],
      category: hyperactive,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I have at least one good friend",
      answerWeight: [0, 1, 2],
      category: communication,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I fight a lot. I can make other people do what I want",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I often feel miserable, unhappy and dismotivated",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I am liked by my peers",
      answerWeight: [0, 1, 2],
      category: communication,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I am easily distracted and have difficulty concentrating",
      answerWeight: [2, 1, 0],
      category: hyperactive,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I get nervous in new surroundings, lose confidence easily",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I am kind to small kids",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I am often accused of lying and cheating",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "Others often tease me in uncomfortable ways",
      answerWeight: [2, 1, 0],
      category: communication,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question:
        "I often volunteer to help others (parents, teachers, children)",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I think before I act.",
      answerWeight: [0, 1, 2],
      category: hyperactive,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question:
        "I take the things of others without permission at home, school or other places",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question:
        "I have a better relationship with older people than people my age",
      answerWeight: [2, 1, 0],
      category: communication,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question: "I'm afraid of many things, I get scared easily",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Agree", "Partially agree", "Disagree"],
      question:
        "I complete the work that I started. I have a good attention span.",
      answerWeight: [0, 1, 2],
      category: hyperactive,
    },
  ],
  areudelete: "Are you sure you want to delete your account??",
};

export default en;
