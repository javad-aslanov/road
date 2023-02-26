const emotional = "emotional";
const behaviour = "behaviour";
const hyperactive = "hyperactive";
const communication = "communication";
const prosocial = "prosocial";

const az = {
  greeting: "Salam",
  tests: "Testlər",
  diagnostic: "Diaqnositka",
  mins: "5 dəq",
  repeat: "Yenidən",
  start: "Başla",
  call: "Zəng et",
  back: "Arxaya",
  options: "Seçimlər",
  general: "Ümumi Müayinə",
  passwordrep: "Parol və parolun təkrarı eyni dəyərə malik olmalıdır",
  passchar: "Şifrə ən azı 8 simvoldan ibarət olmalıdır",
  donthaveacc: "Hesabın yoxdur?",
  usernamemust: "İstifadəçi adı ən azı 3 simvoldan ibarət olmalıdır.",
  passeqpassrep: "Parol və parolun təkrarı bərabər olmalıdır",
  enterpsych: "Psixoloq kodunu daxil edin",
  students: "Tələbələr",
  checkprog: "Məlumatları yoxlayın",
  invite: "Tələbələri dəvət et",
  invitestudents: "Tələbələri dəvət et",
  douneedhelp: "Yardıma ehtiyac varmı?",
  needhelp: "Yardıma ehtiyac varmı?",
  pleasetakeit:
    "Təcrübənizi sizin üçün fərdiləşdirməyə kömək etmək üçün bunu götürün",
  username: "İstifadəçi adı",
  user: "İstifadəçi",
  teacher: "Müəllim👨‍🏫",
  psychologist: "Psixoloq🧑‍⚕️",
  student: "Tələbə🧑‍🎓",
  birthday: "Ad günü",
  password: "Şifrə",
  signout: "Çıxış",

  nochatsyet: "Hələ söhbət yoxdur...",
  name: "Ad",

  chooseanaswer: "Cavab seçin✨",
  finish: "Bitir",
  next: "Növbəti",
  pendingtest: "Gözləyən testlər✏️",
  sendbackup: "Ehtiyat testi göndər",

  changepass: "Parolu dəyişdir",
  newpass: "Yeni parol🔒",
  repeatnewpass: "Yeni parolu təkrarlayın",
  areusure: "Şifrənizi dəyişmək istədiyinizə əminsiniz?",
  deleteacc: "Hesabı sil",
  areudelete: "Hesabınızı silmək istədiyinizə əminsiniz?",
  signin: "Daxil ol",
  signup: "Qeydiyyatdan keçin",
  psychcode: "Psixoloq kodu",
  repeatpass: "Şifrəni təkrarlayın",
  mins: "~5 Dəqiqə⏰",
  needtohelp: "Köməyə ehtiyacınız varmı?",
  talktoprof: "Profesional ilə danışın💬",
  hotline: "Qaynar xətt☎️",
  test: [
    {
      question:
        "Başqalarına yaxşı davranmağa çalışıram. Onların hissləri ilə maraqlanıram",
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Mən narahatam, uzun müddət sakit qala bilmirəm",
      answerWeight: [2, 1, 0],
      category: hyperactive,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Tez-tez baş ağrılar və ya ürək bulamalarım olur",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question:
        "Mən adətən başqaları ilə paylaşıram (yemək, oyunlar, qələmlər və s.)",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Çox əsəbiləşirəm və özümü itirirəm",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question:
        "Mən adətən tək oluram. Çox vaxt tək oynayıram və dərs oxuyuram",
      answerWeight: [2, 1, 0],
      category: communication,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      answerWeight: [0, 1, 2],
      question: "Mən adətən mənə deyilənləri edirəm",
      category: behaviour,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Mən çox vaxtı narahat oluram",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question:
        "Kiminsə əsəbləşdiyi, incidiyi və ya xəstə olduğu halda kömək etməyə çalışıram",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Davamlı olaraq başım gicəllənir",
      answerWeight: [2, 1, 0],
      category: hyperactive,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Ən azı bir yaxşı dostum var",
      answerWeight: [0, 1, 2],
      category: communication,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "İstədiyimi başqalarına etdirə bilərəm",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Tez-tez özümü bədbəxt, kədərli, ağlamağa hazır hiss edirəm",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Mən adətən həmyaşıdlarımı bəyənirəm",
      answerWeight: [0, 1, 2],
      category: communication,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question:
        "Diqqətim asanlıqla dağılır və diqqətimi cəmləməkdə çətinlik çəkirəm",
      answerWeight: [2, 1, 0],
      category: hyperactive,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Yeni mühitlərdə əsəbi oluram, inamımı asanlıqla itirirəm",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Kiçik uşaqlara qarşı mehribanam",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Mən tez-tez yalan danışıram və aldadıram",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Başqalar tez-tez mənə sataşırlar və ya təhqir edirlər",
      answerWeight: [2, 1, 0],
      category: communication,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question:
        "Mən tez-tez başqalarına kömək edirəm (valideynlərə, müəllimlərə, uşaqlara)",
      answerWeight: [2, 1, 0],
      category: prosocial,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Hərəkət etməzdən əvvəl düşünürəm",
      answerWeight: [0, 1, 2],
      category: hyperactive,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question:
        "Evdən, məktəbdən və başqa yerlərdən başqalarının əşyalarını götürürəm",
      answerWeight: [2, 1, 0],
      category: behaviour,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Yaşıdlarla müqayisədə böyüklərlə münasibətim daha yaxşıdır",
      answerWeight: [2, 1, 0],
      category: communication,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Çox şeydən qorxuram",
      answerWeight: [2, 1, 0],
      category: emotional,
    },
    {
      answers: ["Düzdür", "Qismən doğru", "Doğru deyil"],

      question: "Başladığım işi başa çatdırıram. Diqqətim yaxşıdır.",
      answerWeight: [0, 1, 2],
      category: hyperactive,
    },
  ],
};

export default az;
